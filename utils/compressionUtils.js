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

module.exports={
    buildFrequencyTable,
    buildHuffmanTree,
    buildHuffmanCodes,
    encode,
};