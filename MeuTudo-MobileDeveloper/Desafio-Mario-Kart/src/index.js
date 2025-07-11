const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const jogadores = [
    {
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0,
    },
    {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 4,
        PONTOS: 0,
    },
    {
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0,
    },
    {
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
    {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0,
    },
    {
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0,
    },
]

function clonePlayer(player) {
    return { ...player, PONTOS: 0 }
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
        return character1
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} Venceu a corrida! 🏆`)
        return character2
    } else {
        console.log("A corrida terminou em empate!")
        return Math.random() < 0.5 ? character1 : character2
    }
}

async function tournament(selecPlayers) {
    let players = selecPlayers.map(clonePlayer)
    let allPlayers = [...players]

    while (players.length > 1) {
        let winners = []
        for (let i = 0; i < players.length; i += 2) {
            const player1 = players[i]
            const player2 = players[i + 1]
            console.log(`\n🚦 Corrida emtre ${player1.NOME} vs ${player2.NOME}`);
            await playRaceEngine(player1, player2)
            const winner = await declareWinner(player1, player2)
            winners.push(winner)
        }
        players = winners
    }
    console.log(`\n 🏁🏁🏁 Campeão do Torneio: ${players[0].NOME}`)

    return allPlayers
}

function choosePlayers() {
    console.log("🏎 Jogadores disponíveis: ")
    jogadores.forEach((j, i) => console.log(`${i + 1}. ${j.NOME}`))

    readline.question("\nDigite os números dos 4 competidores separados por vígula (ex: 1,3,4,5) ", async (resposta) => {
        const index = resposta.split(',').map(n => parseInt(n.trim()) - 1)
        if (index.length !== 4 || index.some(i => isNaN(i) || i < 0 || i >= jogadores.length)) {
            console.log("❌ Jogador inválido. Tente novamente.")
            readline.close()
            return
        }
        const selected = index.map(i => jogadores[i])
        const finalResults = await tournament(selected)
        console.log("\n Classificação Final:")
        finalResults.sort((a, b) => b.PONTOS - a.PONTOS).forEach(j =>
            console.log(`${j.NOME}: ${j.PONTOS} ponto(s)`)
        )
        readline.close()
    })
}
choosePlayers();