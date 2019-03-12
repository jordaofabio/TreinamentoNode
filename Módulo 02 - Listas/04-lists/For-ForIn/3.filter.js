const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function(calback) {
        const lista = [];
        for(index in this) {
        const item = this[index];
        const result = calback(item, index, this);
        if(!result) continue;
        lista.push(item);
    }
    return lista;
}
async function main() {
    try {
        const { results } = await obterPessoas(`a`);

        //1º exemplo
        // const familiaLars = results.filter(function(item) {
        //     // por padrão deve retornar um boolean para 
        //     // informar se deve manter ou remover da lista
        //     // false = remove | true = mantem
        //     // não encontrou == -1
        //     // encontrou =  posição no array
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
        //     return result;
        // });


        //2º exemplo
        const familiaLars = results.meuFilter(
            (item, index, lista) => {
            console.log(`index: ${index}`, lista.length);
            return item.name.toLowerCase().indexOf(`lars`) !== -1
        });



        const names = familiaLars.map(pessoa => pessoa.name);

        console.log(names);
    }
    catch(erro) {
        console.error('Deu ruim', erro);
    }
}

main();