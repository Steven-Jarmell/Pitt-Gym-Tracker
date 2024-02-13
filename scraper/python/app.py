from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from model import Base, Gym
from util import get_connection_string, get_page_url
from bs4 import BeautifulSoup
import requests
import logging

logger = logging.getLogger()
logger.setLevel("INFO")
# Test

def handler(event, context):
    logger.info("Starting Lambda")

    # Connect to SQL Database
    connection_string = get_connection_string()
    engine = create_engine(connection_string)
    logger.info("Successfully connected to DB")

    # Ensure the table is created
    Base.metadata.create_all(engine)

    # Scrape Data and Insert into Database

    # Was getting a Mod Security Error
    # Fix: https://stackoverflow.com/questions/61968521/python-web-scraping-request-errormod-security
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
    }

    page = requests.get(get_page_url(), headers=headers)
    soup = BeautifulSoup(page.text, 'html.parser')
    logger.info("Successfully got page HTML")

    gym_info_list = soup.find_all("div", class_="barChart")

    # Iterate through list and insert rows into db
    # Duplicate rows not added incase there was no update in between runs
    for gym in gym_info_list:
        text = gym.get_text("|", strip=True)

        info = text.split("|")

        with Session(engine) as session:
            gym_entry = Gym(
                name=info[0],
                count=info[2][12:],
                time=info[3][9:],
                status=info[1][1:-1] == 'Open'
            )

            session.add(gym_entry)

            try:
                session.commit()
            except IntegrityError as err:
                logger.exception("Item already exists in the DB")
                logger.exception(err)
                logger.exception(f"Tried to add: {gym_entry}")
            except Exception as err:
                logger.exception("Unknown Error Occurred Committing to the DB")
                logger.exception(err)
                logger.exception(f"Tried to add: {gym_entry}")
            finally:
                logger.info("Rolling back after exception")
                session.rollback()

    logger.info("Finished")
