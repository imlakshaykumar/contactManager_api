const contactModel = require("../models/contactModel");

const contactControl = {
  async allContacts(_req, res) {
    try {
      const contacts = await contactModel.find();
      return res.status(200).json({ contacts });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  async createContact(req, res) {
    try {
      const { firstName, lastName, phone, email } = req.body;

      const newContact = new contactModel({
        firstName,
        lastName,
        phone,
        email,
      });

      await newContact.save();

      // res.send("hello");

      return res
        .status(201)
        .json({ message: "contact created successfully", contact: newContact });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },

  async updateContact(req, res) {
    try {
      const { emailId } = req.params;

      const { email, firstName, lastName, phone } = req.body;

      let contact = await contactModel.findOne(emailId);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      //updateContact
      contact.firstName = firstName;
      contact.lastName = lastName;
      contact.phone = phone;
      contact.email = email;

      await contact.save();

      return res
        .status(200)
        .json({ message: "contact updates successfully", contact });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  },
  async deleteContact(req, res) {
    try {
      const { emailId } = req.params;

      const deletedContact = await contactModel.findOneAndDelete(emailId);

      if (!deletedContact) {
        return res.status(404).json({ message: "contact not found" });
      }

      return res
        .status(200)
        .json({ message: "Contact Deleted", deletedContact });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Internal server Error" });
    }
  },
};

module.exports = contactControl;
