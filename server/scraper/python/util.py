import os
from dotenv import load_dotenv

def get_connection_string() -> str:
    (host_name, username, password, db_name) = get_env_variables()

    return f'mysql+mysqlconnector://{username}:{password}@{host_name}:3306/{db_name}'

def get_env_variables() -> tuple[str, str, str, str]:
    load_dotenv()

    host_name= os.getenv("DB_HOST")
    username= os.getenv("DB_USERNAME")
    password= os.getenv("DB_PASSWORD")
    db_name= os.getenv("DB_NAME")

    if host_name == None or username == None or password == None or db_name == None:
        print("Environment Variables Not Set Correctly:")
        if not host_name:
            print(" - DATABASE_HOST Variable Not Set")
        if not username:
            print(" - DATABASE_USERNAME Variable Not Set")
        if not password:
            print(" - DATABASE_PASSWORD Variable Not Set")
        if not db_name:
            print(" - DATABASE Variable Not Set")
        
        exit(1)

    return (host_name, username, password, db_name)