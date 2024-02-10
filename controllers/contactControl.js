const contactModel = require("../models/contactModel");

const contactControl = {
  async allContacts(_req, res) {
    const contacts = await contactModel.find();
    return res.status(200).json(contacts);
  },

  async createContact(req, res) {
    try {
      const { name, phone, email } = req.body;

      if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields ate mandatory...");
      }

      const newContact = new contactModel({
        name,
        phone,
        email,
      });

      await newContact.save();

      return res
        .status(201)
        .json({ message: "contact created successfully", contact: newContact });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },

  async getContact(req, res) {
    try {
      const contact = await contactModel.findById(req.params.id);
      if (!contact) {
        res.send(404);
        throw new Error("Contact not found");
      }
      res.send(200).json(contact);
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },

  async updateContact(req, res) {
    try {
      const contact = await contactModel.findById(req.params.id);
      if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
      }

      const updatedContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );

      await contact.save();

      /*
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
      */
      return res
        .status(200)
        .json({ message: "contact updates successfully", updatedContact });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "internal server error" });
    }
  },
  async deleteContact(req, res) {
    try {
      //const { emailId } = req.params;
      const deletedContact = await contactModel.findOneAndDelete(req.params.id);

      if (!deletedContact) {
        res.status(404);
        throw new Error("Contact not found");
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
