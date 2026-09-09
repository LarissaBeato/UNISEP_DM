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
        return response.status(400).send({
            msg: "Pessoa do código " + id + " não encontrada!"
        });
    }

    return response.send(pessoa);
});

app.post("/cadastrar", (request, response) => {
    const { nome, cpf, status } = request.body;

    if (!nome) {
        return response.status(300).send("O campo Nome é obrigatório!");
    } else if (!cpf) {
        return response.status(300).send("O campo CPF é obrigatório!");
    }

    contador_id++;

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    return response.status(200).send({
        msg: "Pessoa cadastrada com sucesso!"
    });
});

app.delete("/deletar/:id", (request, response) => {
    const { id } = request.params;

    const indice = data.findIndex((item) => {
        return item.id == id;
    });

    data.splice(indice, 1);

    response.send(data);
});

app.put("/atualizar", (request, response) => {
    const {id , nome, cpf, status} = request.body;

    const indicePessoa = data.findIndex((item) => {
        return item.id == id;
    });

    if(indicePessoa == -1){

        response.status(400).send({msg: "O id " + id + " não existe!"});

    }else{

    data[indicePessoa].nome = nome;
    data[indicePessoa].cpf = cpf;
    data[indicePessoa].status = status;

    }
  
});

app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080!");
});

// Status 500 -- erro não catalogado (interno)
// Status 200 -- sucesso
// Status 400 -- não conseguiu encontrar informações
// Status 300 -- validações