const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

// Outra forma de obter dados do json
// const dadosJson = require('./herois.json')

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterAquivos() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    escreverArquivos() {

    }

    async listar(id) {
        const dados = await this.obterAquivos();
        // Se não tiver id, traz a lista completa
        const dadosFilstrados = dados.filter(item => id ? item.id === id : true);
        return dadosFilstrados;
    }
}

module.exports = new Database();