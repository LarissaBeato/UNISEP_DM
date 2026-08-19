const express = require('express');
const app = express();


app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.listen(8080, () => {
    console.log('🚚O servidor está rodando na porta 8080!');
});