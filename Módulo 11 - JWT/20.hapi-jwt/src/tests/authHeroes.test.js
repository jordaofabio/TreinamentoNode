const assert = require('assert');
const api = require('../api');

let app = {};
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
            'eyJ1c2VybmFtZSI6ImZhYmlvIiwiaWQiOjEsImlhdCI6MTU1NzI5NTI5MX0.' +
            'qvx1EvC3yx9LVBvQKJyPLqDNLkcdyShnTzgR_7zeuKY';

describe.only('Auth teste suite', function() {
    this.beforeAll(async () => {
        app = await api;
    });

    it.only('Deve obter um token', async() => {
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