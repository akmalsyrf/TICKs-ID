const layout = "partials/main-layout";
const isHome = false;

//db connection
const dbConnection = require("../connection/db");

module.exports = {
  root: (req, res) => {
    const title = "TICKs ID - Buy Movies Ticket";

    if (req.session.isLogin) {
      res.render("index", {
        title,
        isLogin: req.session.isLogin,
        isAdmin: req.session.isAdmin,
        email: req.session.user.email,
        isHome: true,
        layout,
      });
    } else {
      res.render("index", {
        title,
        isLogin: req.session.isLogin,
        isAdmin: req.session.isAdmin,
        isHome: true,
        layout,
      });
    }
  },
  genre: (req, res) => {
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const id = req.params.id;
      const query = `SELECT * FROM tb_type WHERE id=${id}`;
      conn.query(query, (err, results) => {
        //   console.log(results);
        const type = results;

        if (err) throw err;
        const query = `SELECT * FROM tb_movie WHERE type_id=${type[0].id}`;
        conn.query(query, (err, results) => {
          if (err) throw err;

          const genre = type[0].name;
          const movies = results;

          if (req.session.isLogin) {
            res.render("genre", {
              title: `${genre} - TICKs ID`,
              isLogin: req.session.isLogin,
              isAdmin: req.session.isAdmin,
              email: req.session.user.email,
              isHome,
              layout,
              genre,
              movies,
            });
          } else {
            res.render("genre", {
              title: `${genre} - TICKs ID`,
              isLogin: req.session.isLogin,
              isAdmin: req.session.isAdmin,
              isHome,
              layout,
              genre,
              movies,
            });
          }
        });
      });
    });
  },
};
