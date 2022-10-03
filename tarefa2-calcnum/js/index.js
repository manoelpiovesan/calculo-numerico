
function valores(){
    document.querySelector('#x0').value = 1.0
    document.querySelector('#x1').value = 1.3
    document.querySelector('#x2').value = 1.6
    document.querySelector('#x3').value = 1.9
    document.querySelector('#x4').value = 2.2
    
    document.querySelector('#fx0').value = 0.7651977
    document.querySelector('#fx1').value = 0.6200860
    document.querySelector('#fx2').value = 0.4554022
    document.querySelector('#fx3').value = 0.2818186
    document.querySelector('#fx4').value = 0.1103626

    document.querySelector('#x').value = 1.5
    document.querySelector('#r').value = 0.51182771
}

document.querySelector('#referencia-checkbox').addEventListener('change', e=>{
    
    if(document.querySelector('#referencia-checkbox').checked){
        document.querySelector('#referencia-div').removeAttribute('hidden')
    }else{
        document.querySelector('#referencia-div').setAttribute('hidden', true)
    }
})

document.querySelector("#pre-dados").addEventListener('change', e=>{
    if(document.querySelector('#pre-dados').checked){
        valores()
    }else{
        Limpar()
    }
    
})
function Limpar(){
    document.querySelector('#x0').value = ''
    document.querySelector('#x1').value = ''
    document.querySelector('#x2').value = ''
    document.querySelector('#x3').value = ''
    document.querySelector('#x4').value = ''
    
    document.querySelector('#fx0').value = ''
    document.querySelector('#fx1').value = ''
    document.querySelector('#fx2').value = ''
    document.querySelector('#fx3').value = ''
    document.querySelector('#fx4').value = ''

    document.querySelector('#x').value = ''
    document.querySelector('#r').value = ''

    document.querySelector('#l0').innerText = ''
    document.querySelector('#l1').innerText = ''
    document.querySelector('#l2').innerText = ''
    document.querySelector('#l3').innerText = ''
    document.querySelector('#l4').innerText = ''
    document.querySelector('#r-estrela').innerText = ''
    document.querySelector('#p4x').innerText = ''
    document.querySelector('#drp-resultado').innerText = ''

    
    
    
}

function Lagrange(){

    // x e referencia
    var x = (document.getElementById('x').value)
    var r = (document.getElementById('r').value)

    // x
    var x0 = (document.getElementById('x0').value)
    var x1 = (document.getElementById('x1').value)
    var x2 = (document.getElementById('x2').value)
    var x3 = (document.getElementById('x3').value)
    var x4 = (document.getElementById('x4').value)
    

    // f(x)
    var fx0 = (document.getElementById('fx0').value)
    var fx1 = (document.getElementById('fx1').value)
    var fx2 = (document.getElementById('fx2').value)
    var fx3 = (document.getElementById('fx3').value)
    var fx4 = (document.getElementById('fx4').value)
    

    // L's
    var l0 = (((x-x1)*(x-x2)*(x-x3)*(x-x4))/((x0-x1)*(x0-x2)*(x0-x3)*(x0-x4))).toFixed(7)
    var l1 = (((x-x0)*(x-x2)*(x-x3)*(x-x4))/((x1-x0)*(x1-x2)*(x1-x3)*(x1-x4))).toFixed(7)
    var l2 = (((x-x0)*(x-x1)*(x-x3)*(x-x4))/((x2-x0)*(x2-x1)*(x2-x3)*(x2-x4))).toFixed(7)
    var l3 = (((x-x0)*(x-x1)*(x-x2)*(x-x4))/((x3-x0)*(x3-x1)*(x3-x2)*(x3-x4))).toFixed(7)
    var l4 = (((x-x0)*(x-x1)*(x-x2)*(x-x3))/((x4-x0)*(x4-x1)*(x4-x2)*(x4-x3))).toFixed(7)

    // enviando os Ls pra interface
    document.getElementById('l0').innerText = l0
    document.getElementById('l1').innerText = l1
    document.getElementById('l2').innerText = l2
    document.getElementById('l3').innerText = l3
    document.getElementById('l4').innerText = l4

    //mostrando o polinomio montado
    document.getElementById('p4x').innerHTML = '('+l0 +'•'+fx0+')'+'+ ('+l1+"•"+fx1+') '+'+ ('+l2+"•"+fx2+') '+'+ ('+l3+"•"+fx3+') '+'+ ('+l4+"•"+fx4+') '
    
    // polinomio de lagrange
    var r_estrela = ((l0 * fx0) + (l1 * fx1) + (l2 * fx2) + (l3 * fx3) + (l4 * fx4)).toFixed(7)

    // calculando o drp
    if(document.querySelector('#referencia-checkbox').checked){
        var drp = Math.abs(((r - r_estrela)/r_estrela)*100).toFixed(5)
        var valorR = [{x: x, y: r}]
        
    }else{
        drp = 'Sem referência'
    }
    

    document.getElementById('r-estrela').innerText = r_estrela
    document.getElementById('drp-resultado').innerText = drp

    // criando gráfico


    var valoresXY = [
        {x: x0, y: fx0},
        {x: x1, y: fx1},
        {x: x2, y: fx2},
        {x: x3, y: fx3},
        {x: x4, y: fx4}
        
    ]

    var valoresXR = [
        {x: x, y: r_estrela}
    ]
    

    var myChart = new Chart("myChart", {
        type: "scatter",
        data: {
            labels: ['x0', 'x1', 'x2', 'x3', 'x4'],
            datasets: [{
                pointRadius: 4,
                label: 'Dados',
                pointBackgroundColor: 'grey',
                data: valoresXY
            },{
                pointRadius: 6,
                label: 'R*',
                pointBackgroundColor: ['#dc3545'],
                data: valoresXR
            },{
                pointRadius: 7,
                label: 'R',
                pointBackgroundColor: ['#0d6efd'],
                data: valorR
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

// gráfico

