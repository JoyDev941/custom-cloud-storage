from components.dependency import create_token, decode_token, create_user_area, get_file_list
from fastapi import FastAPI, Request, UploadFile, File, Form
from jose import ExpiredSignatureError
from fastapi.responses import RedirectResponse
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

import psycopg2
import shutil
import os
#pip install multipart

# TODO: Implement connection pooling to handle PostgreSQL timeouts
# For now, restart PostgreSQL manually if connection fails

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

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

@app.on_event("shutdown")
def shuteverything():
    cur.close()
    conn.close()
    print("bye bye")


#as soon as the user logs in the first the first request is going to be 
@app.post("/UserCave")
def check_current_dir(data: dict):
    #{"username" : str, "current_dir" : str, exp : int}
    user_info = decode_token(data["token"])
    try:
        if data["scen"] == "2":
            
            filename = data["filename"]
            # Update storage_path in database
            cur.execute(
                "UPDATE users SET storage_path = storage_path || %s WHERE username = %s",
                ("/" + filename + "/", user_info["username"])
            )
            conn.commit()
    
            # Then return the folder contents
            return {"status" : "ok"}

        else:

            result = get_file_list({"username": user_info["username"]}, conn, cur)
            
            return result





    except ExpiredSignatureError:

        return {"status" : "expired token"}

#---------------------------------------------------------------------

#----------------------------registration-----------------------------------------

@app.post("/register") #create a new user {basic}
def register(data : dict):

    username = data["username"]
    password = data["password"]
    directory = "root/"+username+"/Prefix/UserCave"

    cur.execute(
        "SELECT password FROM users WHERE username = %s;",
        (username,)
    )
    user = cur.fetchone()

    if not user:
        create_user_area(username, directory)
        cur.execute(
            """
            INSERT INTO users (username, password, storage_path)
            VALUES (%s,%s,%s)
            """,
            (username, password, directory)
        )
        conn.commit()
        return {"status" : "ok"}
    else:
        return {"status" : "user exists"}

#---------------------------------------------------------------------
    
#-----------------------------authentication----------------------------------------
@app.post("/authenticate") #authentication {basic}
def authenticate(data : dict):
    #functional
    username = data["username"]
    password = data["password"]
    #go to database, check for user authenticate with password and set new directory

    cur.execute(
        "SELECT password FROM users WHERE username = %s;",
        (username,)
    )
    user = cur.fetchone()

    if not user:
        return {"Status" : "User Does not exist"}
    else:
        if user[0] == password:
            #create token
            token = create_token(username)
            return {"Status" : "ok", "token" : token}
        else:
            return {"Status" : "failed"}

#---------------------------------------------------------------------

#-------------------------------upload files to server--------------------------------------
# @app.post("/Uplod")#add files to directory {basic}
# def upload_file(file: UploadFile = File(...), token: str = Form(...), current_dir: str = Form(...)):
#     try:
#         user_data = decode_token(token)
        
#         print(f"current_dir: '{current_dir}'")
#         print(f"username: '{user_data['username']}'")
        
#         file_path = os.path.join(
#             "root", 
#             user_data["username"], 
#             "Prefix/UserCave" + current_dir,
#             file.filename
#         )
        
#         print(f"final file_path: '{file_path}'")

#         return {"status" : "ok"}

#     except ExpiredSignatureError:
#         return {"status" : "expired token"}

#---------------------------------------------------------------------

#-------------------------------Download files from server--------------------------------------

@app.post("/Downl")
def Downl(data : dict):
    #{token : token, filename: selectedFile}
    try:
        user_data = decode_token(data["token"])

        username = user_data["username"]

        # using username, find the user path
        cur.execute(
            "SELECT storage_path FROM users WHERE username = %s",
            (username,)
        )
        user = cur.fetchone()

        filelocation = user[0] + "/" + user_data["filename"]

        # filelocation = "./root/" + user_data["username"] + "/Prefix/UserCave" + user_data["current_dir"] + "/" + data["filename"]
        # print(filelocation)

        return FileResponse(
            path=filelocation,
            filename=data["filename"],
            media_type="application/octet-stream"
        )

    except ExpiredSignatureError:
        return{"status" : "Token Expired"}

# @app.post("/Del")
# def Del(data : dict):
#     try:
#         user_data = decode_token(data["token"])

#         filelocation = "./root/" + user_data["username"] + "/Prefix/UserCave" + user_data["current_dir"] + "/" + data["filename"]

#         if(os.path.isfile(filelocation)):
#             os.remove(filelocation)
#             return {"status" : "ok"}
#         else:
#             return{"status" : "file not found or check for console error"}

#     except ExpiredSignatureError:
#         return {"status" : "Token Expired"}