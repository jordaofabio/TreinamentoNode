const service = require('./service');

Array.prototype.meuMap = function(calback) {
    const novoArrayMapeado = [];
    for(let indice = 0; indice <= this.length -1; indice++) {
        const resultado = calback(this[indice], indice);
        novoArrayMapeado.push(resultado);
    }
    return novoArrayMapeado;
}

async function main() {
    try {
        const results = await service.obterPessoas(`a`);
        //1º exemplo
        // const names = [];
        // results.results.forEach(item => {
        //     names.push(item.name);
        // });
        
        //2º exemplo
        //const names = results.results.map(pessoa => pessoa.name);

        //3º exemplo
        const names = results.results.meuMap(function(pessoa, indice) {
            return `[${indice}] ${pessoa.name}`
        })

        console.log('names', names);
    }
    catch(erro) {
        console.error('Deu ruim', erro);
    }
}

main()