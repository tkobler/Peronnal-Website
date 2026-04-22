#!/usr/bin/env python3
"""Convert CV PDFs to DOCX format using pdf2docx."""

import sys
import os

try:
    from pdf2docx import Converter
except ImportError:
    print("pdf2docx not installed. Install with: pip install 'pdf2docx' 'PyMuPDF<1.25'")
    sys.exit(1)


def convert(pdf_path: str, docx_path: str) -> bool:
    try:
        cv = Converter(pdf_path)
        cv.convert(docx_path)
        cv.close()
        return True
    except Exception as e:
        print(f"  Failed to convert {pdf_path}: {e}", file=sys.stderr)
        return False


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(f"Usage: {sys.argv[0]} <input.pdf> <output.docx>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    docx_path = sys.argv[2]

    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}", file=sys.stderr)
        sys.exit(1)

    success = convert(pdf_path, docx_path)
    sys.exit(0 if success else 1)
