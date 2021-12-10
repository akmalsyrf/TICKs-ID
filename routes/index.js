const express = require("express");
const router = express.Router();

//multer
const uploadFile = require("../middlewares/uploadFile");

//routes
const page = require("../controllers/page");
router.get("/", page.root);
router.get("/genre/:id", page.genre);

//
const auth = require("../controllers/auth");
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/logout", auth.logout);

//
const payment = require("../controllers/payment");
router.get("/payment", (req, res) => res.redirect("/payment/0"));
router.get("/payment/:idMovie", payment.get);

//
const addMovie = require("../controllers/addMovie");
router.get("/admin", addMovie.get);
router.post("/admin/", uploadFile("poster"), addMovie.post);

//
const editMovie = require("../controllers/editMovie");
router.get("/admin-edit/:id", editMovie.get);
router.post("/admin-edit/", editMovie.put);
router.get("/admin-delete/:id", editMovie.delete);

module.exports = router;
