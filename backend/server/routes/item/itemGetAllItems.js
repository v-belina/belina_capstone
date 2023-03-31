const express = require("express");
const router = express.Router();
const newItemModel = require('../../models/itemModel')

router.get('/getAll', async (req, res) => {
    const item = await newItemModel.find();
    return res.json(item)
  })

  module.exports = router;