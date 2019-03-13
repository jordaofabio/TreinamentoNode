const { obterPessoas } = require('./service');

Array.prototype.meuReduce = function(callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0];
    for (let index = 0; index <= this.length -1; index ++) {
        valorFinal = callback(valorFinal, this[index], this);
    }
    return valorFinal;
}

async function main() {
    try {
        const { results } = await obterPessoas(`a`);

        // 1º exemplo
        // const pesos = results.map(item => parseInt(item.height));
        // console.log('Pesos',pesos)
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // }, 0);
        // console.log('Total',total)


        // 2º exemplo
        // const minhaLista = [
        //     ['Fabio','Jordão'],
        //     ['NodeBR','Nerdzão']
        // ];

        // const listaReduzida = minhaLista.meuReduce((anterior, proximo) => {
        //     return anterior.concat(proximo);
        // }, []).join(', ');

        // console.log('Lista reduzida', listaReduzida);

        // Teste
        const minhaLista = [
            ['Fabio','Jordão'],
            ['NodeBR','Nerdzão']
        ];

        const listaReduzida = minhaLista.reduce((anterior, proximo) => {
            return anterior.concat(proximo);
        }, []).join(', ');

        console.log('Lista reduzida', listaReduzida);

    }
    catch(erro) {
        console.error('Deu ruim', erro);
    }
}

main();