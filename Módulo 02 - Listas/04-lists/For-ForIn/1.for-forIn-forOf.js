const service = require('./service');

async function main() {
    try {
        const result = await service.obterPessoas('a');
        const names = [];

        console.time('for');
        for (let i=0; i<= result.results.length - 1; i++){
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.log('Names: ', names)
        console.timeEnd('for');

        console.time('forIn');
        for (let i in result.results) {
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.log('Names: ', names)
        console.timeEnd('forIn');

        console.time('forOf');
        for (pessoa of result.results) {
            names.push(pessoa.name);
        }
        console.log('Names: ', names);
        console.timeEnd('forOf');

    }
    catch (erro) {
        console.error('Deu ruim', erro)
    }
}

main()