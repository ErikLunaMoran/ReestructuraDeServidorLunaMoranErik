import express from "express";
import handlebars from "express-handlebars";

const app = express();
const httpServer = app.listen(8080, () =>
  console.log("servidor en funcionamiento")
);

app.engine("handlebars", "./src/views"); //vamos a utilizar handlebars como motor de plantillas
app.set("views", "./srv/views");
app.set("view engine", "handlebars");
app.use(express.static("./srv/public"));
