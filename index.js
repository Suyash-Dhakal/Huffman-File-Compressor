const express= require('express');
const PORT=8000;


const app=express();

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

// Example usage
const text = "this is an example for huffman encoding";
if (text) {
    const frequencyTable = buildFrequencyTable(text);
    const huffmanTree = buildHuffmanTree(frequencyTable);
    const huffmanCodes = buildHuffmanCodes(huffmanTree);
    const encodedText = encode(text, huffmanCodes);
    const decodedText = decode(encodedText, huffmanTree);

    console.log(`Original text: ${text}`);
    console.log(`Encoded text: ${encodedText}`);
    console.log(`Decoded text: ${decodedText}`);
} else {
    console.log("Input text is empty!");
}
    
    