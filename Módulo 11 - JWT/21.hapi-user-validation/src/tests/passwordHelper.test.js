const assert = require('assert');
const PasswordHelper = require('../helpers/passwordHelper');
const SENHA  = 'Fabio@12121244';
const HASH = '$2b$04$Ne0qF0XSBP75LxT2tarN4.e21RmnIGOqTT3IZOlcMH.1nnXCbPXSO';

describe('UserHelper teste suite', function() {
    
    it('Deve gerar um hash a partir de uma senha', async() => {
        const result = await PasswordHelper.hashPassword(SENHA);
        // console.log('result', result)
        assert.ok(result.length > 10);
    });

    it('Validar se o hash corresponde a senha', async() => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH);
        assert.ok(result);
    });

});