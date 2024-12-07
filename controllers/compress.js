const huffmanService = require('../services/huffmanService');

async function huffmanCompression(req,res){
    const body=req.body;
    if(!body){
        return res.status(400).json({error:"String is required for compression"});
    }
    try {
        const encodedString = await huffmanService.compressFile(req.body.text);  // Assuming text is passed in the request body
        res.json({ encodedString });
    } catch (error) {
        res.status(500).json({ message: 'Error compressing text', error: error.message });
    }
}

module.exports={huffmanCompression};