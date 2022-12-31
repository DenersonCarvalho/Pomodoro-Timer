let acao = document.getElementById('inputAcao')
let pausa = document.getElementById('inputPausa')
let sessoes = document.getElementById('inputSessao')
let segundos

var bell = new Audio("./_audio/bell.mp3")
var volta = new Audio("./_audio/volta.mp3")
var final = new Audio("./_audio/final.mp3")

var lofi = document.getElementById('lofi')
var play = document.getElementById('play')
var pause = document.getElementById('pause')

function pausar() {
    lofi.pause()
    play.style.setProperty('display', 'block', 'important')
    pause.style.setProperty('display', 'none', 'important')
}
function executar() {
    lofi.play()
    play.style.setProperty('display', 'none', 'important')
    pause.style.setProperty('display', 'block', 'important')
}
function iniciar() {
    if (acao.value == 0) {
        document.getElementById('erro-acao').innerHTML = "Adicione os minutos"
        acao.focus()
    } else if (pausa.value == 0) {
        document.getElementById('erro-pausa').innerHTML = "Adicione o nº de pausa"
        pausa.focus()
    } else if (sessoes.value == 0) {
        document.getElementById('erro-sessao').innerHTML = "Adicione o nº de sessões"
        sessoes.focus()
    } else {
        lofi.play()
        pause.style.setProperty('display', 'block', 'important')
        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))
        document.getElementById('config').style.setProperty('display', 'none', 'important')
        document.getElementById('timer').style.setProperty('display', 'block', 'important')
        momentoAcao()
    }
}

function momentoAcao() {
    let sessoes_valor = localStorage.getItem('sessoes')
    if (sessoes_valor != '1') {
        document.getElementById('titulo-secundario').innerHTML = sessoes_valor + ' sessões restantes'
    } else {
        document.getElementById('titulo-secundario').innerHTML = sessoes_valor + ' sessão restante'
    }
    let title = document.getElementById('titulo')
    title.innerHTML = 'Ação'
    title.style.fontWeight = 'bold'
    title.style.fontSize = '25pt'
    title.style.setProperty('color', '#28a745', 'important')
    min = Number(localStorage.getItem('acao'))
    min = min - 1
    segundos = 59
    document.getElementById('minutos').innerHTML = min
    document.getElementById('segundos').innerHTML = segundos
    var min_inteval = setInterval(minTimer, 60000)
    var seg_inteval = setInterval(segTimer, 1000)
    function minTimer() {
        min = min - 1
        document.getElementById('minutos').innerHTML = min
    }
    function segTimer() {
        segundos = segundos - 1
        document.getElementById('segundos').innerHTML = segundos
        if (segundos <= 0) {
            if (min <= 0) {
                clearInterval(min_inteval)
                clearInterval(seg_inteval)
                bell.play()
                momentoPausa()
            }
            segundos = 60
        }
    }
}
function momentoPausa() {
    let title = document.getElementById('titulo')
    title.innerHTML = 'Pausa'
    title.style.fontWeight = 'bold'
    title.style.fontSize = '25pt'
    title.style.setProperty('color', '#dc3545', 'important')
    min_pausa = Number(localStorage.getItem('pausa'))
    min_pausa = min_pausa - 1
    segundos = 59
    document.getElementById('minutos').innerHTML = min_pausa
    document.getElementById('segundos').innerHTML = segundos
    var min_inteval = setInterval(minPausa, 60000)
    var seg_inteval = setInterval(segPausa, 1000)
    function minPausa() {
        min_pausa = min_pausa - 1
        document.getElementById('minutos').innerHTML = min_pausa
    }
    function segPausa() {
        segundos = segundos - 1
        document.getElementById('segundos').innerHTML = segundos
        if (segundos <= 0) {
            if (min_pausa <= 0) {
                ses = Number(localStorage.getItem('sessoes'))
                ses = ses - 1
                localStorage.setItem('sessoes', String(ses))
                clearInterval(min_inteval)
                clearInterval(seg_inteval)
                if (ses <= 0) {
                    final.play()
                    localStorage.clear()
                    document.getElementById('config').style.setProperty('display', 'none', 'important')
                    document.getElementById('timer').style.setProperty('display', 'none', 'important')
                    document.getElementById('finalizacao').style.setProperty('display', 'block', 'important')
                } else {
                    volta.play()
                    momentoAcao()
                }
            }
            segundos = 60
        }
    }
}