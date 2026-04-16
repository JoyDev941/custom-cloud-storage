from fastapi import FastAPI, Request, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
import shutil
import os
#pip install multipart

ROOT_FOLDER = "root" #temporary must update based on user logged in the time
os.makedirs(ROOT_FOLDER, exist_ok=True)
app = FastAPI()
app.mount("/static", StaticFiles(directory="templates", html=True), name="components")

@app.get("/")
def redirect():
    return RedirectResponse("/static")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(ROOT_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": "uploaded successfully", "filename": file.filename}


@app.post("/create-user-area/{folder_name}") #create a user area
async def create_file(folder_name : str):
    folder_path = os.path.join(ROOT_FOLDER, folder_name)
    os.makedirs(folder_path, exist_ok=True)

    return {"message" : "user_created"}
    
