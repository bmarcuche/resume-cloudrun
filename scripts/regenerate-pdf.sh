#!/usr/bin/env bash
# Regenerates public/resume/bruno_marcuche_resume.pdf from the built site's print
# stylesheet. Run after `npm run build` with no dev server running.
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${PORT:-3999}"
CHROME="${CHROME:-$(ls -d ~/.cache/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell 2>/dev/null | tail -1)}"
[ -x "$CHROME" ] || { echo "Set CHROME to a headless Chromium binary"; exit 1; }
if fuser "$PORT/tcp" >/dev/null 2>&1; then echo "Port $PORT busy"; exit 1; fi
PORT=$PORT npx next start -p "$PORT" >/tmp/regen-pdf.log 2>&1 &
SERVER=$!
# next start runs under npx; kill the listener on the port, not just the wrapper.
cleanup() {
  LISTENER=$(ss -ltnp 2>/dev/null | grep -E ":$PORT\s" | grep -oE "pid=[0-9]+" | head -1 | cut -d= -f2)
  [ -n "$LISTENER" ] && kill "$LISTENER" 2>/dev/null
  kill "$SERVER" 2>/dev/null || true
}
trap cleanup EXIT
for _ in $(seq 1 40); do curl -sf "http://localhost:$PORT/api/health" >/dev/null && break; sleep 1; done
TMP=$(mktemp --suffix=.pdf)
"$CHROME" --headless --no-sandbox --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$TMP" --virtual-time-budget=10000 \
  "http://localhost:$PORT/" 2>/dev/null
TEXT=$(pdftotext "$TMP" -)
# Sanity: the resume content must be there, and no screen-only section may leak.
echo "$TEXT" | grep -q "Professional Experience" || { echo "PDF missing resume content; not replacing"; exit 1; }
echo "$TEXT" | grep -q "Key Skills" || { echo "PDF missing Key Skills; not replacing"; exit 1; }
if echo "$TEXT" | grep -qE "Systems I own|How I work|Toolbox|platform too"; then echo "Screen section leaked into PDF"; exit 1; fi
# Word integrity: the text layer must keep whole words (kerning/ligature splits break ATS parsing).
for WORD in "Platform Architect" "Terraform" "PagerDuty" "engineering"; do
  echo "$TEXT" | grep -q "$WORD" || { echo "PDF text layer lost the word '$WORD'; not replacing"; exit 1; }
done
# Disclosure: the banned list lives in lib/disclosure.ts; read it from there.
BANNED_FILE=$(mktemp)
node -e "const s=require('fs').readFileSync('lib/disclosure.ts','utf8');const m=s.match(/BANNED = \[([\s\S]*?)\]/)[1];console.log(m.match(/'([^']+)'/g).map(x=>x.slice(1,-1)).join('\n'))" > "$BANNED_FILE"
if echo "$TEXT" | grep -F -f "$BANNED_FILE"; then
  echo "Disclosure violation in PDF"; exit 1
fi
rm -f "$BANNED_FILE"
PAGES=$(pdfinfo "$TMP" | awk '/^Pages:/{print $2}')
[ "$PAGES" -le 3 ] || { echo "PDF is $PAGES pages; the resume must fit in 3. Trim lib/resume-data.ts."; exit 1; }
mv "$TMP" public/resume/bruno_marcuche_resume.pdf
pdfinfo public/resume/bruno_marcuche_resume.pdf | grep Pages
echo "PDF regenerated"
