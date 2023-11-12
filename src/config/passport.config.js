import passport from "passport";
import LocalStrategy from "passport-local";
import GitHubStrategy from "passport-github2";
import bcrypt from "bcrypt";
import { userModel } from "../dao/models/user.model.js";

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
          const exists = await userModel.findOne({ email: username });
          if (exists) {
            return done(null, false);
          }

          const user = await userModel.create({
            first_name,
            last_name,
            age,
            email: username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          });

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.87f9595b6c0717f4",
        clientSecret: "2af835a00f9d7f06ffed5271b260179a7e0f2930",
        callbackURL: "http://localhost:8080/api/githubcallback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const user = await userModel.findOne({ email });
          if (!user) {
            const newUser = await userModel.create({
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              password: "",
              email,
            });

            done(null, newUser);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //SEREALIZE Y DESEREALIZE USER
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;

/* const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        const userExists = await userModel.findOne({ email });

        if (userExists) {
          return done(null, false);
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
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
          role, // Establece el rol del usuario.
        });

        return done(null, user);
      }
    )
  );

  //SEREALIZE Y DESEREALIZE USER
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username }).lean();
          if (!user) {
            return done(null, false);
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
          }

          done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}; */
