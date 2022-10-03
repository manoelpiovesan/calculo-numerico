import Funcoes from './funcoesObj.js'

// adicionando option-select dinamicamente
Funcoes.forEach(
    (funcao, id)=>{
        document.querySelector('#funcao-escolhida').add(new Option(funcao.string, id), undefined)
    }
)

document.querySelector('#aproximar-btn').addEventListener('click', ()=>{DerivadaSegunda()})

function DerivadaSegunda(){

    const FunctionId = document.querySelector('#funcao-escolhida').value

    const x0 = parseFloat(document.querySelector('#x0').value)
    const h = parseFloat(document.querySelector('#h').value)

    const x0MenosH = x0 - h
    const x0MaisH = x0 + h

    console.log(Funcoes[FunctionId].f(x0MaisH))
    console.log(Funcoes[FunctionId].f(x0MenosH))

    var rEstrela = ((Funcoes[FunctionId].f(x0MenosH) + Funcoes[FunctionId].f(x0MaisH) - (2 * (Funcoes[FunctionId].f(x0)))) / (Math.pow(h, 2)))

    
    // se existir o dfdx4 no obj da funcao
    if(Funcoes[FunctionId].dfdx4 != undefined){
        
        if(Funcoes[FunctionId].dfdx4(x0MaisH) > Funcoes[FunctionId].dfdx4(x0MenosH)){
            rEstrela = rEstrela + ((Math.pow(h,2) / 24) * Funcoes[FunctionId].dfdx4(x0MaisH))

            document.querySelector('#erro-trunc').textContent = 'Calculado: ' + ((Math.pow(h,2) / 24) * Funcoes[FunctionId].dfdx4(x0MaisH))

        }else{
            rEstrela = rEstrela + ((Math.pow(h,2) / 24) * Funcoes[FunctionId].dfdx4(x0MenosH))

            document.querySelector('#erro-trunc').textContent = 'Calculado: ' +  ((Math.pow(h,2) / 24) * Funcoes[FunctionId].dfdx4(x0MenosH))
        }

        
        
    }else{
        document.querySelector('#erro-trunc').textContent = 'Não calculado.'
    }
    
    document.querySelector('#resultado').textContent = rEstrela

    
}



