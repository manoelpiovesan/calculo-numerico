const Funcoes = [
    {
        string: 'F(x) = x² - 2',
        f: x=>parseFloat(Math.pow(x,2) - 2),
        dfdx2: x=> 2,
        dfdx3: x=> 0,
        dfdx4: x=>0
    },
    {
        string: 'F(x) = 2x - cos(2x)',
        f: x=>parseFloat((2*x) - Math.cos(2*x)),
        dfdx2: x=> -4 * Math.cos(2*x),
        dfdx3: undefined,
        dfdx4: x=>parseFloat(16 * Math.cos(2*x)),
    },
    {
        string: 'F(x) = 2x - sen(2x)',
        f: x=>parseFloat((2*x) - Math.sin(2*x)),
        dfdx3: undefined,
        dfdx4: x=>parseFloat(16 * (- Math.cos(2*x))),
    },

]

export default Funcoes