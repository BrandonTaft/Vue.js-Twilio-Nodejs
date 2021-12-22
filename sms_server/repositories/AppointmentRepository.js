const Appointment = require('../models/Appointment');

class AppointmentRepository {

  constructor(model) {
    this.model = model;
  }

  // create a new Appointment
  create(name) {
    const newAppointment = { name, done: false };
    const Appointment = new this.model(newAppointment);

    return Appointment.save();
  }

  // return all Appointments

  findAll() {
    return this.model.find();
  }

  //find Appointment by the id
  findById(id) {
    return this.model.findById(id);
  }

    // delete Appointment
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  //update Appointment
  updateById(id, object) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done, notification: object.notification } });
  }

  updateByName(name, object) {
    const query = { name: name };
    return this.model.findOneAndUpdate(query, { $set: { name: object.name, done: object.done, notification: object.notification } });
  }
}

module.exports = new AppointmentRepository(Appointment);