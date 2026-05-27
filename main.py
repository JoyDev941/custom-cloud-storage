from fastapi import FastAPI, Request, UploadFile, File
#from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
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
SECRET_KEY = "temp"#os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
os.makedirs(ROOT_FOLDER, exist_ok=True)

app = FastAPI()

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

@app.get("/testing")
def message():
    return "hello"


#as soon as the user logs in the first the first request is going to be 
@app.post("/UserCave")
def check_current_dir(data: dict):
    user_data = decode_token(data["token"])
    user_dir = "./root"+user_data["current_dir"] #this should become /root/admin testing cir
    user_content = os.listdir(user_dir) #should return text01 as a list

    #correct procedure would be to simply send back the content only not rewrite a whole token and send it back
    # cave_data = {
    #     "username" : user_data["username"],
    #     "current_dir" : user_data["current_dir"],
    #     "content" : user_content,
    #     "exp" : user_data["exp"]
    # }


    return {"content" : user_content}

#---------------------------------------------------------------------

#----------------------------token-----------------------------------------

def create_token(username : str):
    user_dir = "/" + username
    data = {
        "username" : username,
        "current_dir" : user_dir,
        }
    payload = data.copy()
    payload["exp"] = datetime.now(timezone.utc) + timedelta(hours=1)

    encode_token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encode_token

def decode_token(token : str):
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=ALGORITHM
        )
    except ExpireSignatureError:
        #create logic of:
        # if user press quit then redirect
        # else create new token
        return "none"


#---------------------------------------------------------------------

#----------------------------registration-----------------------------------------
def create_user_area(username : str):
    os.mkdir("root/"+username)

@app.post("/register") #create a new user {basic}
def register(newData : dict):

    username = newData["username"]
    password = newData["password"]
    directory = "root/"+newData["username"]

    #must add a check logic, otherwise it might cause redundancy errors

    cur.execute(
        """
        INSERT INTO users (username, password, storage_path)
        VALUES (%s,%s,%s)
        """,
        (username, password, directory)
    )
    conn.commit()

    create_user_area(username) #it doesnt work

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
@app.post("/upload")#add files to directory {basic}
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(ROOT_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": "uploaded successfully", "filename": file.filename}


@app.post("/garage") #should show the contents of the root directory, to be used when logged in
def showGarage(token : dict):
    user_data = decode_token(token)
    username = user_data["user"]

    cur.execute(
        "SELECT storage_path FROM users WHERE username=%s;",
        (username,)
    )

    garage_location= cur.fetchone()
    garage_content = os.listdir(garage_location[0])



    