# Ticket Book REST API

This is a REST API Implementation for Ticket booking and its management.

The server file is `server.js` file.

`Validator.js` contains a class that provides methods for validating different parameters.

`Db_connector.js` contains a class that authenticates and manages MYSQL database transactions and runs cront task. 

## TECH STACK
    NODE.JS
    MYSQL


### Installation

1. To Run the application for development ,Clone the repo
```sh
https://github.com/090max/Ticket-Booking-API
```
2. Install NPM packages.
```sh
npm i
```
3. Install Mysql on your Machine.
4. Go to Db_connector.js file and change username and password to your MYSQL username and password 
5. Run the Server.`
```JS
node server.js
```

# REST API

The REST API is described below.

### Information Retrieval Related

Each endpoint displays related information.

* [Get User Details](documentations/getUserDetails.md) : `GET /getUserDetails/`
* [View Tickets](documentations/viewTickets.md) : `GET /viewTickets/`

### Information Manipulation Related

Each endpoint manipulates or inserts the data.

* [Book Tickets](documentations/bookTickets.md) : `POST /bookTickets/`
* [Delete Ticket](documentations/deleteTicket.md) : `DELETE /deleteTicket/`
* [Update Time](documentations/updateTime.md) : `PUT /updateTime/:id/`


