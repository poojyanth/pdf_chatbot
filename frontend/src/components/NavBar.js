import React from "react";
import Logo from "../assets/AI Planet Logo.png";
import circlePlus from "../assets/plus.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'

export default function NavBar({ onUpload }) {

  const [pdfFile, setPdfFile] = React.useState(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
          setPdfFile(file);
          onUpload(file);
        } else {
          alert('Please upload a PDF file.');
        }
      };


    return (
      <nav className="navbar">
        <div className="nav-logo">
          <img src={Logo} alt="AI Planet Logo" />
        </div>
        <div className="nav-options">
          <div className="uploadedPDF">
            {pdfFile ? (
              <>
                <FontAwesomeIcon className="pdfIcon" icon={faFile} />
                <div className="pdfName">{pdfFile.name}</div>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="upload-container">
            <label htmlFor="pdfUpload" className="upload-btn">
              <img height={"15rem"} src={circlePlus} alt="" />
              <span className="UploadPDFName">Upload PDF</span>
            </label>
            <input
              id="pdfUpload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </nav>
    );
    }