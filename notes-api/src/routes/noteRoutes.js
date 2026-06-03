const express = require("express");
const poll = require("../db/connect.js");
const app = express();
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware.js")

router.get("/notes", authMiddleware, async(req, res) => {
    res.json({
        message: "Acesso permitido",
        userId: req.userId
    })
})

module.exports = router;