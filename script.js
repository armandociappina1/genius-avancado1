let sequencia = [];
let jogadaJogador = [];
let indiceSequencia = 0;
let pontuacao = 0;
let velocidade = 1000;
const sons = {
    vermelho: new Audio('sons/vermelho.mp3'),
    verde: new Audio('sons/verde.mp3'),
    amarelo: new Audio('sons/amarelo.mp3'),
    azul: new Audio('sons/azul.mp3'),
};

function iniciarJogo() {
    sequencia = [escolherCorAleatoria()];
    jogadaJogador = [];
    indiceSequencia = 0;
    pontuacao = 0;
    velocidade = 1000;
    atualizarPontuacao();
    mostrarSequencia();
    document.getElementById("mensagem").textContent = "Memorize a sequência...";
}

function escolherCorAleatoria() {
    const cores = ["vermelho", "verde", "amarelo", "azul"];
    return cores[Math.floor(Math.random() * cores.length)];
}

function mostrarSequencia() {
    let i = 0;
    const intervalo = setInterval(() => {
        if (i < sequencia.length) {
            piscarCor(sequencia[i]);
            i++;
        } else {
            clearInterval(intervalo);
        }
    }, velocidade);
}

function piscarCor(cor) {
    const botao = document.getElementById(cor);
    sons[cor].play();
    botao.classList.add("ativo");
    setTimeout(() => {
        botao.classList.remove("ativo");
    }, 300);
}

function clicarCor(cor) {
    jogadaJogador.push(cor);
    piscarCor(cor);

    if (jogadaJogador[indiceSequencia] !== sequencia[indiceSequencia]) {
        document.getElementById("mensagem").textContent = "Você perdeu!";
        salvarRecorde();
        return;
    }

    indiceSequencia++;
    if (indiceSequencia === sequencia.length) {
        pontuacao++;
        atualizarPontuacao();
        setTimeout(() => {
            proximaRodada();
        }, 1000);
    }
}

function proximaRodada() {
    if (velocidade > 300) velocidade -= 50;
    sequencia.push(escolherCorAleatoria());
    jogadaJogador = [];
    indiceSequencia = 0;
    mostrarSequencia();
}

function atualizarPontuacao() {
    document.getElementById("pontuacao").textContent = "Pontuação: " + pontuacao;
    const recorde = localStorage.getItem("recorde") || 0;
    document.getElementById("recorde").textContent = "Recorde: " + recorde;
}

function salvarRecorde() {
    const recorde = localStorage.getItem("recorde") || 0;
    if (pontuacao > recorde) {
        localStorage.setItem("recorde", pontuacao);
    }
    atualizarPontuacao();
}
