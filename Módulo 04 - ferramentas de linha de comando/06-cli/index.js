const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    Commander.version('v1')
    .option('-n, --nome [value]', 'Nome do Herói')
    .option('-p, --poder [value]', 'Poder do Herói' )
    .option('-i, --id [value]', 'Id do Herói' )

    .option('-c, --cadastrar', 'Cadastrar Herói' )
    .option('-l, --listar', 'Listar Heróis' )
    .option('-r, --remover', 'Remover Herói' )
    .option('-a, --atualizar', 'Atualizar Herói' )
    .parse(process.argv)

    const heroi = new Heroi(Commander);
    try {
        if (Commander.cadastrar) {
            const resultado = await Database.cadastrar(heroi);
            if (!resultado) {
                console.error('O Herói não foi dastrado!');
                return;
            } else {
                console.log('Herói cadastrado com sucesso!')
            }
        }

        if (Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }

        if (Commander.remover) {
            const resultado = await Database.remover(heroi.id);
            if (!resultado) {
                console.error('Não foi possível remover o Herói.');
                return;
            }
            console.log('Herói removido com sucesso!');
        }

        if (Commander.atualizar) {
            const idAtualizar = parseInt(heroi.id);
            const dados = JSON.stringify(heroi);
            const dadosAtualizar = JSON.parse(dados); // nesse momento ele limpa as chaves desnecessárias, no caso a chave que não teve modificação ou está vazia.
            const resultado = await Database.atualizar(idAtualizar, dadosAtualizar);
            if (!resultado) {
                console.error('Não foi possível atualizar o Herói.');
                return;
            }
            console.log('Herói atualizado com sucesso!');
        }

        if (Commander.organizar) {
            const resultado = await Database.organizarArray();
            if (!resultado) {
                console.error('Não foi possível organizar a lista.');
                return;
            }
            console.log('Lista organizada com sucesso!');
        }

    } catch (erro) {
        console.error('Deu ruim!', erro)
    }
}

main();