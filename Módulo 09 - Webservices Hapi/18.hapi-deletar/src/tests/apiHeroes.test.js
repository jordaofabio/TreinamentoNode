const assert = require('assert');
const api = require('../api');

let app = {};
const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolim Colorado',
    poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
    nome: 'Flash',
    poder: 'Velocidade'
}
let MOCK_ID = '';

describe.only('Suite de teste da API Heroes', function() {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        });
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;
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

    it('Listar GET  - /herois - deve filtrar um item', async () => {

    });

    it('Cadastrar POST - /herois', async() => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: MOCK_HEROI_INICIAL
        });

        const statusCode = result.statusCode;
        const { message, _id } =  JSON.parse(result.payload);
        assert.ok(statusCode === 200);
        assert.notStrictEqual(_id, undefined);
        assert.deepEqual(message, 'Herói cadastrado com sucesso!');

    });

    it('Atualizar PATCH - /herois/:id', async() => {
        const _id = MOCK_ID;

        const dadoAtualizar = {
            poder: 'Super Velocidade'
        };

        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(dadoAtualizar)
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Herói atualizado com sucesso!')
    });

    it.only('Deletar DELETE  - /herois/:id', async() => {
        const _id = MOCK_ID;
        const result = await app.inject({
            method: 'DELETE',
            url: `/herois/${_id}`
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepEqual(dados.message, 'Herói deletado com sucesso!')

    });
})