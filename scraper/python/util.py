import os
from dotenv import load_dotenv

load_dotenv()


def get_connection_string() -> str:
    (host_name, username, password) = get_db_env_variables()

    return f'postgresql://{username}:{password}@{host_name}:6543/postgres'


def get_db_env_variables() -> tuple[str, str, str, str]:
    host_name = os.getenv("DB_HOST")
    username = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")

    if host_name == None or username == None or password == None:
        print("Environment Variables Not Set Correctly:")
        if not host_name:
            print(" - DATABASE_HOST Variable Not Set")
        if not username:
            print(" - DATABASE_USERNAME Variable Not Set")
        if not password:
            print(" - DATABASE_PASSWORD Variable Not Set")

        exit(1)

    return (host_name, username, password)
