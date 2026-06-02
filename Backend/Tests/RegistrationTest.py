import requests

def TestRegister():
    testData = {
        "username" : "Temporary",
        "password" : "temp"
    }
    response = requests.post("http://127.0.0.1:8000/register", json=testData)

    print(response.status_code)
    print(response.json())

