const express = require('express');
const conexao = require("./db");
const vendaController = require("./controller/venda.controller");

const app = express();

//Database
conexao
    .authenticate()
    .then(() => {
        console.log("Connection made with successfully");
    })
    .catch((error) => {
        console.log(error);
    })


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine','ejs');
app.use(express.static('public'));


app.use("/", vendaController);
app.use("/", (req, res) => { res.redirect("/venda"); })

app.listen(8080,() => {
    console.log("Server rodando");
});