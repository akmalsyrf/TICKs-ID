const layout = "partials/main-layout";
const isHome = false;

//db connection
const dbConnection = require("../connection/db");

module.exports = {
  get: (req, res) => {
    const idMovie = req.params.idMovie;

    dbConnection.getConnection((err, conn) => {
      if (err) throw err;

      const query = `SELECT * FROM tb_movie WHERE id=${idMovie}`;
      conn.query(query, (err, results) => {
        if (err) throw err;
        // console.log(results);

        if (results.length < 1) {
          const title = "Payment - TICKs ID";

          if (req.session.isLogin) {
            res.render("payment", {
              title,
              isLogin: req.session.isLogin,
              isAdmin: req.session.isAdmin,
              email: req.session.user.email,
              isHome: true,
              layout,
              success: false,
            });
          } else {
            res.render("payment", {
              title,
              isLogin: req.session.isLogin,
              isAdmin: req.session.isAdmin,
              isHome,
              layout,
              success: false,
            });
          }
        } else {
          const { idMovie, name, image } = results[0];
          const title = "Payment - TICKs ID";

          if (req.session.isLogin) {
            res.render("payment", {
              title,
              isLogin: req.session.isLogin,
              isAdmin: req.session.isAdmin,
              email: req.session.user.email,
              isHome: true,
              layout,
              success: true,
              idMovie,
              name,
              image,
            });
          } else {
            res.render("payment", {
              title,
              isLogin: req.session.isLogin,
              isAdmin: req.session.isAdmin,
              isHome,
              layout,
              success: true,
              idMovie,
              name,
              image,
            });
          }
        }
      });
    });
  },
  post: (req, res) => {
    const { amount } = req.body;
    console.log(req.body);

    // dbConnection.getConnection((err, conn)=>{
    //     if (err) throw err

    //     const query = `INSERT INTO tb_payment VALUE (NULL, ${amount}, )`
    //     conn.query()
    // })
  },
};
