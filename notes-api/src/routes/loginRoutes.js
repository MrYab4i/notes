const express = require("express");
const pool = require("../db/connect.js");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken")


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try{
        const sql = "SELECT * FROM users WHERE email = $1";
        const result = await pool.query(sql, [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                error: "Email ou senha invalidos"
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Email ou senha invalidos"
            })
        }
        
        const token = jwt.sign(
            { id: user.id },
            process.env.TK_JWT,
            { expiresIn: "1d"}
        );

        return res.status(200).json({
            message: "Login realizado",
            chave: `${token}`
        })

    } catch( error){
        console.log(error);
        return res.status(500).json({
            error: "Erro interno"
        })

    }
})

module.exports = router;