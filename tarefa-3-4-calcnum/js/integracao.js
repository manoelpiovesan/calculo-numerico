import Funcoes from './funcoesObj.js'

Funcoes.forEach(
    (funcao, id)=>{
        document.querySelector('#funcao-escolhida').add(new Option(funcao.string, id), undefined)
    }
)

document.querySelector('#aproximar-btn').addEventListener('click', ()=>{
    switch(parseInt(document.querySelector('#metodo-escolhido').value)){
        case 1:
            Simpson()
            break
        case 2:
            Trapezio()
            break
    }
    
})


// calculando o h automaticamente
document.querySelector('.form').addEventListener('change', ()=>{
    const x0 =  parseFloat(document.querySelector('#x0').value)
    const x1 =  parseFloat(document.querySelector('#x1').value)
    document.querySelector('#h').value = x1 - x0
})

function Simpson(){
    
    const Id = document.querySelector('#funcao-escolhida').value

    const x0 =  parseFloat(document.querySelector('#x0').value)
    const x1 =  parseFloat(document.querySelector('#x1').value)
    const h =  parseFloat(document.querySelector('#h').value)
    

    var rEstrela = (h/3)*(Funcoes[Id].f(x0) + (4 * Funcoes[Id].f((x0 + x1)/2)) + Funcoes[Id].f(x1))
    
    document.querySelector('#resultado').textContent = rEstrela

    if(Funcoes[Id].dfdx4 != undefined){
        if(Funcoes[Id].dfdx4(x0) > Funcoes[Id].dfdx4(x1)){
            rEstrela = rEstrela + ((Math.pow(h, 3) * Funcoes[Id].dfdx4(x0))/12)
            document.querySelector('#erro-trunc').textContent = ((Math.pow(h, 5)/90) * Funcoes[Id].dfdx4(x0))
            document.querySelector('#resultado-com-erro').textContent = rEstrela

        }else{
            rEstrela = rEstrela + ((Math.pow(h, 3) * Funcoes[Id].dfdx4(x1))/12)
            document.querySelector('#erro-trunc').textContent = ((Math.pow(h, 5)/90) * Funcoes[Id].dfdx4(x1))
            document.querySelector('#resultado-com-erro').textContent = rEstrela
        }
    }else{
        document.querySelector('#erro-trunc').textContent = 'Não calculado.'
        document.querySelector('#resultado-com-erro').textContent = 'Erro não calculado.'
    }

   


}

function Trapezio(){
    
    const Id = document.querySelector('#funcao-escolhida').value

    const x0 =  parseFloat(document.querySelector('#x0').value)
    const x1 =  parseFloat(document.querySelector('#x1').value)
    const h =  parseFloat(document.querySelector('#h').value)
    

    var rEstrela = (h * ((Funcoes[Id].f(x0) + Funcoes[Id].f(x1))/2))
    
    document.querySelector('#resultado').textContent = rEstrela

    if(Funcoes[Id].dfdx2 != undefined){
        if(Funcoes[Id].dfdx2(x0) > Funcoes[Id].dfdx2(x1)){
            rEstrela = rEstrela + ((Math.pow(h, 3) * Funcoes[Id].dfdx2(x0))/12)
            document.querySelector('#erro-trunc').textContent = (Math.pow(h, 3) * Funcoes[Id].dfdx2(x0))
            document.querySelector('#resultado-com-erro').textContent = rEstrela

        }else{
            rEstrela = rEstrela + ((Math.pow(h, 3) * Funcoes[Id].dfdx2(x1))/12)
            document.querySelector('#erro-trunc').textContent = (Math.pow(h, 3) * Funcoes[Id].dfdx2(x1))
            document.querySelector('#resultado-com-erro').textContent = rEstrela
        }
    }else{
        document.querySelector('#erro-trunc').textContent = 'Não calculado.'
        document.querySelector('#resultado-com-erro').textContent = 'Erro não calculado.'
    }

   


}