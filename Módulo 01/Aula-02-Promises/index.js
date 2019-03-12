/*
0 - Obter o usuário
1 - Obter o número de telefone de usuário a partir do id
2 - Obter o endereço de usuário a partir do id
3 - Converteu o modo de callback, das duas primeiras functions, para Promise
4 - Importou a biblioteca util para usar o Promisefy para converter o callbak em Promise (usado para a function do endereço)
*/

const util = require('util');

const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario(){
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            }),1000});
           // return reject(new Error('Deu ruim geral'));
    });
  
}

function obterTelefone(usuarioId) {
    return new Promise(function resolveTelefone(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '999900000',
                ddd: '11'
            })
        }, 2000);
    })
    
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua dos bobos',
            numero: 0
        })
    }, 2000);
}

const usuarioPromise = obterUsuario();

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id,
                    },
                    telefone: `(${result.ddd}) ${result.telefone}`
                }
        })
    })
    .then(function(result) {
        return obterEnderecoAsync(result.usuario.id)
        .then(function(res) {
            return {
                nome: result.usuario.nome, 
                telefone: result.telefone, 
                endereco: `${res.rua}, ${res.numero}`
            }
        })
    })
    .then(function(result){
        console.log('Restultado', result);
    })
    .catch(function(error){
        console.log('Deu ruim: ', error);
    });




// function resolverUsuario(erro, usuario){
//     if(erro){
//         console.log('Deu RUIM em Usuario: ', error);
//         return;
//     }
//     obterTelefone
//     console.log('usuario', usuario);
// }

// obterUsuario(resolverUsuario);
// const telefone = obterTelefone(usuario.id);



// console.log('telefone ', telefone);