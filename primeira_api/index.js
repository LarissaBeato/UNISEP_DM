const express = require('express');
const app = new express();

app.use(express.json());

var data = [{
    nome: "Larissa",
    cpf: "123.456.789-00",
    status: true
}];

app.get('/Listar', (request, response) => {
    return response.send(data);
});

app.post("/cadastrar", (request, response) => {
    const { nome, cpf, status } = request.body;
/*     const nome = request.body.nome;
    const cpf = request.body.cpf;
    const status = request.body.status; */
    
/*     console.log("Dados da pessoa:");
    console.log(nome);
    console.log(cpf);
    console.log(status); */

    data.push({
        nome: nome,
        cpf: cpf,
        status: status
    });

    return response.send("Pessoa cadastrada com sucesso!");
});

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');

    console.log('teste');
});
