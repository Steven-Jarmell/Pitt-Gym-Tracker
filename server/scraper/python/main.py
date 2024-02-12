from sqlalchemy import create_engine
from model import Base
from util import get_connection_string, get_page_url
from bs4 import BeautifulSoup
import requests

def parse_page(page: str):
    soup = BeautifulSoup(page, 'html.parser')

    gym_info_list = soup.find_all("div", class_="barChart")

    for gym in gym_info_list:
        text = gym.get_text("|", strip=True)
        
        info = text.split("|")
        print(f'Name: {info[0]}')
        print(f'Status: {info[1][1:-1]}')
        print(f'Count: {info[2][12:]}')
        print(f'Last Updated: {info[3][9:]}')
        print('\n')

def main():
    # Scrape Website
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
    }

    page = requests.get(get_page_url(), headers=headers)

    parse_page(page.text)

    # Connect to SQL Database
    connection_string = get_connection_string()
    engine = create_engine(connection_string)

    # Ensure the table is created
    Base.metadata.create_all(engine)

    # Insert data into table

if __name__ == "__main__":
    main()