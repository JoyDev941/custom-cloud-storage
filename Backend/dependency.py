from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

SECRET_KEY = "temp"#os.getenv("SECRET_KEY")
ALGORITHM = "HS256"

def create_token(username : str): # postgress["username"] -> create_token() -> Store location info -> return packaged token
    data = {
        "username" : username,
        "current_dir" : "/",
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

def create_user_area(username : str):
    os.makedirs("./root/"+username+"/Prefix/UserCave/")