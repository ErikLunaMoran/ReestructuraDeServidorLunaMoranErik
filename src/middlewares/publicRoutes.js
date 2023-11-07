const publicRoutes = (req, res, next) => {
  if (req.session.isLogged) {
    return res.redirect("/profileProducts");
  }
  next();
};

export default publicRoutes;
