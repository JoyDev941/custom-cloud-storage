from fastapi import FastAPI, Request, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import shutil
import os
#pip install multipart

# conn = psycopg2.connect(
#     dbname="cloud-details",
#     user="postgres",
#     password="your_password",
#     host="localhost",
#     port="5432"
# )


print("Connected successfully!")

ROOT_FOLDER = "root" #temporary must update based on user logged in the time
os.makedirs(ROOT_FOLDER, exist_ok=True)
app = FastAPI()
app.mount("/login", StaticFiles(directory="templates", html=True), name="components")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")#add files to directory {basic}
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(ROOT_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": "uploaded successfully", "filename": file.filename}


@app.post("/create-user-area/{folder_name}") #create a user area {basic}
async def create_file(folder_name : str):
    folder_path = os.path.join(ROOT_FOLDER, folder_name)
    os.makedirs(folder_path, exist_ok=True)

    return {"message" : "user_created"}


@app.get("/") #redirect to mounted page
def redirect():
    return RedirectResponse("/login")


@app.post("/authenticate") #authentication {basic}
def check(data : dict):
    if(data["username"] == "joy" and data["password"] == "admin"):
        return {"status" : "pass"}
    else:
        return { "status" : "fail"}

    
