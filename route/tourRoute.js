const express = require("express");
const app = express();

const router = express.Router();
const tourCountroller = require("../controller/tourController")

//get all tour
router.get("/tours",tourCountroller.getAllTours);

module.exports = router;