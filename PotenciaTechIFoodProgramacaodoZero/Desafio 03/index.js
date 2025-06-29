// módulo do Node.js que fornece interação.
const readline = require('readline');

// é um método que cria instância de leitura/escrita.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// classe com construtor  que inicializa as propriedades nome, idade e tipo
class Heroi{
    constructor(nome, idade, tipo){
        this.nome = nome
        this.idade = idade
        this.tipo = tipo
    }
    // método que que gerar mensagens de acordo com o tipo do Herói
    atacar(){
        const tipoDeAtaque = {
            guerreiro: "sua espada",
            mago: "seus poderes mágicos",
            monge: "sua habilidades de artes marciais",
            ninja: "suas hurikens",
        }
        const ataque = tipoDeAtaque[this.tipo] || "ataque padrão"
        return `${this.nome}, o ${this.tipo}, atacou usando ${ataque}.`
    }
}

rl.question('Digite o nome do Herói: ', (nome) => {
    rl.question('Digite a idade do Herói: ', (idade) =>{
        rl.question('Digite o tipo do Herói: ', (tipo) =>{
            const heroi = new Heroi(nome, idade, tipo)
            const mensagemArtaque = heroi.atacar()
            console.log(mensagemArtaque)
            rl.close()

        })
    })
})