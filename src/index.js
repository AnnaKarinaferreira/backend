const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'biblioteca',
    password: 'senai',
    port: 5432
});

app.use(cors());
app.use(express.json());

app.get('/livros', async (req,res) => { 
    try{
        const result = await pool.query('SELECT * FROM livros');
        res.json(result.rows)
    }catch(err){ // try catch: tenta acessar o banco e se der ruim so vai pro catch e informa o erro.
        console.log(err.messag);
        res.status(500).json({error: "Erro ao buscar livros"})
    }
})

app.get('/livros/:codigo', async (req, res) => {
    const {codigo} = req.params;

    try{
        const result = await pool.query('SELECT * FROM livros WHERE codigo = $1', [codigo]) //$1 quer dizer que vai entarr um argumento dinamico 
        if(result.rows.length === 0){
            return res.status(404).json({error: 'Livro nao encontrado!'})
        }
        res.json(result.rows[0])
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: 'Esse livro não existe'})
    } 
})

app.listen(3000, () => {  //funcao que gerencia o servidor quando esta rodando
    console.log("Servidor rodando na porta 3000!");
}) 

