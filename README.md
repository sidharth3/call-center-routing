# Contact Center Routing for Rainbow Communication Platform Project
## 50.003 Elements of Software Construction 
### Project Details:
Client: Alcatel Lucent Technologies     
Pseudo Company: Pear Technologies   
Group 2-2

<br/>

## Install dependencies
```
npm install
```

## Set up local database 
1. Use Xampp (preferred and create a MySQL server
2. Create a new database and import database from /esc/database.sql 
3. Name this database as 'sampledb'
4. Start and run the Apache and MySQL server

## Start Localhost Server
```
npm start
```

## Rainbow setup
To simulate interactions, login as an agent on  https://web-sandbox.openrainbow.com/  
#### Login details
Username: hidden (request for info)    
Password: hidden (request for info)

<b>You can start playing around with the website now!</b>
<br/>

## Usage
- It is a simple and intuitive customer service chat platform. There will be a pop-up on the bottom right hand side of the screen.    
- Simply click it and you will be presented with options to be routed to any available online agent.
- Make sure one agent is online on the Rainbow Sandbox so you can test its functionality

## Testing
### Selenium tests
- There are a selenium codes in the /seleniumTest folder. Run it with java environment with WebDriver installed
### Mocha Chai Unit Tests
```
npm test
```
There are over a 100 unit tests included for a good level of coverage.   

<br/>

## Built with 
* [OpenRainbow](https://www.openrainbow.com/en/developers) - OpenRainbow communication platform by Alcatel Lucent Technologies. We used the Node.JS SDK
* [Google Cloud Platform](https://cloud.google.com/) - GCP used to host our client website and our MySQL database
* MySQL - database to hold information of our agents
* NodeJS - for server side routing with Rainbow APIs 



## Authors
- Akmal Hakim Teo - SUTD Sophomore | Information Systems Technology & Design (ISTD)
- Sidharth Praveenkumar - SUTD Sophomore | Information Systems Technology & Design (ISTD)
- Daryll Wong - SUTD Sophomore | Information Systems Technology & Design (ISTD)
- Shawn Chua - SUTD Sophomore | Information Systems Technology & Design (ISTD)

