const express= require('express');
const fs = require('fs');
const PORT=8000;
const compressRoute=require('./routes/compress');
const decompressRoute=require('./routes/decompress');


const app=express();

app.use(express.json());
app.use('/compress',compressRoute);
app.use('/decompress',decompressRoute);

app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
    
})

class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function buildFrequencyTable(text) {
    if (text === "") return [];
    const freqMap = new Map();
    for (const char of text) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }
    const result = [];
    for (let [char, freq] of freqMap) {
        result.push(new Node(char, freq));  // Adds the new Node to the result array
    }
    return result;  // Returns the array of Node objects
}

function buildHuffmanTree(nodes){
    while(nodes.length>1){
        nodes.sort((a,b)=>{
            a.freq-b.freq;
        });
        const left=nodes.shift(); //returns smallest freq char(obj) from nodes
        const right=nodes.shift();//returns 2nd smallest freq char(obj) from nodes
        const newNode= new Node(null, left.freq + right.freq, left, right);
        nodes.push(newNode);
    }
    return nodes[0] || null; //return the root node after the creation of huffman tree
    // return null; Handle case where nodes might be empty
}

function buildHuffmanCodes(node,prefix="",codeMap=new Map()){
    if(!node) return codeMap;
    if(node.char !==null){
        codeMap.set(node.char,prefix);
    }
    else{
        buildHuffmanCodes(node.left,prefix+"0",codeMap);
        buildHuffmanCodes(node.right,prefix+"1",codeMap);
    }
    return codeMap;
}

function encode(text, codeMap){
    let encodedText="";
    for(let char of text){
        encodedText+=codeMap.get(char); // Append the Huffman code for each character
    }
    return encodedText;
}

function decode(encodedText, huffmanTree){
    let decodedText="";
    let currentNode = huffmanTree;
    for (const bit of encodedText) {
        if (bit === "0") {
            currentNode = currentNode.left;
        } else {
            currentNode = currentNode.right;
        }
    
        if (currentNode?.char !== null) {  
        // ?. is Optional Chaining operator that allows to safely 
        // access properties of an object that might be null or undefined

            decodedText += currentNode.char;
            currentNode = huffmanTree;
        }
    }
    return decodedText;
}

function saveEncodedBinary(encodedText) {
    // Create a binary data buffer
    const binaryData = Buffer.alloc(Math.ceil(encodedText.length / 8));
    
    for (let i = 0; i < encodedText.length; i += 8) {
        let byte = 0;
        for (let j = 0; j < 8; j++) {
            byte = (byte << 1) | (encodedText[i + j] === '1' ? 1 : 0);
        }
        binaryData[i / 8] = byte;
    }

    // Write the binary data to a file (encoded-data.bin)
    fs.writeFileSync('encoded-data.bin', binaryData);
    console.log('Encoded binary data has been saved as "encoded-data.bin"');
}

// Example usage
const text = "this is an example for huffman encoding";
if (text) {
    const frequencyTable = buildFrequencyTable(text);
    const huffmanTree = buildHuffmanTree(frequencyTable);
    const huffmanCodes = buildHuffmanCodes(huffmanTree);
    const encodedText = encode(text, huffmanCodes);
    const decodedText = decode(encodedText, huffmanTree);
    const originalSize = text.length; // in bytes (characters)
    const encodedSize = encodedText.length; // in bits
    const encodedSizeInBytes = Math.ceil(encodedSize / 8); // in bytes

    console.log(`Original text: ${text}`);
    console.log(`Original text size: ${originalSize} bytes`);
    console.log(`Encoded text: ${encodedText}`);
    console.log(`Encoded text size in bytes: ${encodedSizeInBytes} bytes`);
    console.log(`Decoded text: ${decodedText}`);

    // save the encodedText
    saveEncodedBinary(encodedText);
    
} else {
    console.log("Input text is empty!");
}
    
    