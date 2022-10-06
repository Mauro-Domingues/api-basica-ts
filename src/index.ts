import express from 'express';

const app = express();
const PORT = (process.env.PORT || 3000);

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    return res.status(200)
    .send('<h1 style="text-align: center; margin-top: 50px;">App rodando</h1>');
});

let pessoas = [
    {"id": 0, "nome": "joao0"},
];

app.get('/pessoas', (req, res) => {
    return res.status(200).send(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
    const pessoaId = req.params.id;
    const pessoa = pessoas.find(pessoa => {
        return (pessoa.id === Number(pessoaId));
    });
    return res.status(200).send(pessoa);
});

app.post('/pessoas', (req, res) => {
    const pessoa = req.body;
    pessoas.push(pessoa);
    return res.status(201).send(pessoas);
});

app.put('/pessoas/:id', (req, res) => {
    const pessoaId = req.params.id;
    const pessoaAtt = req.body;

    pessoas = pessoas.map(pessoa => {
        if (pessoa.id === Number(pessoaId)) {
            pessoa.nome = pessoaAtt.nome;
        }
        return pessoa;
    });
    return res.status(200).send(pessoaAtt);
});

app.delete('/pessoas/:id', (req, res) => {
    const pessoaId = req.params.id;
    pessoas = pessoas.filter((pessoa) => pessoa.id !== Number(pessoaId));
    return res.status(204).send({message: "Usuário excluído"});
});