from hashlib import pbkdf2_hmac

def hash_password( password) -> str:
    # user = bytes(user, "utf-8")
    password = bytes(password, "utf-8")

    return pbkdf2_hmac('sha1', password, password, 100).hex()

