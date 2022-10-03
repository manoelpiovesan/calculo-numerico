import funcoes from "./funcoes.js"
const funcao = new funcoes
var myChart

// funcao limpar
document.querySelector('#btn-limpar').addEventListener('click', e=>{
    Limpar();
})

function Limpar(){
    document.querySelector('#x0-menos-h').value = ''
    document.querySelector('#fx0-mais-h').value = ''
    document.querySelector('#x0-mais-h').value = ''
    document.querySelector('#fx0-menos-h').value = ''
    document.querySelector('#r-estrela').textContent = ''
    document.querySelector('#x0-display').textContent = ''
    document.querySelector('#h-display').textContent = ''
    document.querySelector('#x0-mais-h-display').textContent = ''
    document.querySelector('#x0-menos-h-display').textContent = ''
    document.querySelector('#fx0-mais-h-display').textContent = ''
    document.querySelector('#fx0-menos-h-display').textContent = ''
    if(myChart != undefined){myChart.destroy();}
}


// switch de modo dados ou função
document.querySelector('#switch-funcao-dados').addEventListener('change',e=>{
    
    
    if(document.querySelector('#switch-funcao-dados').checked){

        document.querySelector('#usar-funcao').setAttribute('hidden', true)
        document.querySelector('#usar-dados').removeAttribute('hidden')

    }else{

        document.querySelector('#usar-dados').setAttribute('hidden', true)
        document.querySelector('#usar-funcao').removeAttribute('hidden')

    }
})

// mostrar funcao escolhida
document.querySelector('#funcao-escolhida').addEventListener('change', e=>{
    funcao.stringFunction(document.querySelector('#funcao-escolhida').value)
})

// achar x0 e h
document.querySelector('#table-dados').addEventListener('change', e=>{
    if(document.querySelector('#x0-menos-h').value != '' && document.querySelector('#x0-mais-h').value != ''){
        findXzeroAndH(document.querySelector('#x0-mais-h').value, document.querySelector('#x0-menos-h').value)
    }
})


// funcao para achar o Fx0 e o H da entrada com dados
function findXzeroAndH(x0MaisH, x0MenosH){
    var x0, h
    
    x0 = (parseFloat(x0MenosH) + parseFloat(x0MaisH)) / 2
    h = parseFloat(x0MaisH - x0)

    document.querySelector('#x0-display').textContent = x0.toFixed(3)
    document.querySelector('#h-display').textContent = h.toFixed(4)

    return {h: h, x0: x0}

}


// escolhendo metodo dependendo do switch
document.querySelector('#btn-centrada').addEventListener('click', e=>{
    if(document.querySelector('#switch-funcao-dados').checked){
        CentradaDados()
    }else{
        CentradaComFuncao()
    }
})

// metodo para entrada de dados
function CentradaDados(){
    var r, rEstrela, fx0MaisH, fx0MenosH, h, x0MenosH, x0MaisH
    
    x0MaisH = parseFloat(document.querySelector('#x0-mais-h').value)
    x0MenosH = parseFloat(document.querySelector('#x0-menos-h').value)
    
    fx0MaisH = parseFloat(document.querySelector('#fx0-mais-h').value)
    fx0MenosH = parseFloat(document.querySelector('#fx0-menos-h').value)

    h = findXzeroAndH(x0MaisH,x0MenosH).h

    rEstrela = (fx0MaisH - fx0MenosH) / (2 * h)

    console.log(rEstrela)

    document.querySelector('#r-estrela').textContent = rEstrela.toFixed(7)

    var coordsFx = [{x: findXzeroAndH(x0MaisH,x0MenosH).x0, y: rEstrela}]
    // var coordsFr = [{x: r , y: funcao.f(r)}] // colocar referencia dps
    var coordsFxMaisH = [{x: x0MaisH, y: fx0MaisH}]
    var coordsFxMenosH = [{x: x0MenosH, y: fx0MenosH}]

    plotarGrafico(coordsFx, '' , coordsFxMaisH, coordsFxMenosH)


}

// altera display f(x0-h) f(x0+h)
document.querySelector('#usar-funcao').addEventListener('change', e=>{
    var h, x0

    if(document.querySelector('#h').value != '' && document.querySelector('#x0').value != ''){
        h = parseFloat(document.querySelector('#h').value)
        x0 = parseFloat(document.querySelector('#x0').value)

        document.querySelector('#x0-mais-h-display').textContent = parseFloat(x0 + h)
        document.querySelector('#x0-menos-h-display').textContent = parseFloat(x0 - h)

        if(document.querySelector('#funcao-escolhida') != undefined){
            document.querySelector('#fx0-mais-h-display').textContent = (funcao.f(parseFloat(x0 + h)))
            document.querySelector('#fx0-menos-h-display').textContent = (funcao.f(parseFloat(x0 - h)))
        }
    }

})

// metodo para entrada de função
function CentradaComFuncao(){

    var h, x0, rEstrela

    h = parseFloat(document.querySelector('#h').value)
    x0 = parseFloat(document.querySelector('#x0').value)

    rEstrela = (funcao.f(x0 + h) - funcao.f(x0 - h))/(2*h)

    document.querySelector('#r-estrela').textContent = rEstrela.toFixed(7)


    // gerando pontos do grafico da funcao ------------------------------------------------
    var x1g = parseFloat(document.querySelector("#grafico-x1").value)
    var x0g = parseFloat(document.querySelector("#grafico-x0").value)
    var inc = parseFloat(document.querySelector("#grafico-inc").value)

    var qtdPontos = parseInt((x1g-x0g) / inc)

    document.querySelector('#grafico-qtd-pontos').textContent = parseInt(qtdPontos)

    var coordsFunction = []
    
    for(var i = 0; i < qtdPontos; i++){

        coordsFunction.push(
            {x:x0g , y: funcao.f(x0g)}
            )

        x0g = x0g + inc
    }
    //--------------------------------------------------------------------

    var coordsFx = [{x: x0, y: rEstrela}]
    var coordsFxMaisH = [{x: (x0 + h), y: funcao.f(x0+h)}]
    var coordsFxMenosH = [{x: (x0-h), y: funcao.f(x0-h)}]
    // var coordsFr = [{x: r , y: funcao.f(r)}] // colocar referencia dps


    plotarGrafico(coordsFx, coordsFunction , coordsFxMaisH, coordsFxMenosH)

}

function plotarGrafico(coordsFx, coordsFunction, coordsFxMaisH, coordsFxMenosH){

    if(myChart != undefined){myChart.destroy();} // apagando grafico antigo
    
    myChart = new Chart("myChart", {
        type: "scatter",
        data: {
            datasets: [{
                pointRadius: 4,
                label: 'Dados',
                pointBackgroundColor: '#dc3545',
                data: coordsFx
            },{
                pointRadius: 6,
                label: 'Referência',
                pointBackgroundColor: 'blue',
                data: ``
            },{
                pointRadius: 3,
                label: 'fx0MaisH',
                pointBackgroundColor: '#f1fd0d',
                data: coordsFxMaisH
            },
            {
                pointRadius: 3,
                label: 'fx0MenosH',
                pointBackgroundColor: '#0dfd25',
                data: coordsFxMenosH
            },
            {
                pointRadius: 1,
                label: 'funcao',
                pointBackgroundColor: 'grey',
                data: coordsFunction
            }

        ]
        },
        options: {
            legend: {
                display: false
            }
        }
      });    
}