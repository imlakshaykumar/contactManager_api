const router = require("express").Router();
const controls = require("../controllers/contactControl");

router.get("/contacts", controls.allContacts);
router.post("/contacts/create", controls.createContact);
router.put("/contacts/:id", controls.updateContact);
router.delete("/contacts/:id", controls.deleteContact);

module.exports = router;
