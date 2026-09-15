import express from "express";

import Knex from "knex";

const mysql = Knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "suporte"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mysql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conectar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
        console.log(error);
    }
}

testaConexaoComBancoDeDados();

const app = new express();

app.use(express.json());

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

app.get("/listar", async (req, res) => {
    const chamados = await mysql.select("*").from("chamado");

    res.send(chamados);
});

app.get("/listar/:id", async (req, res) => {
    const { id } = req.params;

    const chamado = await mysql
        .select("*")
        .from("chamado")
        .where({ id: id });

    res.send(chamado);
});

app.post("/cadastrar", async (req, res) => {
    const { cliente, problema, prioridade, status } = req.body;

    const chamado = await mysql
        .insert({
            cliente,
            problema,
            prioridade,
            status
        })
        .into("chamado");

    res.send({
        msg: `Chamado do cliente ${cliente} cadastrado com sucesso!`
    });
});

app.put("/atualizar", async (req, res) => {
    const { id, cliente, problema, prioridade, status } = req.body;

    const chamado = await mysql("chamado")
        .where({ id })
        .update({
            cliente,
            problema,
            prioridade,
            status
        });

    res.send(chamado);
});


app.delete("/deletar/:id", async (req, res) => {
    const { id } = req.params;

    const chamado = await mysql("chamado").where({ id }).del();

    res.send(chamado);

});


