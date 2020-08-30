var mysql = require("mysql");
const cron = require("node-cron");
var moment = require("moment");

class DbConnect {
  constructor() {
    this.mysqCredentials = {
      host: "localhost",
      user: "root",
      password: "1234",
    };
    this.mysqCredentialsDB = {
      host: "localhost",
      user: "root",
      password: "1234",
      database: "TicketManager",
    };
    this.connection = mysql.createConnection(this.mysqCredentials);
    this.connection.connect(function (err) {
      if (err) throw err;
      console.log("Database Connected!");
    });

    this.creatDatabase = new Promise((res, rej) => {
      var connection = this.connection;
      connection.query("CREATE DATABASE TicketManager", function (err, result) {
        if (err) res("Database already exists..");
        else res("Database created TicketManager");
      });
    });

    this.createTableTickets = new Promise((res, rej) => {
      var connection = this.connection;
      var sql =
        "CREATE TABLE Tickets(TicketId INT AUTO_INCREMENT PRIMARY KEY,Name VARCHAR(500),Contact VARCHAR(256),Timming TIMESTAMP DEFAULT CURRENT_TIMESTAMP);";
      connection.query(sql, function (err, result) {
        if (err) res("Table Tickets already exists ..");
        else res("Table Created Tickets");
      });
    });

    this.useDatabase = new Promise((res, rej) => {
      this.connection.end();
      this.connection = mysql.createConnection(this.mysqCredentialsDB);
      this.connection.connect(function (err) {
        if (err) res(err);
        res("Database With TicketManager Connected!");
      });
    });

    Promise.all([
      this.creatDatabase,
      this.createTableTickets,
      this.useDatabase,
    ]).then((values) => {
      console.log(values);
      this.scheduleCron();
      this.task.start();
    });
  }

  scheduleCron() {
    console.log("Cron Started ...");
    this.task = cron.schedule(
      "*/1 * * * *",
      () => {
        // console.log("Starting the cron ..");
        try {
          this.ScheduledTicketsDeletion();
        } catch (err) {
          error = new error(err);
          console.log(error);
        }
        // console.log("Ending cron");
      },
      {
        scheduled: false,
      }
    );
  }

  ScheduledTicketsDeletion() {
    var connection = this.connection;
    var threshold = moment.duration("08:00:00");
    var timeReq = moment()
      .subtract(threshold)
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();
    var sql_del = "DELETE FROM Tickets WHERE Timming<='" + timeReq + "'";

    connection.query(sql_del, (err, result) => {
      if (err) throw err;
      else
        result.affectedRows
          ? console.log("Deleted ..", result.affectedRows)
          : "";
    });
  }

  CheckCountOfItems(timming, insertIfOk) {
    var connection = this.connection;
    var sql = "SELECT COUNT(*) FROM Tickets where Timming= '" + timming + "'";
    connection.query(sql, (err, result) => {
      if (err) {
        insertIfOk(false);
        throw err;
      } else {
        var res = result[0]["COUNT(*)"];
        if (res >= 20) insertIfOk(false);
        else insertIfOk(true);
      }
    });
  }

  InsertNewTicket(name, contact, timming, cb) {
    var connection = this.connection;

    function insertIfOk(ok) {
      if (!ok) {
        cb("Seats Buffer For This Timming Is Full", -1);
      } else {
        var values = [name, contact, timming];

        var sql =
          "INSERT INTO Tickets (Name, Contact, Timming) VALUES ('" +
          name +
          "','" +
          contact +
          "','" +
          timming +
          "')";

        connection.query(sql, function (err, result) {
          var idx = "";
          var error = "";
          if (err) err = error;
          else idx = result.insertId;
          cb(err, result.insertId);
        });
      }
    }
    this.CheckCountOfItems(timming, insertIfOk);
  }

  checkIfTicketIdExist(TicketId, cb) {
    var connection = this.connection;
    var sql_check = "SELECT * FROM Tickets WHERE TicketId='" + TicketId + "'";
    connection.query(sql_check, (err, result) => {
      if (err) cb(err);
      else if (result.length == 0) {
        cb("No such TicketId Found!!");
        return;
      } else {
        cb("");
      }
    });
  }

  UpdateTicketTime(TicketId, newTime, cb) {
    var connection = this.connection;
    var sql =
      "Update Tickets set Timming='" +
      newTime +
      "' where TicketId='" +
      TicketId +
      "'";

    function updateTicketIfIdExists(err) {
      if (err) {
        cb(err);
      } else {
        connection.query(sql, (err, result) => {
          if (err) cb(err);
          else cb("Updated Successfully !!");
          return;
        });
      }
    }

    this.checkIfTicketIdExist(TicketId, updateTicketIfIdExists);
  }

  DeleteTicketId(TicketId, cb) {
    var connection = this.connection;
    var sql_del = "DELETE FROM Tickets WHERE TicketId='" + TicketId + "'";

    function DeleteIfTicketIdExists(err) {
      if (err) {
        cb(err);
      } else {
        connection.query(sql_del, (err, result) => {
          if (err) cb(err);
          else cb("Deleted Successfully !!");
          return;
        });
      }
    }

    this.checkIfTicketIdExist(TicketId, DeleteIfTicketIdExists);
  }

  GetUserDetails(TicketId, cb) {
    var connection = this.connection;
    var sql_detail = "SELECT * FROM Tickets WHERE TicketId='" + TicketId + "'";
    connection.query(sql_detail, (err, result) => {
      if (err) cb(err);
      else if (result.length == 0) {
        cb("No Such TicketId Exists !");
      } else {
        var data = {
          Name: result[0].Name,
          Contact: result[0].Contact,
        };
        cb("", data);
      }
    });
  }

  GetTicketsForTimming(timming, cb) {
    var connection = this.connection;
    var sql_detail = "SELECT * FROM Tickets WHERE Timming='" + timming + "'";

    connection.query(sql_detail, (err, result) => {
      if (err) cb(err);
      else if (result.length == 0) {
        cb("No Ticket Exists For This Timming!");
      } else {
        var data = [];
        result.forEach((res) => {
          var temp = {
            TicketId: res.TicketId,
            Name: res.Name,
            Contact: res.Contact,
          };
          data.push(temp);
        });

        cb("", data);
      }
    });
  }
}

module.exports = DbConnect;
