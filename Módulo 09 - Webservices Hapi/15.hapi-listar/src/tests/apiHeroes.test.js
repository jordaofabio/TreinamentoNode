const assert = require('assert');
const api = require('./../api');

let app = {};

describe('Suite de teste da API Heroes', function() {
    this.beforeAll(async () => {
        app = await api
    });

    it('listas /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));

    });

    it('Listar /herois -  deve retornar somente 10 registros', async () => {
        const TAMANHO_LIMITE = 10;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE);
    });

    it('Listar /herois - deve filtrar um item', async () => {
        const TAMANHO_LIMITE = 10;
        const NOME = 'Mulher Maravilha';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}&nome=${NOME}`
        });
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 200);
        assert.deepEqual(dados[0].nome, NOME);
    });

    it('Listar /herois - deve retornar um erro no limit', async () => {
        const TAMANHO_LIMITE = 'aaaa';
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const dados = JSON.parse(result.payload);
        console.log('dados', dados)
        const statusCode = result.statusCode;
        assert.deepEqual(statusCode, 400);
        assert.deepEqual(dados.message, `child "limit" fails because ["limit" must be a number]`);
    });
})