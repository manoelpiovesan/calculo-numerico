export default class funcoes{
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
}