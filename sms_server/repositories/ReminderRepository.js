const Reminder = require('../models/Reminder');

class ReminderRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new Reminder
  create(name) {
    const newReminder = { name, done: false };
    const Reminder = new this.model(newReminder);

    return Reminder.save();
  }

  // return all Reminders

  findAll() {
    return this.model.find();
  }

  //find reminder by the id
  findById(id) {
    return this.model.findById(id);
  }

    // delete reminder
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update reminder
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done } });
  }
}

module.exports = new ReminderRepository(Reminder);