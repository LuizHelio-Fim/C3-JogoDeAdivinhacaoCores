// Array com todas as 148 cores nomeadas do HTML/CSS
var coresHTML = [
    'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue',
    'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson',
    'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen',
    'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet',
    'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro',
    'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed',
    'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan',
    'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey',
    'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid',
    'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin',
    'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen',
    'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple',
    'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver',
    'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle',
    'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'
];

var cores = []
var corCerta = ''
var tentativas = 3
var jogoIniciado = false

/* Função para gerar uma cor aleatória baseado nas cores ja existentes no HTML */
function gerarCorAleatoria() {
    var indiceAleatorio = Math.floor(Math.random() * coresHTML.length);
    return coresHTML[indiceAleatorio];
}

/* Função para iniciar o jogo */
function iniciarJogo() {
    cores = []
    tentativas = 3
    jogoIniciado = true
    
    // Gera 10 cores aleatórias sem repetição
    while (cores.length < 10) {
        var cor = gerarCorAleatoria()
        if (cores.indexOf(cor) === -1) {
            cores.push(cor)
        }
    }
    
    // Escolhe a cor correta
    corCerta = cores[Math.floor(Math.random() * cores.length)]
    
    // Remove o botão "Começar" e exibe as cores
    var botaoComecar = document.querySelector('.button')
    botaoComecar.style.display = 'none'
    
    var paragrafo = document.querySelector('p')
    paragrafo.textContent = 'Tentativas restantes: ' + tentativas
    
    exibirCores()
}

/* Função para exibir as cores na tela */
function exibirCores() {
    var container = document.querySelector('.container')
    
    // Remove cores anteriores se existirem
    var coresExistentes = document.querySelector('.cores-container')
    if (coresExistentes) {
        coresExistentes.remove()
    }
    
    // Cria container para as cores
    var coresContainer = document.createElement('div')
    coresContainer.className = 'cores-container'
    
    // Cria um botão para cada cor
    cores.forEach(function(cor) {
        var botaoCor = document.createElement('button')
        botaoCor.className = 'cor-botao'
        botaoCor.textContent = cor
        botaoCor.style.backgroundColor = cor
        botaoCor.onclick = function() {
            verificarCor(cor)
        }
        coresContainer.appendChild(botaoCor)
    })
    
    container.appendChild(coresContainer)
}

/* Função para verificar se a cor clicada está correta */
function verificarCor(corClicada) {
    if (!jogoIniciado) return
    
    if (corClicada === corCerta) {
        // Acertou!
        document.body.style.backgroundColor = corCerta
        var paragrafo = document.querySelector('p')
        paragrafo.textContent = '🎉 Parabéns! Você acertou a cor ' + corCerta + '!'
        paragrafo.style.color = '#28a745'
        desabilitarBotoes()
        mostrarBotaoReiniciar()
    } else {
        // Errou
        tentativas--
        var paragrafo = document.querySelector('p')
        
        if (tentativas > 0) {
            paragrafo.textContent = '❌ Errou! Tentativas restantes: ' + tentativas
            paragrafo.style.color = '#dc3545'
        } else {
            paragrafo.textContent = '😢 Você perdeu! A cor correta era ' + corCerta
            paragrafo.style.color = '#dc3545'
            desabilitarBotoes()
            mostrarBotaoReiniciar()
        }
    }
}

/* Função para desabilitar todos os botões de cor */
function desabilitarBotoes() {
    jogoIniciado = false
    var botoesCores = document.querySelectorAll('.cor-botao')
    botoesCores.forEach(function(botao) {
        botao.disabled = true
        botao.style.cursor = 'not-allowed'
        botao.style.opacity = '0.6'
    })
}

/* Função para mostrar botão de reiniciar */
function mostrarBotaoReiniciar() {
    var container = document.querySelector('.container')
    var botaoReiniciar = document.createElement('button')
    botaoReiniciar.className = 'button'
    botaoReiniciar.textContent = 'Jogar Novamente'
    botaoReiniciar.onclick = function() {
        location.reload()
    }
    container.appendChild(botaoReiniciar)
}

// Adiciona evento ao botão "Começar"
window.onload = function() {
    var botaoComecar = document.querySelector('.button')
    botaoComecar.onclick = iniciarJogo
}