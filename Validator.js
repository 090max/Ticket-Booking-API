const moment = require("moment");
const { min } = require("moment");
class Validator {
  //A classs that helps in validation of data ..
  constructor() {}

  validatePhoneNumber(number) {
    var reg = /^\d+$/;
    return reg.test(number) && number.length == 10;
  }

  validateName(name) {
    var reg = /^[A-Za-z\s]+$/;
    return reg.test(name) && name.length;
  }

  validateTicketId(id) {
    var reg = /^\d+$/;
    return reg.test(id);
  }

  validateTime(time) {
    //Format is HH:MM:SS
    var divs = time.replace(/['"]+/g, "").split(":");

    if (divs.length < 2) return "Provide Time in HH:MM:SS Format";
    var hour = parseInt(divs[0].toString());
    var mins = parseInt(divs[1].toString());
    var seconds = divs.length == 3 ? parseInt(divs[2].toString()) : 0;
    if (
      hour >= 0 &&
      hour < 24 &&
      mins >= 0 &&
      mins < 60 &&
      seconds >= 0 &&
      seconds < 60
    )
      return "ok";
    return "Incorrect Time Values";
  }

  validateDate(date, timeString, allowPastDates) {
    //Format is YYYY-mm-dd
    var date_arr = date.replace(/['"]+/g, "").split("-");
    if (date_arr.length != 3) {
      return "Incorrect Date Format";
    }

    if (
      date_arr[0].length != 4 ||
      date_arr[1].length != 2 ||
      date_arr[2].length != 2
    )
      return "Provide Date in YYYY-mm-dd Format";
    var dt_now = moment();
    try {
      var date_given = moment(timeString);
    } catch (e) {
      return "Wrong Date Input";
    }

    if (!date_given.isValid()) return "Wrong Date Input";

    if (date_given < dt_now && !allowPastDates) {
      return "No Booking for past date can be made";
    }
    return "ok";
  }

  validateTimming(timming, allowPastDates = false) {
    var array = timming.split(" ");
    if (array.length != 2) {
      return "Enter Timming in YYYY-mm-dd HH:MM:SS Format";
    }
    var date = array[0].toString();
    var time = array[1].toString();
    var ans1 = this.validateTime(time);
    if (ans1 != "ok") return ans1;
    var ans2 = this.validateDate(date, timming, allowPastDates);
    if (ans2 != "ok") return ans2;
    return "ok";
  }

  validateTicketBooking(name, phone, timming) {
    var ans1 = this.validateName(name);
    if (!ans1) return "Please recheck name provided";
    var ans2 = this.validatePhoneNumber(phone.toString());
    if (!ans2) return "Please recheck contact number provided";
    return this.validateTimming(timming.toString());
  }

  validateUpdateReq(id, timming) {
    var ans1 = this.validateTicketId(id);
    if (!ans1) return "Incorrect Ticket Id";
    return this.validateTimming(timming.toString());
  }
}
module.exports = Validator;
