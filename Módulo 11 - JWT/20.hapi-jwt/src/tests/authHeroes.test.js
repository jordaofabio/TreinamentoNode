const assert = require('assert');
const api = require('../api');

let app = {};
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
            'eyJ1c2VybmFtZSI6ImZhYmlvIiwiaWQiOjEsImlhdCI6MTU1NzY3NDc1N30.' +
            'Q-YdrMpbYeYARtLkXRF925_IGcVRi0dDpiqMSF5d66I';

describe('Auth teste suite', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it('Deve obter um token', async() => {

        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'fabio',
                password: '123'
            }
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.token.length > 10)
    });
});