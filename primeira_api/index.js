const express = require("express");

const app = new express();

app.use(express.json());

var contador_id = 1;

var data = [
    {
        id: 1,
        nome: "Larissa",
        cpf: "99999999999",
        status: true
    }
];


app.get("/listar", (request, response) => {
    return response.send(data);
});


app.get("/listar/:id", (request, response) => {

    const { id } = request.params;

    const pessoa = data.filter((item) => {
        return item.id == id;
    });

    if (pessoa.length == 0) {
        response.status(400).send({
            msg: "Pessoa do código " + id + " não encontrada!"
        });
    }

    response.send(pessoa);
});


app.post("/cadastrar", (request, response) => {

    const { nome, cpf, status } = request.body;

    if (!cpf) {
        return response.status(300).send({
            msg: "O campo CPF é obrigatório!"
        });
    }

    contador_id++;

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    response.status(200).send({
        msg: "Pessoa cadastrada com sucesso!"
    });
});


app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080!");
});


// Status 500 -- erro não catalogado (interno)
// Status 200 -- sucesso
// Status 400 -- não conseguiu encontrar informações
// Status 300 -- validações
