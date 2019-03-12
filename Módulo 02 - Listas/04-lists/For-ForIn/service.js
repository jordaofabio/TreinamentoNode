const axios = require('axios');
const UrlAPI = 'https://swapi.co/api/people';

async function obterPessoas(nome) {
    const url = `${UrlAPI}/?search=${nome}&format=json`;
    console.log('A url utilizada é:', url);

    const response = await axios.get(url);
    return response.data;
}

// //Testando
// obterPessoas('r2')
//     .then(function(resultado){
//         console.log('Resultado', resultado);
//     })
//     .catch(function(erro){
//         console.error('Deu ruim ', erro);
//     });

module.exports = {
    //obterPessoas: obterPessoas
    obterPessoas
}