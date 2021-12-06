const express = require('express');
const router = express.Router();
const Table = require('../schemae/Table').Table;
const { body, validationResult } = require('express-validator');

router.post(
    "/createTable",
    body('numPlayers').isInt({min:2, max:7}),
    body('tableName').isAscii(),
    body('startingValue').isInt({min:0}),
    body('smallBlind').isInt({min:0}),
    body('bigBlind').isInt({min:0}),
    body('status').isIn(["public", "private"]),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.json({
                auth: false,
                errors: errors.array()})
        }
    
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

router.delete("/tableDelete/:id", async (req, res) => {
    
    console.log(req.params.id)
    try {
        
        await Table.deleteOne({ _id: req.params.id })
        res.status(204).send();
    }
    catch {
        res.status(404)
        res.send({ error: "Table doesn't exist"})
    }
})

router.patch("/tableJoin/:id", async(req, res) => {
    try {
        // console.log(id)

        const table = await Table.findOne({_id: req.params.id })

        if (table.curPlayers >= table.numPlayers) {
            table.curPlayers = table.numPlayers
        }
        else {
            table.curPlayers = table.curPlayers + 1;
        }
        

        await table.save()
        res.send(table)
    } catch {

        res.status(404)
        res.send({ error: "Table does't exist"})
    }
})

router.patch("/tableLeave/:id", async(req, res) => {
    try {
        const table = await Table.findOne({_id: req.params.id })

        table.curPlayers--

        await table.save()
        res.send(table)
        
    } catch {

        res.status(404)
        res.send({ error: "Table does't exist"})
    }
})



module.exports = router;