const express = require('express');
const router = express.Router();
const Table = require('../schemae/Table').Table;


router.post("/createTable", async (req, res) => {

    const numPlayers = req.body.numPlayers, tableName = req.body.tableName, startingValue = req.body.startingValue, smallBlind = req.body.smallBlind, bigBlind = req.body.bigBlind, status = req.body.status;
    console.log(numPlayers)
    
    try {
        const newTable = await Table.create({
            
            numPlayers: numPlayers,
            tableName: tableName,
            startingValue: startingValue,
            smallBlind: smallBlind,
            bigBlind: bigBlind,
            status: status,
            curPlayers: 1,
        })

        // await newTable.save()
        // res.send(newTable)
        res.json ({
            auth: true,
            Table: newTable,
        });
    }
    catch (err) {
        console.log(err.toString());
        res.json({
            auth: false,
            message: err.toString()
        });
    }


    // await table.save()
    
});

router.get("/tableList", async (req, res) => {
    const tables = await Table.find()
    res.send(tables)
});

router.get("/tableGet/:id", async (req, res) => {
    try {
        const table = await Table.findOne({ _id: req.params.id });
        res.send(table)
    }
    catch {
        res.status(404)
        res.send({error: "Table doesn't exist"});
    }
})

router.delete("tableDelete/:id", async (req, res) => {
    try {
        await Table.deleteOne({ _id: req.params.id })
        res.status(204).send();
    }
    catch {
        res.status(404)
        res.send({ error: "Table doesn't exist"})
    }
})



module.exports = router;