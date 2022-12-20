const express = require("express");
const router = express.Router();
const Venda = require("../model/venda");
const Produto = require("../model/produto");

var produtos = [];

router.get("/venda", (req, res) => {
    Venda.findAll().then(vendas => {
        res.render("index", {vendas: vendas});
    });
})

router.get("/venda/criar", (req, res) => {
    res.render("novaVenda", {produtos: produtos});
})

router.get("/venda/editar/:id", async (req, res) => {
    const id= req.params.id;

    const venda = await Venda.findByPk(id,{ include: "produtos" });
    res.render("editaVenda", {venda: venda});
})


router.post("/venda/criar", async (req, res) => {
    if(req.body.vote == "adicionar produto") {
        produtos.push({nome: req.body.nome, quantidade: req.body.quantidade, preco: req.body.preco})
        res.render("novaVenda", {produtos: produtos});
    } else {

        let total = 0;
        for (const produto of produtos) {
            total = produto.quantidade * produto.preco;
        }

        try {
            const vendaCriada = await Venda.create({
                quantidadeProdutos: produtos.length,
                totalVenda: total || 0
            })
    
            for (const produto of produtos) {
                await Produto.create({
                    nome: produto.nome,
                    preco: produto.preco,
                    quantidade: produto.quantidade,
                    vendaId: vendaCriada.dataValues.id
                });
            } 

            res.redirect("/venda");
            produtos = [];
        } catch (error) {
            res.redirect("/venda");
            produtos = []; 
        }
    }
})

router.post("/venda/:id/editar", async (req, res) => {
    const vendaId = req.params.id;

    if(req.body.vote == "adicionar produto") {
        await await Produto.create({
            nome: req.body.nome,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            vendaId: vendaId
        });

        const venda = await Venda.findByPk(vendaId,{ include: "produtos" });
        res.render("editaVenda", {venda: venda});

    } else if (req.body.vote == "remover produto") {
        await Produto.destroy({where: {id: req.body.produtoId}});

        const venda = await Venda.findByPk(vendaId,{ include: "produtos" });
        res.render("editaVenda", {venda: venda});
    } else if ("salvar") {
        const venda = await Venda.findByPk(vendaId,{ include: "produtos" });

        let total = 0;
        for (const produto of venda.produtos) {
            total = produto.quantidade * produto.preco;
        }

        try {
            await Venda.update({
                quantidadeProdutos: venda.produtos.length,
                totalVenda: total || 0
            }, {where: {id: vendaId}});

            res.redirect("/venda");
            produtos = []; 
        } catch (error) {
            res.redirect("/venda");
            produtos = []; 
        }
    }
    
})

router.post("/venda/delete/:id", async (req, res) => {
    const vendaId = req.params.id;

    await Venda.destroy({where: {id: vendaId}});
    Venda.findAll().then(vendas => {
        res.render("index", {vendas: vendas});
    });
})



module.exports = router