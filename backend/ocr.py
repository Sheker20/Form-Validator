import pytesseract
from PIL import Image

def process_document(file_path):
    text = pytesseract.image_to_string(Image.open(file_path))
    return {
        "fields": [
            {"field": "raw_text", "value": text, "status": "ok"}
        ],
        "summary": "OCR extracted text successfully."
    }
