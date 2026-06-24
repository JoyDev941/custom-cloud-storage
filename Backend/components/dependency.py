from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from dotenv import load_dotenv

import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def create_token(username : str): # postgress["username"] -> create_token() -> Store location info -> return packaged token
    
    data = {
        "username" : username
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
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=ALGORITHM
        )

def create_user_area(username : str, directory : str):
    os.makedirs(directory)

def check_current_dir(username: str):
    return {"status" : "ok"}



def get_file_list(data : dict, conn, cur):
    try:

        username = data["username"]

        cur.execute("SELECT storage_path FROM users WHERE username = %s", (username,))
        result = cur.fetchone()
        storage_path = result[0]

        user_content = os.listdir(storage_path)

        files = {}

        for item in user_content:
            name, ext = os.path.splitext(item)
            item_path = os.path.join(storage_path, item)

            if os.path.isdir(item_path):
                files[name] = "folder"

            else:
                files[name] = ext

        return { "content" : files}

    except FileNotFoundError:

        return {"status" : "file not found"}