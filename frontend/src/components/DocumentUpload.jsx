import React, { useState } from 'react';
import { UploadCloud, File, CheckCircle } from 'lucide-react';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    // Simulate API call for now since we don't have auth token wired in demo frontend
    setTimeout(() => {
      setUploading(false);
      setResult({
        documentType: "Aadhaar Card",
        extracted: { name: "Ramesh Kumar", age: 45 }
      });
    }, 2000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto text-center">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <UploadCloud size={32} />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Upload Document</h2>
      <p className="text-gray-500 mb-6 text-sm">Upload your Aadhaar, PAN, or Income Certificate. Our AI will automatically extract details for your profile.</p>
      
      {!result ? (
        <>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 bg-gray-50 hover:bg-gray-100 transition cursor-pointer relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                <File size={20} /> {file.name}
              </div>
            ) : (
              <span className="text-gray-500 font-medium">Click to browse or drag and drop</span>
            )}
          </div>

          <button 
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full py-3 rounded-xl font-medium transition ${file && !uploading ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {uploading ? 'Analyzing Document with AI...' : 'Process Document'}
          </button>
        </>
      ) : (
        <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 text-left">
          <div className="flex items-center gap-2 font-bold mb-2">
            <CheckCircle size={20} /> Successfully Extracted
          </div>
          <p className="text-sm"><span className="font-semibold">Type:</span> {result.documentType}</p>
          <p className="text-sm"><span className="font-semibold">Name:</span> {result.extracted.name}</p>
          <p className="text-sm mt-2 text-green-700 italic">Your citizen profile has been auto-updated!</p>
          <button onClick={() => {setFile(null); setResult(null);}} className="mt-4 text-sm text-green-800 underline font-medium">Upload another</button>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
