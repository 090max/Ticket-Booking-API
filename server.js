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
    if (err) {
      res.status({ status: 200, error: err });
    }
    res
      .status(201)
      .send({ status: 201, TicketId: index, message: "Ticket Booked" });
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

app.put("/update", (req, res) => {
  function cb(err) {
    if (err == "No such TicketId Found!!") {
      res.status(404).send({ status: 404, error: "No such TicketId Found!!" });
    } else if (err == "Updated Successfully !!") {
      res.status(200).send({ status: 200, message: err });
    } else {
      res.status(400).send({ status: 400, error: err });
    }
    return;
  }
  try {
    var TicketId = req.body.ticketId;
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

app.get("/d", (req, res) => {
  function cb(err) {
    res.send({ error: err });
  }
  DbConnect_obj.DeleteTicketId(1, cb);
});

app.get("/id", (req, res) => {
  function cb(err, data) {
    res.send({ error: err, data: data });
  }
  DbConnect_obj.GetUserDetails(3, cb);
});
app.listen(port, (req, res) => {
  console.log("Server running on port ", port);
});
