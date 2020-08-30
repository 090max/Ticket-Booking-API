# Ticket Book REST API

This is a REST API Implementation for Ticket booking and its management.

The server file is `server.js` file.

`Validator.js` contains a class that provides methods for validating different parameters.

`Db_connector.js` contains a class that authenticates and manages MYSQL database transactions and runs cront task. 

## Install
    git clone "https://github.com/090max/Ticket-Booking-API"
    cd Ticket-Booking-API
    npm install
    node server.js

# REST API

The REST API is described below.

### Information Retreival Related

Each endpoint displays related information.

* [Get User Details](documentations/getUserDetails.md) : `GET /getUserDetails/`
* [View Tickets](documentations/viewTickets.md) : `GET /viewTickets/`

### Information Manipulation Related

Each endpoint manipulates or inserts the data.

* [Book Tickets](documentations/bookTickets.md) : `POST /bookTickets/`
* [Delete Ticket](documentations/deleteTicket.md) : `DELETE /deleteTicket/`
* [Update Time](documentations/updateTime.md) : `PUT /updateTime/:id/`


