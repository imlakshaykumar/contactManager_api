const router = require("express").Router();
const controls = require("../controllers/contactControl");

router
  .get("/contacts", controls.allContacts)
  .post("/contacts", controls.createContact);

router
  .get("/contacts/:id", controls.getContact)
  .put("/contacts/:id", controls.updateContact)
  .delete("/contacts/:id", controls.deleteContact);

module.exports = router;
