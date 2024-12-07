const express= require('express');
const fs = require('fs');
const PORT=8000;
const compressRoute=require('./routes/compress');
const decompressRoute=require('./routes/decompress');


const app=express();

app.use(express.json());
app.use('/compress',compressRoute);
// app.use('/decompress',decompressRoute);

app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
    
})

// function saveEncodedBinary(encodedText) {
//     // Create a binary data buffer
//     const binaryData = Buffer.alloc(Math.ceil(encodedText.length / 8));
    
//     for (let i = 0; i < encodedText.length; i += 8) {
//         let byte = 0;
//         for (let j = 0; j < 8; j++) {
//             byte = (byte << 1) | (encodedText[i + j] === '1' ? 1 : 0);
//         }
//         binaryData[i / 8] = byte;
//     }

//     // Write the binary data to a file (encoded-data.bin)
//     fs.writeFileSync('encoded-data.bin', binaryData);
//     console.log('Encoded binary data has been saved as "encoded-data.bin"');
// }

// // Example usage
// const text = "this is an example for huffman encoding";
// if (text) {
//     const frequencyTable = buildFrequencyTable(text);
//     const huffmanTree = buildHuffmanTree(frequencyTable);
//     const huffmanCodes = buildHuffmanCodes(huffmanTree);
//     const encodedText = encode(text, huffmanCodes);
//     const decodedText = decode(encodedText, huffmanTree);
//     const originalSize = text.length; // in bytes (characters)
//     const encodedSize = encodedText.length; // in bits
//     const encodedSizeInBytes = Math.ceil(encodedSize / 8); // in bytes

//     console.log(`Original text: ${text}`);
//     console.log(`Original text size: ${originalSize} bytes`);
//     console.log(`Encoded text: ${encodedText}`);
//     console.log(`Encoded text size in bytes: ${encodedSizeInBytes} bytes`);
//     console.log(`Decoded text: ${decodedText}`);

//     // save the encodedText
//     saveEncodedBinary(encodedText);
    
// } else {
//     console.log("Input text is empty!");
// }
    
    