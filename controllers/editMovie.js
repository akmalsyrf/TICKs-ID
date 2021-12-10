const layout = "partials/main-layout";
const isHome = false;

const title = "Admin menu - TICKs ID";

//db connection
const dbConnection = require("../connection/db");

module.exports = {
  get: (req, res) => {
    const id = req.params.id;

    const query = `SELECT * FROM tb_movie WHERE id = ${id};`;

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      conn.query(query, (err, results) => {
        if (err) throw err;
        const movie = results[0];
        // console.log(movie);

        res.render("editMovie", {
          title,
          isLogin: req.session.isLogin,
          email: req.session.email,
          isAdmin: req.session.isAdmin,
          isHome,
          layout,
          id,
          movie,
        });
      });
    });
  },
  put: (req, res) => {
    const { id, movTitle, genre, movieHour, date, time } = req.body;
    console.log(req.body);
    if (movTitle == "" || genre == "" || movieHour == "" || date == "" || time == "") {
      req.session.message = {
        type: "danger",
        message: "Please input all fields!",
      };
      return res.render("editMovie", {
        title,
        isLogin: req.session.isLogin,
        email: req.session.email,
        isAdmin: req.session.isAdmin,
        isHome,
        layout,
      });
    }

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `UPDATE tb_movie SET name='${movTitle}', movie_hour='${movieHour}' WHERE id=${id};`;
      conn.query(query, function (err, results) {
        // console.log(results);
        if (err) throw err;
        req.session.message = {
          type: "success",
          message: "Edit movie has successfull",
        };
        res.redirect("/");
      });
    });
  },
  delete: (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM tb_movie WHERE id=${id};`;

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(query, function (err, results) {
        if (err) throw err;

        req.session.message = {
          type: "success",
          message: "Delete movie has successfull",
        };
        return res.redirect("/");
      });
    });
  },
};
