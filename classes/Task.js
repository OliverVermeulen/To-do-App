// exporting to script.js
export class Task {
  _id;
  _name;
  _date;

  constructor(taskId, taskName, taskDate) {
    this._id = taskId;
    this._name = taskName;
    this._date = taskDate;
  }
}