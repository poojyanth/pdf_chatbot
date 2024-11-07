from fastapi import FastAPI, HTTPException, Request, File, UploadFile
from llama_cpp import Llama
import fitz  # PyMuPDF
import os

app = FastAPI()

# Constants
MODEL_PATH = "llama-2-7b-chat.Q8_0.gguf"
MAX_TOKENS = 200  # Adjusted max token size
TEMP_PDF_PATH = "uploaded_pdf.pdf"

# Initialize LLaMA model
llama_model = Llama(model_path=MODEL_PATH)

# Function to extract text from a PDF file
def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    pdf_document = fitz.open(file_path)
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        text += page.get_text()
    pdf_document.close()
    return text

# Endpoint to upload PDF
@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    # Save the uploaded file temporarily
    with open(TEMP_PDF_PATH, "wb") as temp_pdf:
        content = await file.read()
        temp_pdf.write(content)

    # Extract text from the PDF
    global pdf_text
    pdf_text = extract_text_from_pdf(TEMP_PDF_PATH)

    # Remove the temporary file after processing
    os.remove(TEMP_PDF_PATH)

    return {"message": "PDF uploaded and processed successfully"}

# Endpoint to query the uploaded PDF text
@app.get("/query")
async def query_pdf(request: Request):
    query = request.query_params.get("query")
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter 'query' is required.")

    if not pdf_text:
        raise HTTPException(status_code=400, detail="No PDF uploaded yet.")

    # Combine query with the extracted PDF text
    prompt = f"{query} based on the following text: {pdf_text}"

    # Ensure the prompt does not exceed the model's maximum token limit
    if len(prompt.split()) > MAX_TOKENS:
        prompt = ' '.join(prompt.split()[:MAX_TOKENS])  # Truncate by words

    try:
        # Call the model with a smaller number of max_tokens if needed
        response = llama_model(prompt, max_tokens=1024, stop=["\n"])
        response_text = response["choices"][0]["text"].strip()

        return {"response": response_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
