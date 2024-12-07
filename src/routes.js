const express = require('express');
const routes = express.Router();
const DB = require("./times");

/* TO DO:
    POST: nome, cidade, estado, Série (A, B, C ou Vazio), json array: 
    titles(qntd titulos do time {estadual, nacional e internacional}), folha de pagamento. Só o campo série pode ser vazio. 
    PUT: Atualizar qualquer campo
    DELETE: byId
*/
routes.get('/times', (req, res) => {
    res.json(DB.times);
});

routes.get('/times/:nome', (req, res) => {
    const { nome } = req.params;
    const time = DB.times.find(t => t.nome == nome);
    if (!time) {
        res.status(400).json({ error: "Time não encontrado" });
    } else {
        res.json(time);
    }
});

routes.post('/times', (req, res) => {
    const { 
        nome, 
        cidade, 
        estado, 
        serie, 
        titulos, 
        folhaPagamento 
    } = req.body;
    if (nome && cidade && estado && titulos && folhaPagamento != undefined) {
        const id = DB.times.length + 1;
        DB.times.push({
            id,
            nome,
            cidade,
            estado,
            serie,
            titulos,
            folhaPagamento
        });
        res.status(201).json({ success: "Time cadastrado com sucesso" });
    } else {
        res.status(400).json({ error : "Dados obrigatorios incompletos" })
    }
});

routes.put('/times/:id', (req, res) => {
    const { id } = req.params;
    const { 
        nome, 
        cidade, 
        estado, 
        serie, 
        titulos, 
        folhaPagamento 
    } = req.body;
    const time = DB.times.find(t => t.id == id);
    if (!time) {
        res.status(400).json({ error: "Time não encontrado" });
    } else {
        if (nome != undefined) time.nome = nome;
        if (cidade != undefined) time.cidade = cidade;
        if (estado != undefined) time.estado = estado;
        if (serie) time.serie = serie;
        if (titulos != undefined) time.titulos = titulos;
        if (folhaPagamento != undefined) time.folhaPagamento = folhaPagamento;
        res.json({ success: "Time atualizado com sucesso" });
}
});

routes.delete('/times/:id', (req, res) => {
    const { id } = req.params;
    const index = DB.times.findIndex(t => t.id == id);
    if (index == -1) {
        res.status(400).json({ error: "Time não encontrado" });
    } else {
        DB.times.splice(index, 1);
        res.json({ success: "Time deletado com sucesso" });
    }
});


module.exports = routes;
