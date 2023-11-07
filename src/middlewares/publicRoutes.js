const publicRoutes = (req, res, next) => {
  if (req.session.isLogged) {
    return res.redirect("/api/profileProducts");
  }
  next();
};

export default publicRoutes;
