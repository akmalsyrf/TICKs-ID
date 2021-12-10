const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

//request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ejs
require("ejs");
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//session
const session = require("express-session");
app.use(
  session({
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "secretValue",
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//routes endpoint
const routes = require("./routes/index");
app.use(routes);

//not found
app.use((req, res) => {
  res.sendStatus(404);
});

//server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
