const { buildFrequencyTable, buildHuffmanTree, buildHuffmanCodes, encode } = require('../utils/huffmanUtils');

exports.compressFile = async (text) => {
    const frequencyTable = buildFrequencyTable(text);
    const huffmanTree = buildHuffmanTree(frequencyTable);
    const huffmanCodes = buildHuffmanCodes(huffmanTree);
    const encodedString = encode(text, huffmanCodes);
    
    return encodedString;
};
