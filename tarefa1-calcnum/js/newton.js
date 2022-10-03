var myChart
import funcoes from'./funcoes.js'
const funcao = new funcoes


// eventListeners --------------------------------------------------------------------
    // ativando função de aproximar
document.querySelector('#btn-newton').addEventListener('click', e=>{
    newtonRaphson()
})

document.querySelector('#btn-limpar').addEventListener('click', e=>{
    Limpar()
})

    // ativando caixa de input de referencia
document.querySelector('#referencia-checkbox').addEventListener('change', e=>{
    
    if(document.querySelector('#referencia-checkbox').checked){
        document.querySelector('#referencia-div').removeAttribute('hidden')
    }else{
        document.querySelector('#referencia-div').setAttribute('hidden', true)
    }
})

    // mudando a função selecionada no display
document.querySelector('#funcao-escolhida').addEventListener('change', e=>{



    if(parseInt(document.querySelector('#funcao-escolhida').value) == 1){
        document.querySelector('#funcao-display').textContent = 'F(x) = x² - 2'
        document.querySelector('#derivada-display').textContent = "F'(x) = 2x"

        

    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 2){
        document.querySelector('#funcao-display').textContent = 'F(x) = 2x - cos(2x)'
        document.querySelector('#derivada-display').textContent = "F'(x) = 2 + 2sen(2x)"
        

    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 3){
        document.querySelector('#funcao-display').textContent = 'F(x) = x² - cos(x)'
        document.querySelector('#derivada-display').textContent = "F'(x) = 2x+ sen(x)"
        
    
    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 4){
        document.querySelector('#funcao-display').textContent = 'F(x) = x + 1 - senh(x)'
        document.querySelector('#derivada-display').textContent = "F'(x) = 1 - cosh(x)"
        
        
    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 5){
        document.querySelector('#funcao-display').textContent = 'F(x)= cos(2x) -x² -16'
        document.querySelector('#derivada-display').textContent = "F'(x) = -2sen(2x) - 2x"
       
    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 6){
        document.querySelector('#funcao-display').textContent = 'F(x)= x3 - cos(x)'
        document.querySelector('#derivada-display').textContent = "F'(x) = 3x2 + 2sen(x)"
       
    }

})
// configuração do grafico da funcao
document.querySelector('.config-grafico').addEventListener('change', e=>{
    newtonRaphson()
})


// funcao limpar
function Limpar(){
    
    document.querySelector('#x0').value = ''
    document.querySelector('#e').value = ''
    document.querySelector('#r-estrela').value = ''
    document.querySelector('#interacoes').value = ''
    document.querySelector('#r').value = ''
    document.querySelector('#funcao-display').textContent = ''
    document.querySelector('#derivada-display').textContent = ''
    document.querySelector("#console").innerHTML = ``
    
    if(myChart != undefined){myChart.destroy();}
}

// funcao Drp
function Drp(r,rEstrela){
    return Math.abs((r - rEstrela)/rEstrela)*100
}




// função de aproximação
function newtonRaphson(){

    // limpando console
    document.querySelector("#console").innerHTML = ``
    document.querySelector("#console").innerHTML += `> Iniciando método... <br>`

    var x0, e, cont=0;

    //lendo os inputs da interface
    x0 = document.querySelector('#x0').value
    e = document.querySelector('#e').value

    // testando se fx é maior que a precisão
    while(Math.abs(funcao.f(x0))>e){
        

        // console
        document.querySelector("#console").innerHTML += `> f(${x0}) = ${Math.abs(funcao.f(x0))} > ${e}: <span class='text-danger'>Critério de parada não atendido.</span> <br>`
        document.querySelector("#console").innerHTML += `> Continuando para próxima iteração... <br>`
        document.querySelector("#console").innerHTML += `> ------- Iteração nº ${cont + 1} ------- <br>`

        // novo chute x0
        x0 = (x0 - (funcao.f(x0)/funcao.dfdx(x0)))
        
        // console
        document.querySelector("#console").innerHTML += `> Novo valor de x0: ${x0} <br>`
        
        // contador de interações
        cont += 1
    }

    // console
    document.querySelector("#console").innerHTML += `> Verificando critério de parada (${x0}) = ${Math.abs(funcao.f(x0))} > ${e}: <span class='text-success'>Critério de parada satisfeito.</span> <br>`
    document.querySelector("#console").innerHTML += `> Raiz encontrada: <strong>${x0}</strong> <br>`


    // calculando drp se o usuário tiver marcado o checkbox
    if(document.querySelector('#referencia-checkbox').checked){
        var r = document.querySelector('#r').value
        document.querySelector('#drp').innerHTML = Drp(x0, r).toFixed(3)
        var coordsFr = [
            {x: r, y: funcao.f(r)},
        ]
    }else{
        document.querySelector('#drp').innerHTML = "<span class='text-danger'> Sem referência</span>"
    }

    // enviando para a interface os valores de x0 e de interações
    document.querySelector('#r-estrela').innerHTML = x0
    document.querySelector('#interacoes').innerHTML = cont


    // definindo as coordenadas da raiz encontrada p enviar para o gráfico
    var coordsFx = [
        {x: x0, y: funcao.f(x0)},
    ]

    // grafico da funcao
    var x1g = parseFloat(document.querySelector("#grafico-x1").value)
    var x0g = parseFloat(document.querySelector("#grafico-x0").value)
    var inc = parseFloat(document.querySelector("#grafico-inc").value)

    var qtdPontos = parseInt((x1g-x0g) / inc)

    document.querySelector('#grafico-qtd-pontos').textContent = parseInt(qtdPontos)

    var CoordsFunction = []
    
    for(var i = 0; i < qtdPontos; i++){

        CoordsFunction.push(
            {x:x0g , y: funcao.f(x0g)}
            )

        x0g = x0g + inc
        
    }


    if(myChart != undefined){myChart.destroy();}

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
                data: coordsFr
            },{
                pointRadius: 1,
                label: 'Função',
                pointBackgroundColor: 'grey',
                data: CoordsFunction
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


// // função de plotar no gráfico

// function plotarGrafico(x0,x1,inc){

//     var qtdPontos = parseFloat((x1-x0) / inc)

//     document.querySelector('#grafico-qtd-pontos').textContent = parseInt(qtdPontos)

//     var CoordsFunction = []
//     var xn = parseFloat(x0)
    
//     for(var i = 0; i < qtdPontos; i++){

//         CoordsFunction.push(
//             {x:xn , y: f(xn)}
//             )

//         xn = xn + parseFloat(inc)
        
//     }
    
//     if(myChart != undefined){myChart.destroy();}
//     myChart = new Chart("myChart", {
//         type: "scatter",
//         data: {
//             datasets: [{
//                 pointRadius: 2,
//                 label: 'Dados',
//                 pointBackgroundColor: 'grey',
//                 data: CoordsFunction
//             }
//         ]
//         },
//         options: {
//             legend: {
//                 display: false
//             }
//         }
//       });

      
// }

