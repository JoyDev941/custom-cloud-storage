from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

SECRET_KEY = "temp"
ALGORITHM = "HS256"

def create_token(data : dict):
    payload = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=1)

    payload.update({"exp" : expire})

    encode_jwt = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encode_jwt

def decode_token(token : str):
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=ALGORITHM
        )
    except jwt.ExpireSignatureError:
        print("expired")

key = create_token({"user" : "Test"})

print("Key : "+ key)

decode = decode_token(key)

print(decode)
