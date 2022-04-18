// exporting to script.js
export class Task {
  _id;
  _name;
  _date;
  _completed;

  constructor(taskId, taskName, taskDate, taskCompleted) {
    this._id = taskId;
    this._name = taskName;
    this._date = taskDate;
    this._completed = taskCompleted;
  }
}