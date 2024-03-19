import os
from dotenv import load_dotenv

load_dotenv()


def get_connection_string() -> str:
    (host_name, username, password, db_port) = get_db_env_variables()

    return f'postgresql://{username}:{password}@{host_name}:{db_port}/postgres'


def get_db_env_variables() -> tuple[str, str, str, str]:
    host_name = os.getenv("DB_HOST")
    username = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    db_port = os.getenv("DB_PORT")

    if host_name == None or username == None or password == None or db_port == None:
        print("Environment Variables Not Set Correctly:")
        if not host_name:
            print(" - DATABASE_HOST Variable Not Set")
        if not username:
            print(" - DATABASE_USERNAME Variable Not Set")
        if not password:
            print(" - DATABASE_PASSWORD Variable Not Set")
        if not db_port:
            print(" - DATABASE_PORT Variable Not Set")

        exit(1)

    return (host_name, username, password, db_port)
