const layout = "partials/main-layout";
const isHome = false;

const title = "Admin menu - TICKs ID";

//db connection
const dbConnection = require("../connection/db");

module.exports = {
  get: (req, res) => {
    res.render("addMovie", {
      title,
      isLogin: req.session.isLogin,
      email: req.session.email,
      isAdmin: req.session.isAdmin,
      isHome,
      layout,
    });
  },
  post: (req, res) => {
    const { movTitle, genre, movieHour, date, time } = req.body;
    console.log(req.body);
    let image = "";

    if (req.file) {
      console.log(req.file.filename);
      image = req.file.filename;
    }

    if (movTitle == "" || genre == "" || movieHour == "" || date == "" || time == "") {
      req.session.message = {
        type: "danger",
        message: "Please input all fields!",
      };
      return res.render("addMovie", {
        title,
        isLogin: req.session.isLogin,
        email: req.session.email,
        isAdmin: req.session.isAdmin,
        isHome,
        layout,
      });
    }

    const query = `INSERT INTO tb_movie (id, name, movie_hour, created_at, update_at, type_id, image) VALUES (NULL, '${movTitle}', '${movieHour}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${genre}, '${image}');`;

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
      conn.query(query, function (err, results) {
        // console.log(results);
        if (err) throw err;

        req.session.message = {
          type: "success",
          message: "Add movie has successfull",
        };
        res.redirect("/");
      });
    });
  },
};
