const app = require("express");
const router = app.Router();

const login = require("./login.routes");
const signUp = require("./signup");
const member = require("./member");
const maintenance = require("./maintenance");
const vehicle = require("./vehicle");
const carmd = require("./carmd");


router.use(login);
router.use(signUp);
router.use(member);
router.use(maintenance);
router.use(vehicle);
router.use(carmd);

module.exports = router;
