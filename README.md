# Pitt-Gym-Tracker

## Motivation
Right now, the only way to see counts for Pitt Gym facilities is to go to [this website](https://www.studentaffairs.pitt.edu/campus-recreation/facilities/live-facility-counts)  

I did not know this even existed as a Pitt student, and now that I have seen it, it is not very useful and is unappealing.  

I want to make this site better, as well as provide historical data and hopefully predict the best time to go on any given day with machine learning. 

## Technology Used
- Python + BeautifulSoup => Web Scraping
- AWS Lambda + AWS Event Bridge => Run the scraper at a certain interval
- Docker + AWS ECR + GitHub Actions => CI/CD Pipeline to update Lambda automatically
- PlanetScale => Serverless SQL Database
- Next.js => Frontend
- TailwindUI => Frontend Components (shoutout Ming)

## Future Features
- Add Week by Week Lines in Month Graph
- Add Month by Month Lines in Year and YTD Graphs
- Add a point's Date to Tooltip
- Show predictions for different gym times
- Add extra graphs for Week/Month/Year/YTD/All to show breakdowns for day of week and other useful information

# Thanks for checking out my project!
