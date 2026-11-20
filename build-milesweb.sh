#!/usr/bin/env bash
# ==============================================================================
# Radhya Realty (Anubhav Bharat Group) — MilesWeb Production Packaging Engine
# Generates a pristine, zero-leakage deployment bundle for MilesWeb cPanel / Apache
# ==============================================================================

set -euo pipefail

# ANSI Color Codes
BOLD='\033[1m'
GOLD='\033[38;5;178m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

ZIP_NAME="radhya-realty-milesweb.zip"
TAR_NAME="radhya-realty-milesweb.tar.gz"

echo -e "${GOLD}${BOLD}================================================================${NC}"
echo -e "${GOLD}${BOLD}   RADHYA REALTY — MILESWEB PRODUCTION BUILD & PACKAGING ENGINE ${NC}"
echo -e "${GOLD}${BOLD}================================================================${NC}"
echo -e "${BLUE}Working Directory:${NC} $ROOT_DIR"
echo -e "${BLUE}Target Host:${NC}       MilesWeb cPanel (Apache / PHP 8.x)"
echo -e "${BLUE}Production URL:${NC}    https://anubhavbharatgroup.com/"
echo -e "${BLUE}Live CRM Engine:${NC}   https://radhya-crm.onrender.com/"
echo ""

# ------------------------------------------------------------------------------
# STEP 1: PRE-FLIGHT INTEGRITY AUDIT
# ------------------------------------------------------------------------------
echo -e "${CYAN}${BOLD}[1/4] Running Pre-Flight Structural & Security Audit...${NC}"

# Core HTML templates
REQUIRED_FILES=(
  "index.html"
  "real-estate.html"
  "renovation.html"
  "loan.html"
  "auto-moto.html"
  "vehicle-sale-purchase.html"
  "insurance.html"
  "privacy-policy.html"
  "terms.html"
  "404.html"
  "style.css"
  "main.js"
  ".htaccess"
  ".cpanel.yml"
  "api/whatsapp-enquiry.php"
  "api/.htaccess"
  "data/cards-registry.json"
)

MISSING=0
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo -e "  ${RED}✗ Missing required file:${NC} $file"
    MISSING=1
  fi
done

if [ $MISSING -eq 1 ]; then
  echo -e "${RED}${BOLD}Pre-flight failed: Critical files missing. Aborting.${NC}"
  exit 1
fi
echo -e "  ${GREEN}✓ All 17 core institutional files verified.${NC}"

# Check CRM URL in main.js and api/whatsapp-enquiry.php
if grep -q "https://radhya-crm.onrender.com" main.js && grep -q "https://radhya-crm.onrender.com" api/whatsapp-enquiry.php; then
  echo -e "  ${GREEN}✓ Live Render CRM bridge verified in main.js & whatsapp-enquiry.php.${NC}"
else
  echo -e "  ${YELLOW}⚠ Warning: CRM bridge endpoint may not point to https://radhya-crm.onrender.com${NC}"
fi

# Security Check: Ensure enquiries-log.json is NEVER packaged
if [ -f "api/enquiries-log.json" ]; then
  echo -e "  ${YELLOW}ℹ Found local api/enquiries-log.json — will strictly exclude from release bundle.${NC}"
fi

# ------------------------------------------------------------------------------
# STEP 2: STAGING PRODUCTION ASSETS
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}${BOLD}[2/4] Staging Production Assets (Zero-Leakage Filtering)...${NC}"

STAGE_DIR=$(mktemp -d /tmp/radhya-milesweb-stage.XXXXXX)
trap 'rm -rf "$STAGE_DIR"' EXIT

# Copy all production files to staging root
cp index.html "$STAGE_DIR/"
cp real-estate.html "$STAGE_DIR/"
cp renovation.html "$STAGE_DIR/"
cp loan.html "$STAGE_DIR/"
cp auto-moto.html "$STAGE_DIR/"
cp vehicle-sale-purchase.html "$STAGE_DIR/"
cp insurance.html "$STAGE_DIR/"
[ -f decoration.html ] && cp decoration.html "$STAGE_DIR/" || true
cp privacy-policy.html "$STAGE_DIR/"
cp terms.html "$STAGE_DIR/"
cp 404.html "$STAGE_DIR/"
cp style.css "$STAGE_DIR/"
cp main.js "$STAGE_DIR/"
cp .htaccess "$STAGE_DIR/"
cp .cpanel.yml "$STAGE_DIR/"

[ -f favicon.svg ] && cp favicon.svg "$STAGE_DIR/" || true
[ -f manifest.json ] && cp manifest.json "$STAGE_DIR/" || true
[ -f robots.txt ] && cp robots.txt "$STAGE_DIR/" || true
[ -f sitemap.xml ] && cp sitemap.xml "$STAGE_DIR/" || true
[ -f llms.txt ] && cp llms.txt "$STAGE_DIR/" || true
[ -f radhya-realty-preview.jpg ] && cp radhya-realty-preview.jpg "$STAGE_DIR/" || true

# API directory (strictly excluding enquiries-log.json)
mkdir -p "$STAGE_DIR/api"
cp api/whatsapp-enquiry.php "$STAGE_DIR/api/"
cp api/.htaccess "$STAGE_DIR/api/"

# Data directory
mkdir -p "$STAGE_DIR/data"
cp data/cards-registry.json "$STAGE_DIR/data/"

# Uploads directory
mkdir -p "$STAGE_DIR/uploads"
if [ -d uploads ] && [ "$(ls -A uploads 2>/dev/null)" ]; then
  cp -r uploads/* "$STAGE_DIR/uploads/" 2>/dev/null || true
fi

# Set proper Linux file permissions (644 for files, 755 for directories)
find "$STAGE_DIR" -type d -exec chmod 755 {} +
find "$STAGE_DIR" -type f -exec chmod 644 {} +

echo -e "  ${GREEN}✓ Staged clean release tree (excluded .git, .claude, .gemini, logs, & dev configs).${NC}"

# ------------------------------------------------------------------------------
# STEP 3: PACKAGING RELEASES (ZIP & TAR.GZ)
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}${BOLD}[3/4] Creating Release Archives...${NC}"

rm -f "$ZIP_NAME" "$TAR_NAME"

# Build ZIP archive (direct root hierarchy, including .htaccess)
(
  cd "$STAGE_DIR"
  if command -v zip >/dev/null 2>&1; then
    zip -q -9 -r "$ROOT_DIR/$ZIP_NAME" . -x "*.DS_Store" "*/.DS_Store" "*__MACOSX*"
  fi
  tar -czf "$ROOT_DIR/$TAR_NAME" .
)

ZIP_SIZE=$(du -h "$ZIP_NAME" 2>/dev/null | awk '{print $1}' || echo "N/A")
TAR_SIZE=$(du -h "$TAR_NAME" 2>/dev/null | awk '{print $1}' || echo "N/A")

echo -e "  ${GREEN}✓ Created: ${BOLD}$ZIP_NAME${NC} (${ZIP_SIZE})"
echo -e "  ${GREEN}✓ Created: ${BOLD}$TAR_NAME${NC} (${TAR_SIZE})"

# ------------------------------------------------------------------------------
# STEP 4: VERIFICATION & DEPLOYMENT INSTRUCTIONS
# ------------------------------------------------------------------------------
echo -e "\n${CYAN}${BOLD}[4/4] Verifying Package Archive Layout...${NC}"

# Check top-level files in the zip
TOP_LEVEL_INDEX=$(unzip -l "$ZIP_NAME" | grep -E "^\s+[0-9]+\s+.*index\.html$" || true)
TOP_LEVEL_HTACCESS=$(unzip -l "$ZIP_NAME" | grep -E "^\s+[0-9]+\s+.*\.htaccess$" || true)

if [ -n "$TOP_LEVEL_INDEX" ] && [ -n "$TOP_LEVEL_HTACCESS" ]; then
  echo -e "  ${GREEN}✓ Verified flat root structure: index.html & .htaccess extract directly into public_html/.${NC}"
else
  echo -e "  ${YELLOW}⚠ Warning: Archive structure may be nested. Check unzip -l $ZIP_NAME.${NC}"
fi

# Confirm enquiries-log.json is NOT in the zip
if unzip -l "$ZIP_NAME" | grep -q "enquiries-log.json"; then
  echo -e "  ${RED}✗ SECURITY VIOLATION: enquiries-log.json was found in the archive!${NC}"
  rm -f "$ZIP_NAME" "$TAR_NAME"
  exit 1
else
  echo -e "  ${GREEN}✓ Data Security Lock confirmed: zero client inquiries or logs in package.${NC}"
fi

echo ""
echo -e "${GOLD}${BOLD}================================================================${NC}"
echo -e "${GREEN}${BOLD}✓ RADHYA REALTY PRODUCTION BUNDLE IS READY FOR MILESWEB!${NC}"
echo -e "${GOLD}${BOLD}================================================================${NC}"
echo ""
echo -e "${BOLD}DEPLOYMENT OPTIONS FOR MILESWEB:${NC}"
echo ""
echo -e "${GOLD}Option 1: Automated Deployment via cPanel Git (Fastest & Zero Upload)${NC}"
echo -e " 1. Commit and push any changes: ${CYAN}git push origin main${NC}"
echo -e " 2. In ${BOLD}MilesWeb cPanel → Git™ Version Control${NC}:"
echo -e "    Repository: ${CYAN}repositories/radhya-realty-website${NC}"
echo -e " 3. Click ${BOLD}'Update from Remote'${NC} then ${BOLD}'Deploy HEAD Commit'${NC}."
echo -e "    The included ${CYAN}.cpanel.yml${NC} deploys everything directly into ${BOLD}public_html/${NC}."
echo ""
echo -e "${GOLD}Option 2: 1-Click File Manager Upload (ZIP)${NC}"
echo -e " 1. Open ${BOLD}MilesWeb cPanel → File Manager${NC}."
echo -e " 2. Navigate to your root: ${BOLD}public_html/${NC}."
echo -e " 3. Upload ${CYAN}$ROOT_DIR/$ZIP_NAME${NC}."
echo -e " 4. Right-click → ${BOLD}Extract${NC} into ${BOLD}public_html/${NC}."
echo -e " 5. Delete the .zip file after extraction."
echo ""
echo -e "${BOLD}Live Verification Check:${NC}"
echo -e "  ${CYAN}curl -I https://radhyarealty.com/${NC}"
echo -e "  ${CYAN}curl -s https://radhyarealty.com/data/cards-registry.json | grep -o '\"id\":' | wc -l${NC}"
echo ""
