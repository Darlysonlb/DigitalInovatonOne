
// módulo do Node.js que fornece interação.
const readline = require('readline');

// é um método que cria instância de leitura/escrita.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// função que calcula saldo de Vitórias
function saldoVitoria (vitoria, derrota){
    let saldo = vitoria - derrota
    return saldo
}

//Solicita ao usuario o número de Vitórias e Derrotas
rl.question('Número de Vitórias: ', (vitoria) => {
    rl.question('Número de Derrotas: ', (derrota) => {             
        let vitoriasPositivas = saldoVitoria(parseInt(vitoria), parseInt(derrota));
        
        // Utiliza estruturas de decisão para determinar o nível do herói
        let nivel;

        if ( vitoriasPositivas < 10) {
            nivel = 'Ferro';
        } else if (vitoriasPositivas >= 11 && vitoriasPositivas <= 20) {
            nivel = 'Bronze';
        } else if (vitoriasPositivas >= 21 && vitoriasPositivas <= 50) {
            nivel = 'Prata';
        } else if (vitoriasPositivas >= 51 && vitoriasPositivas <= 80) {
            nivel = 'Ouro';
        } else if (vitoriasPositivas >= 81 && vitoriasPositivas <= 90) {
            nivel = 'Diamante';
        } else if (vitoriasPositivas >= 91 && vitoriasPositivas <= 100) {
            nivel = 'Lendário';
        } else {
            nivel = 'Imortal';
        }

        // Exibe a mensagem com o saldo de positivo de vitórias e o nivel
        console.log(`O Herói acumulou ${vitoriasPositivas} vitórias e alcançou o nível de ${nivel}`);

       rl.close();
    })
});