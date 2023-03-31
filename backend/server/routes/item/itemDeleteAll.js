const express = require("express");
const router = express.Router();
const newItemModel = require('../../models/itemModel')

router.delete('/deleteAll', async (req, res) => {
    const item = await newItemModel.deleteMany();
    return res.json(item)
  })

  module.exports = router;