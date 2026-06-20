export const uploadDocument = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        documentType: "Aadhaar Card",
        extracted: { name: "Ramesh Kumar", age: 45, location: "Kerala" }
      });
    }, 2500); // Simulate Gemini Vision processing time
  });
};
