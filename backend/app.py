from flask import Flask, request, jsonify
from flask_cors import CORS   # 👈 import

app = Flask(__name__)
CORS(app)   # 👈 allow all origins (for dev only)

@app.route("/api/ocr", methods=["POST"])
def ocr_endpoint():
    return {
        "fields": [
            {"field": "PatientName", "value": "John Doe", "status": "ok"},
            {"field": "PolicyNumber", "value": "ABC12345", "status": "warn"}
        ],
        "summary": "Sample OCR response from backend."
    }

if __name__ == "__main__":
    app.run(debug=True, port=5000)






#--------------------------









# from flask import Flask, request, jsonify
# from ocr import process_document  # import your OCR function
# import os

# app = Flask(__name__)
# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# @app.route("/api/ocr", methods=["POST"])
# def ocr_endpoint():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     file_path = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(file_path)

#     # Call your OCR function
#     result = process_document(file_path)

#     return jsonify(result)

# if __name__ == "__main__":
#     app.run(debug=True, port=5000)
