const express = require("express");
const app = express();
const DbConnect = require("./Db_connector.js");
const validatorModule = require("./Validator.js");
var DbConnect_obj = new DbConnect();
var validator = new validatorModule();
var bodyParser = require("body-parser");

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send({ err: "error" });
});

app.post("/bookTicket", (req, res) => {
  function cb(err, index) {
    console.log(index == "-1", err);
    if (err && index != "-1") {
      res.status({ status: 200, error: err });
    } else if (index == "-1") {
      res.status(403).send({ status: 403, error: err });
    } else
      res
        .status(201)
        .send({ status: 201, TicketId: index, message: "Ticket Booked" });
    return;
  }
  try {
    var name = req.body.name;
    var phone = req.body.contact;
    var Timming = req.body.timming;
    var mssg = validator.validateTicketBooking(name, phone, Timming);
    if (mssg != "ok") {
      res.status(400).send({ status: 400, error: mssg });
    } else {
      DbConnect_obj.InsertNewTicket(name, phone, Timming, cb);
    }
  } catch (e) {
    res.status(400).send({ status: 400, error: "Bad Request" });
  }
});

app.put("/updateTime/:id", (req, res) => {
  function cb(err) {
    if (err == "No such TicketId Found!!") {
      res.status(404).send({ status: 404, error: "No such TicketId Found!!" });
    } else if (err == "Updated Successfully !!") {
      res.status(200).send({ status: 200, message: err });
    } else {
      res.status(500).send({ status: 500, error: err });
    }
    return;
  }
  try {
    var TicketId = req.params.id;
    var newTimming = req.body.newTimming;
    var mssg = validator.validateUpdateReq(TicketId, newTimming);
    if (mssg != "ok") {
      res.status(400).send({ status: 400, error: mssg });
      return;
    }
    DbConnect_obj.UpdateTicketTime(TicketId, newTimming, cb);
  } catch (e) {
    res.status(400).send({ status: 400, error: "Bad Request" });
  }
});

app.delete("/deleteTicket", (req, res) => {
  function cb(err) {
    if (err == "No such TicketId Found!!") {
      res.status(404).send({ status: 404, error: "No such TicketId Found!!" });
    } else if (err == "Deleted Successfully !!") {
      res.status(200).send({ status: 200, message: err });
    } else {
      res.status(500).send({ status: 500, error: err });
    }
  }
  try {
    var TicketId = req.body.ticketId;
    var mssg = validator.validateTicketId(TicketId);
    if (!mssg) {
      res.status(400).send({ status: 400, error: "Invalid Ticket Id" });
      return;
    }
    DbConnect_obj.DeleteTicketId(TicketId, cb);
  } catch (err) {
    res.status(400).send({ status: 400, error: "Bad Request" });
  }
});

app.get("/getUserDetails", (req, res) => {
  function cb(err, data) {
    if (err == "No Such TicketId Exists !") {
      res.status(404).send({ status: 404, error: "No such TicketId Found!!" });
    } else if (err) {
      res.status(500).send({ status: 500, error: err });
    } else {
      res.send({ status: 200, data: data });
    }
  }
  try {
    var TicketId = req.query.ticketId || req.body.ticketId;
    var mssg = validator.validateTicketId(TicketId);
    if (!mssg) {
      res.status(400).send({ status: 400, error: "Invalid Ticket Id" });
      return;
    }
    DbConnect_obj.GetUserDetails(TicketId, cb);
  } catch (err) {
    res.status(400).send({ status: 400, error: "Bad Request" });
  }
});

app.get("/viewTickets", (req, res) => {
  function cb(err, data) {
    console.log(err);
    if (err == "No Ticket Exists For This Timming!") {
      res
        .status(404)
        .send({ status: 404, error: "No Ticket Exists For This Timming!" });
    } else if (err) {
      res.status(500).send({ status: 500, error: err });
    } else {
      res.send({ status: 200, data: data });
    }
  }
  try {
    var date = req.body.date || req.query.date;
    var time = req.body.time || req.query.time;
    var timming = date.toString() + " " + time.toString();
    var msg = validator.validateTimming(timming, true);
    if (msg != "ok") {
      res.status(400).send({ status: 400, error: msg });
      return;
    }
    DbConnect_obj.GetTicketsForTimming(timming.toString(), cb);
  } catch (err) {
    res.status(400).send({ status: 400, error: "Bad Request" });
  }
});

app.listen(port, (req, res) => {
  console.log("Server running on port ", port);
});
