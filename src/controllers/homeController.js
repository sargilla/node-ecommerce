module.exports = {
  home: function (req, res) {
    return res.render("index", { title: "E-Commerce" });
  },
};
