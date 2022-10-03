export default class funcoes{
    // função
    f(x){
        var fx, funcaoEscolhida = parseInt(document.querySelector('#funcao-escolhida').value)

        switch(funcaoEscolhida){
            case 1:
                fx = parseFloat(Math.pow(x,2) - 2)
                break
            case 2:
                fx = parseFloat((2*x) - Math.cos(2*x))
                break
            case 3:
                fx = parseFloat(Math.pow(x,2) - Math.cos(x))
                break
            case 4:
                fx = parseFloat( x + 1 - Math.sinh(x))
                break
            case 5:
                fx = parseFloat(Math.cos(2*x) - Math.pow(x,2) - 16)
                break
            case 6:
                fx = parseFloat(Math.pow(x,3) - Math.cos(2*x))
                break
            
             // >>>>>>>>>>>>>> colocar função aqui! <<<<<<<<<<<<
        }
        return fx
    }
    
    // derivada
    dfdx(x){
        var dfdx, funcaoEscolhida = parseInt(document.querySelector('#funcao-escolhida').value)

        switch(funcaoEscolhida){
            case 1:
                dfdx = parseFloat(2 * x)
                break
            case 2:
                dfdx = parseFloat(2 + (2 * Math.sin(2*x))) 
                break
            case 3:
                dfdx = parseFloat((2*x) + Math.sin(x))
                break
            case 4:
                dfdx = parseFloat( 1 - Math.cosh(x))
                break
            case 5:
                dfdx = parseFloat( -2 * Math.sin(2*x) - 2*x)
                break
            case 6:
                dfdx = parseFloat(3* Math.pow(x,2) + 2*Math.sin(2*x))
                break
             // >>>>>>>>>>>>>> colocar a derivada da função aqui! <<<<<<<<<<<<
        }

       
        return dfdx
    }

    // mostrar a função no display
    stringFunction(id){
        switch(parseInt(id)){
            case 1:
                document.querySelector('#funcao-display').textContent = 'F(x) = x² - 2'
                // document.querySelector('#derivada-display').textContent = "F'(x) = 2x"
                break
            case 2:
                document.querySelector('#funcao-display').textContent = 'F(x) = 2x - cos(2x)'
                // document.querySelector('#derivada-display').textContent = "F'(x) = 2 + 2sen(2x)"
                break
            case 3:
                document.querySelector('#funcao-display').textContent = 'F(x) = x² - cos(x)'
                // document.querySelector('#derivada-display').textContent = "F'(x) = 2x+ sen(x)"
                break
            case 4:
                document.querySelector('#funcao-display').textContent = 'F(x) = x + 1 - senh(x)'
                // document.querySelector('#derivada-display').textContent = "F'(x) = 1 - cosh(x)"
                break
            case 5:
                document.querySelector('#funcao-display').textContent = 'F(x)= cos(2x) -x² -16'
                // document.querySelector('#derivada-display').textContent = "F'(x) = -2sen(2x) - 2x"
                break
            case 6:
                document.querySelector('#funcao-display').textContent = 'F(x)= x3 - cos(x)'
                // document.querySelector('#derivada-display').textContent = "F'(x) = 3x2 + 2sen(x)"
                break
        } 
    }
}

