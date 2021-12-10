//db connection
const dbConnection = require("../connection/db");

//hashing password
const bcrypt = require("bcrypt");

module.exports = {
  register: (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      req.session.message = {
        type: "danger",
        message: "Please insert all field!",
      };

      return res.redirect("/");
    }

    const hashedPassword = bcrypt.hashSync(password, 10 /*berapa kali diacak*/);

    const query = `INSERT INTO tb_user (id, email, password, created_at, update_at) VALUES (NULL, '${email}', '${hashedPassword}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`;
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(query, (err, results) => {
        if (err) throw err;

        req.session.message = {
          type: "success",
          message: "Register has successfull!",
        };

        res.redirect("/");
      });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      req.session.message = {
        type: "danger",
        message: "Please insert all field!",
      };

      return res.redirect("/");
    }

    dbConnection.getConnection(function (err, conn) {
      if (err) throw err;

      const query = `SELECT * FROM tb_user WHERE email = "${email}";`;
      conn.query(query, function (err, results) {
        if (err) throw err;

        const isMatch = bcrypt.compareSync(password, results[0].password);
        if (!isMatch) {
          req.session.message = {
            type: "danger",
            message: "Account doesn't exist!",
          };
          res.redirect("/");
        } else {
          req.session.message = {
            type: "success",
            message: "Login has successfull!",
          };

          req.session.isLogin = true;
          req.session.isAdmin = results[0].status;

          req.session.user = {
            id: results[0].id,
            email: results[0].email,
          };
          console.log("Sign in as", req.session.isAdmin);
          res.redirect("/");
        }
      });
    });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
