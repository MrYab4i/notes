//app.js

//porta 3000
//http://localhost:3000
const express = require("express");
const pool = require("./db/connect.js");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

//user
const userRoutes = require("./routes/userRoutes.js");
//"./routes/userRoutes.js"
app.use(userRoutes);

//login
const loginRoutes = require("./routes/loginRoutes.js");
//"./routes/loginRoutes.js"
app.use(loginRoutes);

/*
test
this block was created to test the connectio to the db

app.get("/test-db", async (req, res) => {
    
    const result = await pool.query("SELECT NOW()");
    
    res.json(result.rows,{
        message: "API funcionando"
    })  
    
})
*/
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});