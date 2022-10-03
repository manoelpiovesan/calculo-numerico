import funcoes from "./funcoes.js"
const funcao = new funcoes

document.querySelector('#btn-limpar').addEventListener('click', e=>{
    Limpar();
})

document.querySelector('#btn-naocentrada').addEventListener('click', ()=>{NaoCentrada()})

function Limpar(){
    
    document.querySelector('#h').value = ''
    document.querySelector('#x0').value = ''
    if(myChart != undefined){myChart.destroy();}
}

// mostrar funcao escolhida
document.querySelector('#funcao-escolhida').addEventListener('change', e=>{
    funcao.stringFunction(document.querySelector('#funcao-escolhida').value)
})


function plotarGrafico(coordsFx, coordsFunction, coordsFxMaisH, coordsFxMenosH){

    if(myChart == undefined){myChart.destroy();} // apagando grafico antigo
    
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


function NaoCentrada(){

    var h, x0, rEstrela

    h = parseFloat(document.querySelector('#h').value)
    x0 = parseFloat(document.querySelector('#x0').value)

    rEstrela = (-(3/(2*h))*funcao.f(x0) + (2/h)*funcao.f(x0+h) - (1/(2*h))* funcao.f(x0 + (2*h)))

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
    var coordsFxMenosH = [{x: (x0 + h), y: funcao.f(x0+h)}]
    // var coordsFr = [{x: r , y: funcao.f(r)}] // colocar referencia dps

    plotarGrafico(coordsFx, coordsFunction , coordsFxMaisH, coordsFxMenosH)
    
    

}

