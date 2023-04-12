const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyPasrser = require('body-parser');

const rotaServico = require('./routes/servico');
const rotaFuncionario = require('./routes/funcionario');

app.use(morgan('dev'));
app.use(bodyPasrser.urlencoded({ extended: false}));
app.use(bodyPasrser.json()); //json de entrada


app.use((req, res, next) =>{
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Acces-Control-Allow-Header', 
    'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET')
        return res.status(200).send({});
    }
    next();
});

app.use('/servico', rotaServico);
app.use('/funcionario', rotaFuncionario); 

//quando nao encontra rota
app.use((req, res, next) =>{
    const erro = new Error('Não encontado');
    erro.status = 404;
    next(erro)
}); 

app.use((error, req,res,next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});



module.exports = app;
