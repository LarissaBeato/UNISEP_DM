import expresse from "express";
import Knex from "knex";

const mysql = Knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "mercado"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mysql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conecatar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

const app = new expresse();

app.use(expresse.json());

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});

app.get("/listar", async (req, res) => {
    
    const produtos = await mysql.select("*").from("produto");
    //const produtos = await mysql.raw('Select * from produto');

    res.send(produtos);
});

app.get("/listar/:id", async (req, res) => {

    const { id } = req.params;
    const produto = await mysql.select("*").from("produto").where({id : id});

    res.send(produto);
})

app.post("/cadastrar", async (req, res) => {
    const { nome, preco, qtd_estoque } = req.body;

    const produto = await mysql.insert({ nome, preco, qtd_estoque }).into("produto");
    res.send({ msg: `Produto ${nome} cadastrado com sucesso!` });
})

app.put("/atualizar", async (req, res) => {
    const { id, nome, preco, qtd_estoque } = req.body;

    const produto = await mysql("produto").where({id}).update({ nome, preco, qtd_estoque });
    res.send(produto);
})

//msg: `Produto ${nome} atualizado com sucesso!` 