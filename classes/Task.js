// exporting to script.js
export class Task {
  _id;
  _type;
  _name;
  _date;

  constructor(taskId, taskType, taskName, taskDate) {
    this._id = taskId;
    this._type = taskType;
    this._name = taskName;
    this._date = taskDate;
  }
}