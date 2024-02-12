import os
from dotenv import load_dotenv

load_dotenv()


def get_connection_string() -> str:
    (host_name, username, password, db_name) = get_db_env_variables()

    return f'mysql+mysqlconnector://{username}:{password}@{host_name}:3306/{db_name}'


def get_db_env_variables() -> tuple[str, str, str, str]:
    host_name = os.getenv("DB_HOST")
    username = os.getenv("DB_USERNAME")
    password = os.getenv("DB_PASSWORD")
    db_name = os.getenv("DB_NAME")

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


def get_page_url() -> str:
    url = os.getenv("CONNECT_2_URL")

    if url == None:
        print("Environment Variables Not Set Correctly:")
        print(" - CONNECT_2_URL Variable Not Set")

        exit(1)

    return url
