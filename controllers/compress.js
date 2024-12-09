const fs = require('fs');
const huffmanService = require('../services/huffmanService');

// Converts encoded text into binary buffer
function getBinaryBuffer(encodedText) {
    // Create a binary data buffer
    const binaryData = Buffer.alloc(Math.ceil(encodedText.length / 8));
    
    for (let i = 0; i < encodedText.length; i += 8) {
        let byte = 0;
        for (let j = 0; j < 8; j++) {
            byte = (byte << 1) | (encodedText[i + j] === '1' ? 1 : 0);
        }
        binaryData[i / 8] = byte;
    }
    return binaryData;
}

async function huffmanCompression(req,res){
    const body=req.body;
    if(!body){
        return res.status(400).json({error:"String is required for compression"});
    }
    try {
        const encodedString = await huffmanService.compressFile(req.body.text);  // Assuming text is passed in the request body
        const binaryBuffer = getBinaryBuffer(encodedString);

        // Send binary file as response for download
        res.setHeader('Content-Disposition', 'attachment; filename="encoded-data.bin"');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(binaryBuffer);
    } catch (error) {f
        res.status(500).json({ message: 'Error compressing text', error: error.message });
    }
}



module.exports={huffmanCompression};