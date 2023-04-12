const express = require('express');
const router = express.Router();

//retorna todos os funcionarios
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'GET - Retorna todos  funcionario'

    });
});
// insere um funcionario
router.post('/', (req, res, next) =>{
    const funcionario = {
        nome: req.body.nome,
        funcao: req.body.funcao
    }

    res.status(201).send({
        mensagem: 'POST - Funcionario incluido com sucesso',
        funcionarioCriado: funcionario
    });
});

//retorna um produto especifico

router.get('/:ID_Funcionario', (req, res, next) => {
    const id = req.params.ID_funcionario

    if (id === 'Corte'){
    res.status(200).send({
        mensagem: ' GET - Detalhes do Funcioanrio ',
        id: id 
    });

    }else {
        res.status(200).send({
            mensagem: 'Voce passou um id'
        })
    }

});
//altera um funcionario
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'usando o PATCH dentro da rota de funcionario'
    });
});

//exclui um funcionario
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'DELETE - Funcionario deletado'
    });
});



module.exports = router;