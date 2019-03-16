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
    
    async deletar(id) {
        let lista = await this.obterAquivos();

        const indice = lista.findIndex(item => item.id === parseInt(id));
        lista.splice(parseInt(indice), 1);

        return await this.escreverArquivos(lista);
    }

    async atualizar(idOrginal, novosDados) {
        const listar = await this.listar(parseInt(idOrginal))

        if (listar.length === 0) {
            throw Error('O herói informado não existe')
        }
        const registroAtualizado = {
            ...novosDados,
            id: idOrginal
        }

        await this.deletar(idOrginal);
        await this.cadastrar(registroAtualizado);

        return await this.listar(idOrginal);

    }
}

module.exports = new Database();