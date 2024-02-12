from sqlalchemy import create_engine
from model import Base
from util import get_connection_string

def main():
    connection_string = get_connection_string()

    engine = create_engine(connection_string)

    Base.metadata.create_all(engine)

if __name__ == "__main__":
    main()