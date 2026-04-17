const dropZone = document.getElementById("drop-zone"); /*looks for id tag in html file */
const fileInput = document.getElementById("fileInput"); /*store*/

// Upload function
function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  fetch("http://127.0.0.1:8000/upload", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    console.log("Upload success:", data);
    alert(`Uploaded: ${data.filename}`);
  })
  .catch(err => {
    console.error("Upload error:", err);
  });
}

// Click to open file picker
dropZone.addEventListener("click", () => {
  fileInput.click();
});

// Drag over (must prevent default or drop won’t work)
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.style.borderColor = "#000";
});

// Drag leave reset
dropZone.addEventListener("dragleave", () => {
  dropZone.style.borderColor = "#aaa";
});

// Drop handler
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.style.borderColor = "#aaa";

  const files = e.dataTransfer.files;

  if (files.length > 0) {
    uploadFile(files[0]); // send first file
  }
});

// File picker handler
fileInput.addEventListener("change", () => {
  const files = fileInput.files;

  if (files.length > 0) {
    uploadFile(files[0]);
  }
});