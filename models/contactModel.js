const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "add the contact name: "],
  },
  phone: {
    type: String,
    required: [true, "add the phone number: "],
  },
  email: {
    type: String,
    required: [true, "add the email address: "],
  },
});

module.exports = mongoose.model("contacts", contactSchema);
