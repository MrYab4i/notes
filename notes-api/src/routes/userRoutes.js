//userRoutes.js

const express = require("express");
const router = express.Router();
const pool = require("../db/connect.js");
const bcrypt = require("bcrypt");

require("../db/connect.js");

router.post("/users", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);;
    const values = [name, email, hashedPassword];
    const sql = ("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)");

    try {
        await pool.query(sql, values);
        
        res.status(201).json({  

            message: "usuario criado",
            user: {
                name,
                email
            }

        })

    } catch(error){
//        console.log(error);
        if(error.code === "23505"){

            return res.status(409).json({
                error: " email ja existe"
            })
            
        }

        return res.status(500).json({
            erro: "erro interno"
        })

    }
   
})

module.exports = router;
