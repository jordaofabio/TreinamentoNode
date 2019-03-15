const { readFile, writeFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

// Outra forma de obter dados do json
// const dadosJson = require('./herois.json')

class Database {

    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }

    async obterAquivos() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return arquivo ? JSON.parse(arquivo.toString()) : arquivo;
    }

    async escreverArquivos(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterAquivos();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const heroiComId = { id, ...heroi };
        const dadosFinal = [ ...dados, heroiComId ];
        const resultado = await this.escreverArquivos(dadosFinal);

        return resultado;
    }

    async listar(id) {
        const dados = await this.obterAquivos();
        // Se não tiver id, traz a lista completa
        const dadosFilstrados = dados ? dados.filter(item => id ? item.id === id : true) : dados;
        return dadosFilstrados;
    }
}

module.exports = new Database();