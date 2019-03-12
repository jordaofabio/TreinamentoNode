const EventEmitter = require('events');

class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor();

const novoEnveto = 'usuario:click';
meuEmissor.on(novoEnveto, function(click){
    console.log('Um usuário clicou', click)
})

// meuEmissor.emit(novoEnveto, 'na barra de rolagem');
// meuEmissor.emit(novoEnveto, 'no ok');

// let count = 0;

// setInterval(function(){
//     meuEmissor.emit(novoEnveto, 'no ok' + (count++));
// }, 1000);

//-----------------------------------------------------------

const stdin = process.openStdin();
stdin.addListener('data', function(value){
    console.log('Você digitou: ', value.toString().trim());
});