import moment from "moment/moment";

export class DateFormat {
  static format() {
    return moment().format("DDMMYYYY-HHmmss_SSS");
  }
}
