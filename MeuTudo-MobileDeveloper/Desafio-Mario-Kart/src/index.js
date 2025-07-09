const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
}
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
}
const player3 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
}
const player4 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}
const player5 = {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
}
const player6 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break;
        case random < 0.66:
            result = "Curva"
            break;
        default:
            result = "Confronto"
    }
    return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}
async function playRaceEngine(character1, character2) {
    for (let roud = 1; roud <= 5; roud++) {
        console.log(`🏁 Rodada ${roud}`)
        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        //teste de habilidade
        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if (block === "Reta") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE

            await logRollResult(character1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE)
        }
        if (block === "Curva") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

            await logRollResult(character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE)
        }
        if (block === "Confronto") {
            let powerResult1 = diceResult1 + character1.PODER
            let powerResult2 = diceResult2 + character2.PODER

            console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊`)

            await logRollResult(character1.NOME, "Poder", diceResult1, character1.PODER)
            await logRollResult(character2.NOME, "Poder", diceResult2, character2.PODER)

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} Venceu o confronto! ${character2.NOME} Perdeu um ponto 🐢`)
                character2.PONTOS--
            }
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} Venceu o confronto! ${character1.NOME} Perdeu um ponto 🐢`)
                character1.PONTOS--
            }
            console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto perdido" : "")

        }
        //verficando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`)
            character1.PONTOS++
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++
        }
        console.log("--------------------------------------------------")
    }
}
async function declareWinner(character1, character2) {
    console.log("Resuldado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} Venceu a corrida! 🏆`)
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} Venceu a corrida! 🏆`)
    } else {
        console.log("A corrida terminou em empate!")
    }
}
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );
    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()