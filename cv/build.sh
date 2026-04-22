#!/usr/bin/env bash
# ─── CV Build Script ───
# Compiles all Typst CV variants to PDF and copies generic versions to public/
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VARIANTS_DIR="$SCRIPT_DIR/variants"
OUTPUT_DIR="$SCRIPT_DIR/output"
PUBLIC_DIR="$SCRIPT_DIR/../public"

mkdir -p "$OUTPUT_DIR"

# All variant files
VARIANTS=(
  generic-en generic-fr
)

echo "Building ${#VARIANTS[@]} CV variants..."
echo ""

FAILED=0
for variant in "${VARIANTS[@]}"; do
  printf "  %-25s" "$variant"
  if typst compile --root "$SCRIPT_DIR" "$VARIANTS_DIR/$variant.typ" "$OUTPUT_DIR/$variant.pdf" 2>/dev/null; then
    echo "✓"
  else
    echo "✗ FAILED"
    # Show error detail
    typst compile --root "$SCRIPT_DIR" "$VARIANTS_DIR/$variant.typ" "$OUTPUT_DIR/$variant.pdf" 2>&1 || true
    FAILED=$((FAILED + 1))
  fi
done

echo ""

# ─── Cover letters ───
# Compile any cover_letter_*.typ sitting in OUTPUT_DIR alongside the CVs.
shopt -s nullglob
COVER_LETTERS=("$OUTPUT_DIR"/cover_letter_*.typ)
shopt -u nullglob

if [ ${#COVER_LETTERS[@]} -gt 0 ]; then
  echo "Building ${#COVER_LETTERS[@]} cover letter(s)..."
  echo ""
  for letter in "${COVER_LETTERS[@]}"; do
    name="$(basename "$letter" .typ)"
    printf "  %-45s" "$name"
    if typst compile --root "$SCRIPT_DIR" "$letter" "$OUTPUT_DIR/$name.pdf" 2>/dev/null; then
      echo "✓"
    else
      echo "✗ FAILED"
      typst compile --root "$SCRIPT_DIR" "$letter" "$OUTPUT_DIR/$name.pdf" 2>&1 || true
      FAILED=$((FAILED + 1))
    fi
  done
  echo ""
fi

# Copy generic CVs to public/ for website download
if [ -f "$OUTPUT_DIR/generic-en.pdf" ]; then
  cp "$OUTPUT_DIR/generic-en.pdf" "$PUBLIC_DIR/cv-en.pdf"
  echo "Copied generic-en.pdf → public/cv-en.pdf"
fi

if [ -f "$OUTPUT_DIR/generic-fr.pdf" ]; then
  cp "$OUTPUT_DIR/generic-fr.pdf" "$PUBLIC_DIR/cv-fr.pdf"
  echo "Copied generic-fr.pdf → public/cv-fr.pdf"
fi

# # ─── DOCX generation (optional, requires pdf2docx) ───
# DOCX_FAILED=0
# PYTHON=""

# # Find a Python with pdf2docx installed (prefer local venv)
# for candidate in "$SCRIPT_DIR/.venv/bin/python3" python3 python; do
#   if [ -x "$candidate" ] || command -v "$candidate" &>/dev/null; then
#     if "$candidate" -c "from pdf2docx import Converter" 2>/dev/null; then
#       PYTHON="$candidate"
#       break
#     fi
#   fi
# done

# if [ -n "$PYTHON" ]; then
#   echo "Generating DOCX variants..."
#   echo ""
#   for variant in "${VARIANTS[@]}"; do
#     pdf="$OUTPUT_DIR/$variant.pdf"
#     docx="$OUTPUT_DIR/$variant.docx"
#     if [ -f "$pdf" ]; then
#       printf "  %-25s" "$variant.docx"
#       if "$PYTHON" "$SCRIPT_DIR/convert-docx.py" "$pdf" "$docx" 2>/dev/null; then
#         echo "✓"
#       else
#         echo "✗ FAILED"
#         DOCX_FAILED=$((DOCX_FAILED + 1))
#       fi
#     fi
#   done
#   echo ""

#   # Copy generic DOCX to public/
#   if [ -f "$OUTPUT_DIR/generic-en.docx" ]; then
#     cp "$OUTPUT_DIR/generic-en.docx" "$PUBLIC_DIR/cv-en.docx"
#     echo "Copied generic-en.docx → public/cv-en.docx"
#   fi
#   if [ -f "$OUTPUT_DIR/generic-fr.docx" ]; then
#     cp "$OUTPUT_DIR/generic-fr.docx" "$PUBLIC_DIR/cv-fr.docx"
#     echo "Copied generic-fr.docx → public/cv-fr.docx"
#   fi
# else
#   echo "Skipping DOCX generation (pdf2docx not found)."
#   echo "  Install with: pip install 'pdf2docx' 'PyMuPDF<1.25'"
# fi

# echo ""
# if [ $FAILED -eq 0 ] && [ $DOCX_FAILED -eq 0 ]; then
#   echo "All ${#VARIANTS[@]} variants built successfully."
# else
#   [ $FAILED -gt 0 ] && echo "$FAILED PDF variant(s) failed to build."
#   [ $DOCX_FAILED -gt 0 ] && echo "$DOCX_FAILED DOCX variant(s) failed to convert."
#   [ $FAILED -gt 0 ] && exit 1
# fi
