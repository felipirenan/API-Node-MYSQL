const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos os servicos
router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM Servico',
            (error, resultado, field) => {

                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })
});
// insere um servico
router.post('/', (req, res, next) => {


    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO Servico 
            (Nome_Servico,Valor_Servico,Tempo_Servico) values (?,?,?)`,
            [req.body.nome, req.body.valor, req.body.tempo],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }
                return res.status(201).send({ mensagem: 'POST - Produto Inserido com Sucesso', ID_Servico: resultado.insertId });
            }
        )
    })


});

//retorna um produto especifico

router.get('/:ID_Servico', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT * FROM Servico 
            WHERE ID_Servico = ?;`,
            [req.params.ID_Servico],
            (error, resultado, field) => {

                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({ response: resultado })
            }
        )

    })

});

router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE Servico 
            SET Nome_Servico = ?, Valor_Servico = ?, Tempo_Servico = ? Where ID_Servico = ? `,
            [req.body.nome,
            req.body.valor,
            req.body.tempo,
            req.body.ID_Servico],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }
                return res.status(202).send({ mensagem: 'PATCH - Produto Alterado com Sucesso', ID_Servico: resultado.insertId });
            }
        )
    })
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM Servico
             Where ID_Servico = ?`,
            [req.body.ID_Servico],
            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }
                return res.status(202).send({ mensagem: 'DELETE - Produto excluido com Sucesso', ID_Servico: resultado.insertId });
            }
        )
    })
});

module.exports = router;