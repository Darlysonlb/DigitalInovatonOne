
// módulo do Node.js que fornece interação.
const readline = require('readline');

// é um método que cria instância de leitura/escrita.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Solicita o nome e a quantidade de experiência (XP) do herói
rl.question('Digite o nome do herói: ', (nome) => {
    rl.question('Digite a quantidade de experiência (XP 1.000 a 10.000) do herói: ', (xp) => {
        xp = parseInt(xp);

        // Utiliza estruturas de decisão para determinar o nível do herói
        let nivel;

        if (xp < 1000) {
            nivel = 'Ferro';
        } else if (xp >= 1001 && xp <= 2000) {
            nivel = 'Bronze';
        } else if (xp >= 2001 && xp <= 5000) {
            nivel = 'Prata';
        } else if (xp >= 6001 && xp <= 7000) {
            nivel = 'Ouro';
        } else if (xp >= 7001 && xp <= 8000) {
            nivel = 'Platina';
        } else if (xp >= 8001 && xp <= 9000) {
            nivel = 'Ascendente';
        } else if (xp >= 9001 && xp <= 10000) {
            nivel = 'Imortal';
        } else {
            nivel = 'Radiante';
        }

        // Exibe a mensagem com o nome e o nível do herói
        console.log(`O Herói de nome ${nome} está no nível de ${nivel}`);

        rl.close();
    });
});
