const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = { 
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = { 
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}


describe('Suite de manipulação de Heróis', function() {

    before(async () => {
        const [lista] = await database.listar(null);
        if(!lista) await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    });

    it('Deve pesquisar um herói, usando aquirvos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [resultado] = await database.listar(expected.id);

        deepEqual(resultado, expected);
    })

    it('Deve cadastrar um heroi, usando arquivos', async () => {
        const expeted = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await database.listar(expeted.id);

        deepEqual(actual, expeted);
    });

    it.only('Deve atualiza um heroi, pelo id', async () => {
        

        const novoDado = {
            "nome": "Batman",
            "poder": "Dinheiro"
        };

        const expected = { 
            ...DEFAULT_ITEM_ATUALIZAR,
            ...novoDado
        };

        console.log('expected', expected);

        const resultado = await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id,novoDado);

        deepEqual(resultado, expected);
    })

})