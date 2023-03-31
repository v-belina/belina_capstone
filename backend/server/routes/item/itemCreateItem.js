const express = require("express");
const router = express.Router();
const { newItemValidation } = require('../../models/itemValidator')
const newItemModel = require('../../models/itemModel')

router.post('/createNewItem', async (req, res) => {
    const { error } = newItemValidation(req.body);
    console.log(error)
    if (error) return res.status(400).send({ message: error.errors[0].message });

    const { id, name, price } = req.body

    //creates a new item
    const createItem = new newItemModel({
        itemId: id,
        itemName: name,
        itemPrice: price,
    });

   
    try {
        const saveNewItem = await createItem.save();
        res.send(saveNewItem);
    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Error trying to create new item" });
    }

})

module.exports = router;