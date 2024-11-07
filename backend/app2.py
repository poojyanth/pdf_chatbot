from fastapi import FastAPI, HTTPException, Request
from llama_cpp import Llama
import fitz  # PyMuPDF

app = FastAPI()

# Constants
PDF_FILE_PATH = "Poojyanth_Resume_Full_Stack (2).pdf"
MODEL_PATH = "llama-2-7b-chat.Q8_0.gguf"
MAX_TOKENS = 200  # Adjusted max token size

# Initialize LLaMA model
llama_model = Llama(model_path=MODEL_PATH)

# Function to extract text from a fixed PDF file location
def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    pdf_document = fitz.open(file_path)
    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        text += page.get_text()
    pdf_document.close()
    return text

# Extract the text once since the PDF location is constant
pdf_text = extract_text_from_pdf(PDF_FILE_PATH)

@app.get("/query")
async def query_pdf(request: Request):
    query = request.query_params.get("query")
    if not query:
        raise HTTPException(status_code=400, detail="Query parameter 'query' is required.")
    
    # Combine query with the extracted PDF text
    prompt = f"{query} based on the following text: {pdf_text}"

    # Ensure the prompt does not exceed the model's maximum token limit
    if len(prompt.split()) > MAX_TOKENS:  # Adjust token checking as necessary
        prompt = ' '.join(prompt.split()[:MAX_TOKENS])  # Truncate by words

    try:
        # Call the model with a smaller number of max_tokens if needed
        print(prompt)
        response = llama_model(prompt, max_tokens=1024, stop=["\n"])
        response_text = response["choices"][0]["text"].strip()  # Remove extra whitespace

        return {"response": response_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
