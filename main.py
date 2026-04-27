from fastapi import FastAPI, Request, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import shutil
import os
#pip install multipart

conn = psycopg2.connect(
    dbname="user_system",
    user="postgres",
    password="hornup-kofzyH-hukmy8",
    host="localhost",
    port="5432"
)

cur = conn.cursor()


ROOT_FOLDER = "root" #temporary must update based on user logged in the time
os.makedirs(ROOT_FOLDER, exist_ok=True)

app = FastAPI()
#/login, the page is mounted to that url path, templates is location of web files, components is just name
app.mount("/login", StaticFiles(directory="templates", html=True), name="components")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
def shuteverything():
    cur.close()
    conn.close()
    print("bye bye")


@app.get("/") #redirect to mounted page
def redirect():
    return RedirectResponse("/login")


#----------------------------registration-----------------------------------------
def create_user_area(username : str):
    os.mkdir("root/"+username)

@app.post("/register") #create a new user {basic}
def register(newData : dict):

    username = newData["username"]
    password = newData["password"]

    #must add a check logic, otherwise it might cause redundancy errors

    cur.execute(
        """
        INSERT INTO users (username, password, storage_path)
        VALUES (%s,%s,%s)
        """,
        (username, password, directory)
    )
    conn.commit()

    create_user_area(username)

#---------------------------------------------------------------------
    
#-----------------------------authentication----------------------------------------
@app.post("/authenticate") #authentication {basic}
def authenticate(data : dict):
    username = data["username"]
    password = data["password"]
    #go to database, check for user authenticate with password and set new directory

    cur.execute(
        "SELECT password FROM users WHERE username = %s;",
        (username,)
    )

    user = cur.fetchone()

    if not user: #if user does not exist
        return {"status" : "Does not exists the user"}
    else:
        UserPassword = user[0] #store password of matched user
        if password == UserPassword: #if password matches the database provided one
            return {"status" : "pass"}
        else:
            return {"status" : "Wrong Password"}

#---------------------------------------------------------------------

#-------------------------------upload files to server--------------------------------------
@app.post("/upload")#add files to directory {basic}
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(ROOT_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": "uploaded successfully", "filename": file.filename}
