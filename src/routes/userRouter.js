import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/signup",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    console.log(req.user);
    res.redirect("/login");
  }
);

//////////////////////////////////////////////////////////////////////////////////

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.isLogged = true;

    res.redirect("/profileProducts");
  }
);

//////////////////////////////////////////////////////////////////////////////////

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

//////////////////////////////////////////////////////////////////////////////////

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.isLogged = true;
    res.redirect("/profileProducts");
  }
);

//////////////////////////////////////////////////////////////////////////////////

router.post("/recover", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).lean();

  if (!user) {
    return res.send(
      "Si tu correo existe en nuestros registros, recibiras un mail con la información para recuperar tu contraseña"
    );
  }

  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await userModel.updateOne({ email }, user);

  res.redirect("/login");
});

//////////////////////////////////////////////////////////////////////////////////

router.get(
  "github",
  passport.authenticate("github", { scope: ["user:email"] })
);

//////////////////////////////////////////////////////////////////////////////////

router.get(
  "/sessions/current",
  passport.authenticate("github", { session: false }),
  async (req, res) => {
    res.send(req.user);
  }
);
export default router;
