const express = require("express");
const { Availability } = require("../Controllers/Availablity");
const router = express.Router();


router.post("/add-availability/:userId", Availability);


module.exports = router;
