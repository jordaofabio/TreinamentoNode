const assert = require('assert');
const MongoDb = require('../db/strategies/mongodb/mongodb');
const Context = require('../db/strategies/base/contextStrategy');
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchemas');

const MOCK_HEROI_CADASTRAR = { 
    nome: 'Batman',
    poder: 'Dinheiro'
};

const MOCK_HEROI_ATUALIZAR = { 
    nome: 'Gavião Negro',
    poder: 'Flexas'
};

let  MOCK_HEROI_ID = '';

let context = {};

describe('Mongodb Strategy', function() {
    this.timeout(Infinity);
    this.beforeAll(async function() {
        const connection = MongoDb.connect();
        context = new  Context(new MongoDb(connection, HeroiSchema));
        // await context.delete(); 

        const res = await context.create(MOCK_HEROI_CADASTRAR);
        MOCK_HEROI_ID = res._id;
    })
    it('Verificar conexão', async function() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const result = await context.isConnected()
        const expected = 'Conectado'

        assert.deepEqual(result, expected);
    });

    it('Cadastrar', async function() {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async function() {
        const [{ nome, poder }] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome});
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
    });

    it('Atualizar', async function () {
        const novoItem = {
            nome: 'Mulher Maravilha',
            poder: 'Laço'
        }
        const result = await context.update(MOCK_HEROI_ID, novoItem);

        const [itemAtualizado] = await context.read({_id : MOCK_HEROI_ID});
        assert.deepEqual(result.nModified, 1);
        assert.deepEqual(itemAtualizado.nome, novoItem.nome);
    });

    it('Remover por id', async function() {
        const [item] = await context.read({_id: MOCK_HEROI_ID});
        const result = await context.delete(MOCK_HEROI_ID);

        assert.deepEqual(result.deletedCount, 1)
    })

})