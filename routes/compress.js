const express=require('express');
const {huffmanCompression}=require('../controllers/compress');

const router=express.Router();

router.post('/',huffmanCompression);

module.exports=router;