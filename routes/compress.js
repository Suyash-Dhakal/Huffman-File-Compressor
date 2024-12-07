const express=require('express');
const router=express.Router();

router.post('/',huffmanCompress);

module.exports=router;