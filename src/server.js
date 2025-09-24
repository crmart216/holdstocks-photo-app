const express = require("express");
const router = require("./loader/router.js");
const path = require("path");


const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Serving ./public at http://localhost:${PORT}`);
});

