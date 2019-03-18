const { readFile, writeFile } = require('fs');
const { promisify } = require('util');
const Heroi = require('./heroi');

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
        const dadosOrganizados = dados.sort(function(a, b) {
            return a.id - b.id;
        });
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dadosOrganizados));
        return true;
    }

    async cadastrar(heroi) {
        const dados = await this.obterAquivos();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        const heroiComId = { ...heroi, id };
        const dadosFinal = [ ...dados, heroiComId ];
        console.log('dadosFinal', dadosFinal)
        
        const resultado = await this.escreverArquivos(dadosFinal);

        return resultado;
    }

    async listar(id) {
        const dados = await this.obterAquivos();
        // Se não tiver id, traz a lista completa
        const dadosFilstrados = dados ? dados.filter(item => id ? item.id === id : true) : dados;
        return dadosFilstrados;
    }
    
    async remover(id) {
        let lista = await this.obterAquivos();

        const indice = lista.findIndex(item => item.id === parseInt(id));
        lista.splice(parseInt(indice), 1);

        return await this.escreverArquivos(lista);
    }


    async atualizar(idOrginal, novosDados) {
        const original = await this.listar(parseInt(idOrginal))

        if (original.length === 0) {
            throw Error('O herói informado não existe')
        }
        const registroAtualizado = {
            ...original,
            ...novosDados
        }

        await this.remover(idOrginal);
        await this.cadastrar(new Heroi(registroAtualizado));

        return await this.listar(idOrginal);

    }
}

module.exports = new Database();