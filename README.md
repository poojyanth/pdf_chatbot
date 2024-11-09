
# PDF Chatbot Application

This project is a full-stack web application that allows users to upload a PDF document and ask questions about its content. The application uses FastAPI on the backend to handle PDF uploads and text-based queries, and a React-based frontend that provides a chat-like interface for interacting with the document.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [High-Level Design (HLD)](#high-level-design-hld)
- [Low-Level Design (LLD)](#low-level-design-lld)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Overview

This application simulates a chatbot experience where users can interact with a PDF document. It allows users to upload a PDF and ask questions related to the content. The backend processes the uploaded PDF and uses NLP tools to answer the user's questions. The answers are then returned to the frontend, which displays them in a chat-like format.

## Features

- PDF document upload and storage
- Text-based querying of the uploaded PDF
- Chat-like interface to ask questions and receive answers
- Real-time interactions between user and bot
- Simple and clean UI for easy navigation

## High-Level Design (HLD)

The application consists of two main components:

1. **Frontend (React)**
   - Presents a chat-like UI where users can upload a PDF, type questions, and receive responses.
   - Shows messages from both the user and bot in a styled chat window.
   - Manages the interaction flow, starting from PDF upload to conversation handling.
   
2. **Backend (FastAPI)**
   - Receives and stores the uploaded PDF file.
   - Parses and processes the PDF content for querying.
   - Uses NLP tools (LangChain/LLamaIndex or similar) to interpret user queries and retrieve relevant content from the PDF.
   - Sends the answer back to the frontend for display.

### HLD Diagram
```plaintext
Client (React)  <--->  Server (FastAPI)  <--->  NLP Model (LangChain/LLamaIndex)
```

- **Client (React)**: Provides the user interface, handles PDF upload, and sends queries to the server.
- **Server (FastAPI)**: Acts as an intermediary between the client and NLP model, managing document storage and query processing.
- **NLP Model (LangChain/LLamaIndex)**: Processes text queries and provides answers by extracting information from the PDF document.

## Low-Level Design (LLD)

The following components make up the low-level design of the application:

### 1. **Frontend Components**
   - **PDFUpload**: A React component that allows users to select and upload a PDF file.
   - **QueryInput**: A React component where users can type in questions.
   - **ResponseDisplay**: A React component that displays messages in a chat-bubble style.
   - **App**: The main component that manages state and interaction between the user and backend.

### 2. **Backend Endpoints**
   - **/upload_pdf** (POST): Endpoint to receive and store the uploaded PDF.
   - **/query** (GET): Endpoint to handle text queries. Takes the user's question, retrieves relevant content from the PDF, and returns an answer.
   
### 3. **NLP Model Integration**
   - **PDF Parsing**: The backend parses the PDF and stores it in a way that allows efficient querying.
   - **Query Processing**: Uses an NLP model (e.g., LangChain/LLamaIndex) to process user queries and search the parsed document for relevant answers.

## Installation

### Prerequisites
- Node.js and npm
- Python 3.x

### Backend Setup
1. Clone the repository and navigate to the `backend` folder.
2. Install the required packages:
   ```bash
   pip install fastapi uvicorn langchain llama-index
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Install the required packages:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

## Usage

1. Run both the backend and frontend servers.
2. Open the frontend in your browser.
3. Upload a PDF file using the "Upload PDF" button.
4. Type a question about the PDF content in the chat input box and press "Send."
5. The bot will analyze the content and respond with relevant information from the PDF.

## Technologies Used

- **Frontend**: React.js
- **Backend**: FastAPI
- **NLP Tools**: LangChain/LLamaIndex
- **Database**: SQLite/PostgreSQL for metadata storage
- **File Storage**: Local storage or cloud storage option for PDF files

---

This README file provides a comprehensive overview of the application's architecture and usage. The HLD and LLD help clarify the design and functionalities of each component in the system.
