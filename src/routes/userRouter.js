import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";

const router = Router();

router.post("/singup", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.send("Ya estás registrado");
  }

  // Verifica si el correo es "adminCoder@coder.com" y si el password es "adminCod3r123".
  const role =
    email === "adminCoder@coder.com" && password === "adminCod3r123"
      ? "admin"
      : "usuario";

  const user = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password,
    role, // Establece el rol del usuario.
  });

  req.session.first_name = first_name;
  req.session.last_name = last_name;
  req.session.email = email;
  req.session.age = age;
  req.session.isLogged = true;

  req.session.role = user.role; // Establece el rol en la sesión.

  /* res.redirect("/api/products"); */
  if (user.role === "admin") {
    res.redirect("/api/adminPage");
  } else {
    res.redirect("/api/verProducts");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password }).lean();

  if (!user) {
    return res.send("Tus credenciales son invalidas");
  }

  req.session.first_name = user.first_name;
  req.session.last_name = user.last_name;
  req.session.email = user.email;
  req.session.age = user.age;
  req.session.isLogged = true;

  req.session.role = user.role; // Establece el rol en la sesión.

  /* res.redirect("/api/products"); */
  if (user.role === "admin") {
    res.redirect("/api/adminPage");
  } else {
    res.redirect("/api/verProducts");
  }
});

export default router;