const assert = require('assert');
const api = require('../api');
const Context = require('./../db/strategies/base/contextStrategy');
const Postgres = require('./../db/strategies/postgres/postgres');
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema');

let app = {};
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
            'eyJ1c2VybmFtZSI6ImZhYmlvIiwiaWQiOjEsImlhdCI6MTU1NzY3NDc1N30.' +
            'Q-YdrMpbYeYARtLkXRF925_IGcVRi0dDpiqMSF5d66I';

const USER = {
    username: 'fabio',
    password: '123'
}

const USER_NAO_AUTORIZADO = {
    username: 'fabio',
    password: '12##345'
}

const USER_DB = {
    username: USER.username.toLocaleLowerCase(),
    password: '$2b$04$sGdq3kjV9dInyc7NapTfvOQSIhQDPwo.QjyNr6kgHIXVl2riYRczC'
}

describe('Auth teste suite', function() {
    this.beforeAll(async () => {
        app = await api;

        const connectionPostgres = await Postgres.connect();
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema);

        const postgres = new Context(new Postgres(connectionPostgres, model));

        postgres.update(null, USER_DB, true);
    });

    it('Deve obter um token', async() => {

        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        });
// console.log('payload', result.payload);
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    });

    it('Deve retornar não autorizado ao tentar obter um login errado', async() => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER_NAO_AUTORIZADO
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepEqual(statusCode, 401);
        assert.deepEqual(dados.error, 'Unauthorized');
    });
});