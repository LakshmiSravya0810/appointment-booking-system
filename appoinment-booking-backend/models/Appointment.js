const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
  type: String,
  required: true,
  validate: {
    validator: function (v) {
      return /^\d{10}$/.test(v); // only 10 digits
    },
    message: props => `${props.value} is not a valid 10-digit phone number!`
  }
},
  doctor: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  reason: {
    type: String
  },
  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked"
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
