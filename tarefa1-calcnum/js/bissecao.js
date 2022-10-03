var myChart

import funcoes from'./funcoes.js'
const funcao = new funcoes



// event listeners -------------------------------------------------
    // acionando função de aproximar
document.querySelector('#btn-limpar').addEventListener('click', e=>{
    Limpar();
})
document.querySelector('#btn-bissecao').addEventListener('click', e=>{
    Bissecao();
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
        

    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 2){
        document.querySelector('#funcao-display').textContent = 'F(x) = 2x - cos(2x)'
        
    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 3){
        document.querySelector('#funcao-display').textContent = 'F(x) = x² - cos(x)'
        
    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 4){
        document.querySelector('#funcao-display').textContent = 'F(x) = x + 1 - senh(x)'
       
    }else if(parseInt(document.querySelector('#funcao-escolhida').value) == 5){
        document.querySelector('#funcao-display').textContent = 'F(x)= cos(2x) -x² -16'
        
    }

})
// configuração do grafico da funcao
document.querySelector('.config-grafico').addEventListener('change', e=>{
    Bissecao()
})


// função DRP
function Drp(r,rEstrela){
    return Math.abs((r - rEstrela)/rEstrela)*100
}

// função de limpar os campos da interface
function Limpar(){

    document.querySelector('#intervalo-a').value = ''
    document.querySelector('#intervalo-b').value = ''
    document.querySelector('#precisao').value = ''
    document.querySelector('#r-estrela').value = ''
    document.querySelector('#interacoes').value = ''
    document.querySelector('#r').value = ''
    document.querySelector('#aviso').setAttribute('hidden', true) // escondendo aviso 
    document.querySelector('#funcao-display').textContent = ''
    document.querySelector("#console").innerHTML = ``

    if(myChart != undefined){myChart.destroy();}

}

// função de calcular a aproximação
function Bissecao(){

    //console inicio
    document.querySelector("#console").innerHTML = ``
    document.querySelector("#console").innerHTML += `> Iniciando método... <br>`


    
    // a-> inicio do intervalo / b-> fim do intervalo / e-> precisão / int-> número de interações / r-> referencia 
    var a, b, x0, e, int = 0, r; 

    // lendo os valores da interface.
    a = parseFloat(document.querySelector('#intervalo-a').value)
    b = parseFloat(document.querySelector('#intervalo-b').value)
    e = parseFloat(document.querySelector('#precisao').value)


    // verificando se existem raízes no intervalo (teorema de bolzano).
    if((funcao.f(a)* funcao.f(b))<0){

        // console
        document.querySelector("#console").innerHTML += `> Verificando que ${funcao.f(a)} * ${funcao.f(b)} é < 0: <span class='text-success'>verdadeiro</span> <br>`

        // escondendo aviso de raízes não encontradas
        document.querySelector('#aviso').setAttribute('hidden', true) // escondendo aviso 

        // calculando o chute inicial.
        x0 = (a+b)/2; 

        // console
        document.querySelector("#console").innerHTML += `> Novo x0: ${x0} <br>`

        // verificando se f(x0) está maior que o erro desejado.
        while(Math.abs(funcao.f(x0))>e){

            //console
            document.querySelector("#console").innerHTML += `> f(${x0}) = ${Math.abs(funcao.f(x0).toFixed(8))} > ${e}: <span class='text-danger'>Critério de parada não atendido</span> <br>`
            document.querySelector("#console").innerHTML += `> Continuando para próxima iteração... <br>`
            document.querySelector("#console").innerHTML += `> ------- Iteração nº ${int + 1} ------- <br>`
            

            // verificando se a raiz está entre a e x0 com o teorema de bolzano.
            if(funcao.f(a)*funcao.f(x0)<0){

                // console
                document.querySelector("#console").innerHTML += `> Verificando se a raiz está entre A e X0: <span class='text-success'>verdadeiro</span> <br>`
                
                // caso esteja entre a e x0, b assume o valor de x0.
                b = x0 

                // console
                document.querySelector("#console").innerHTML += `> B assume valor de x0 -> Novo intervalo: [${a};${b}]<br>`

            }else{
                // console
                document.querySelector("#console").innerHTML += `> Verificando se a raiz está entre A e X0: <span class='text-danger'>falso</span> <br>`
                
                // caso contrário, o 'a' assume o valor de x0.
                a=x0 

                // console
                document.querySelector("#console").innerHTML += `> A assume valor de x0 -> Novo intervalo: [${a};${b}]<br>`
            }


            // cálculo do novo x0, diminuindo o intervalo.
            x0 = (a+b)/2; 

            // console
            document.querySelector("#console").innerHTML += `> Novo x0: ${x0} <br>`

            // contando o número de interações feitas.
            int +=1; 
        }

        // console
        document.querySelector("#console").innerHTML += `> Verificando critério de parada (${x0}) = ${Math.abs(funcao.f(x0).toFixed(8))} > ${e}: <span class='text-success'>Critério de parada satisfeito.</span> <br>`
        document.querySelector("#console").innerHTML += `> Raiz encontrada: <strong>${x0}</strong> <br>`

        // calculando o drp se a referencia estiver marcada
        if(document.querySelector("#referencia-checkbox").checked){

            r = parseFloat(document.querySelector('#r').value)
            document.querySelector('#drp').innerHTML = Drp(r, x0).toFixed(3) 

            // coordenadas da referência
            var coordsFr = [
                {x: r, y: funcao.f(r)},
            ]

        }else{
            document.querySelector('#drp').innerHTML = "<span class='text-danger'> Sem referência</span>"
        }


        // mostrando os resultados na interface
        document.querySelector('#r-estrela').innerHTML= x0 
        document.querySelector('#interacoes').innerHTML = int 
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

        // passando as coordenadas dos pontos para plotar no gráfico.
        var coordsFx = [
            {x: x0, y: funcao.f(x0)},
        ]
        
        // montando o grafico com Chart.js
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
    

    }else{

        console.log('Não há raízes neste intervalo.') // avisando que não há raízes no intervalo.
        document.querySelector('#aviso').removeAttribute('hidden') // aviso na interface
    
    }

    

}