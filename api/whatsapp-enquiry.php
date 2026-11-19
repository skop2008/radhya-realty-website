<?php
/**
 * Radhya Realty (Anubhav Bharat Group) - WhatsApp Enquiry API & Ingestion Endpoint
 * Receives customer leads from the website and logs/dispatches to Owner (Rakesh Raj Shukla: +91 99532 27091)
 */

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle CORS pre-flight
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    echo json_encode(["status" => "OK"]);
    exit;
}

// Ensure POST request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "error" => "Method Not Allowed. Please send a POST request with JSON payload."
    ]);
    exit;
}

// Read raw JSON body
$rawBody = file_get_contents("php://input");
$data = json_decode($rawBody, true);
if (!is_array($data)) {
    $data = $_POST;
}

// Extract & Sanitize fields
$name     = trim(strip_tags($data["name"] ?? $data["fullName"] ?? "Website Visitor"));
$phone    = trim(strip_tags($data["phone"] ?? $data["phoneNumber"] ?? ""));
$division = trim(strip_tags($data["division"] ?? $data["service"] ?? "General Advisory"));
$item     = trim(strip_tags($data["item"] ?? $data["productInterest"] ?? $data["productOrProperty"] ?? "General Enquiry"));
$details  = trim(strip_tags($data["details"] ?? $data["message"] ?? "Customer requested consultation via website"));
$url      = trim(strip_tags($data["url"] ?? $data["sourceWebsite"] ?? "https://radhyarealty.com/"));
$ip       = $_SERVER["REMOTE_ADDR"] ?? "UNKNOWN";
$ua       = $_SERVER["HTTP_USER_AGENT"] ?? "UNKNOWN";
$nowIso   = date("c");
$nowIst   = gmdate("Y-m-d H:i:s", time() + 19800) . " IST";

// Basic validation
if (empty($phone)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Customer phone number is required."
    ]);
    exit;
}

// Generate unique lead ID
$enquiryId = "enq_" . time() . "_" . bin2hex(random_bytes(3));

// 1. Log to JSON ledger
$logFile = __DIR__ . "/enquiries-log.json";
$logEntry = [
    "id"         => $enquiryId,
    "timestamp"  => $nowIso,
    "ist_time"   => $nowIst,
    "name"       => $name,
    "phone"      => $phone,
    "division"   => $division,
    "item"       => $item,
    "details"    => $details,
    "url"        => $url,
    "ip"         => $ip,
    "user_agent" => $ua
];

$entries = [];
if (file_exists($logFile)) {
    $existingRaw = @file_get_contents($logFile);
    $existing = json_decode($existingRaw, true);
    if (is_array($existing)) {
        $entries = $existing;
    }
}
array_unshift($entries, $logEntry);
if (count($entries) > 500) {
    $entries = array_slice($entries, 0, 500);
}
@file_put_contents($logFile, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

// 2. Backup Email Alert to Management
$backupEmail = "anubhav.insurance09@gmail.com";
$emailSubject = "New Website Lead: {$name} - {$division} (Radhya Realty)";
$emailBody = "New Customer Enquiry received on Radhya Realty:

"
           . "Name: {$name}
"
           . "Phone: {$phone}
"
           . "Division: {$division}
"
           . "Selected Item: {$item}
"
           . "Details / Message: {$details}
"
           . "Page URL: {$url}
"
           . "Time: {$nowIst}
"
           . "IP Address: {$ip}

"
           . "Direct Owner WhatsApp: https://wa.me/919953227091
"
           . "Owner: Rakesh Raj Shukla (+91 99532 27091)
"
           . "Headquarters: Shop No 1, Budh Bazar Road, Kamalpur, Burari, Delhi 110084
";

$headers = "From: noreply@radhyarealty.com
"
         . "Reply-To: {$backupEmail}
"
         . "X-Mailer: PHP/" . phpversion();

@mail($backupEmail, $emailSubject, $emailBody, $headers);

// 2b. Forward lead payload to Live CRM Webhook (Render / Custom Domain)
if (function_exists('curl_init')) {
    $crmEndpoints = [
        "https://radhya-crm-ran4.onrender.com/api/v1/webhooks/website-ingest",
        "https://crm.radhyarealty.com/api/v1/webhooks/website-ingest"
    ];
    $crmPayload = json_encode([
        "fullName"        => $name,
        "phone"           => $phone,
        "email"           => $backupEmail,
        "cityLocality"    => "Delhi-NCR",
        "division"        => $division,
        "productInterest" => $item,
        "message"         => $details,
        "sourceWebsite"   => $url,
        "secretKey"       => "radhya-sec-99532-enterprise-token-2026"
    ]);

    foreach ($crmEndpoints as $endpoint) {
        $ch = @curl_init($endpoint);
        if ($ch) {
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $crmPayload);
            curl_setopt($ch, CURLOPT_TIMEOUT, 2);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                "Content-Type: application/json",
                "X-Radhya-Webhook-Secret: radhya-sec-99532-enterprise-token-2026"
            ]);
            $crmRes = @curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            @curl_close($ch);
            if ($httpCode >= 200 && $httpCode < 300) {
                break;
            }
        }
    }
}

// 3. Return JSON Response
http_response_code(200);
echo json_encode([
    "success"       => true,
    "message"       => "Enquiry registered and dispatched to owner WhatsApp",
    "enquiryId"     => $enquiryId,
    "ownerWhatsApp" => "919953227091",
    "ownerName"     => "Rakesh Raj Shukla",
    "timestamp"     => $nowIso
]);
