const DOM = document.querySelector('.calc');
const DOMdisplay = DOM.querySelector('.display');
const DOMbuttons = DOM.querySelectorAll('.btn[data-b]');




// uzdedam paspaudima ant visu mygtuku
for ( let i=0; i<DOMbuttons.length; i++ ) {
    const btn = DOMbuttons[i];
    btn.addEventListener('click', () => {
        const value = btn.dataset.b;

        switch (value) {
            case '=':
                calculate();
                break;
            case 'ac':
                clearDisplay();
                break;
            case 'c':
                removeSymbol();
                break;
            case 'sign':
                console.log('keiciu einamuoju metu rasomo skaiciaus zenkla...');
                break;
        
            default:
                DOMdisplay.textContent += value;
                break;
        }

    })
}

function clearDisplay () {
    return DOMdisplay.textContent = '';
}

function removeSymbol () {
    return DOMdisplay.textContent = DOMdisplay.textContent.slice(0, -1);
}

function calculate () {
    let rez = 0;
    const ops = ['+', '-', '/', '*', '%'];
    const t = DOMdisplay.textContent;
    let numbers = [];
    let operation;

    for ( let i=0; i<ops.length; i++ ) {
        const op = ops[i];
        const data = t.split(op);
        if ( data.length > 1 ) {
            numbers = [...data];
            operation = op;
            break;
        }
    }

    switch (operation) {
        case '+':
            rez = mathCombo( sum, numbers );
            break;
        case '-':
            rez = mathCombo( minus, numbers );
            break;
        case '*':
            rez = mathCombo( multiply, numbers );
            break;
        case '/':
            rez = mathCombo( divide, numbers );
            break;
        case '%':
            rez = mathCombo( mod, numbers );
            break;
    
        default:
            break;
    }


    return DOMdisplay.textContent = rez;
}

function mathCombo ( operation, data ) {
    let total = parseFloat(data[0]);

    for ( let i=1; i<data.length; i++ ) {
        total = operation(total, parseFloat(data[i]));
    }

    return total;
}

function sum( a, b ) {
    return a + b;
}

function minus( a, b ) {
    return a - b;
}

function divide( a, b ) {
    return a / b;
}

function multiply( a, b ) {
    return a * b;
}

function mod( a, b ) {
    return a % b;
}



/* TESTAI:

- vienazenkliu skaiciu operacijos
2+3
2-3

- daugiazenkliu skaiciu operacijos
22+33
22222+33333

- skaiciai su kableliu
2.3+5.1

- daugiau nei viena paprasciausia matematine operacija
2+3+4
8-7+6

- operaciju prioritetai
2*2
2*2+2
2+2*2
2*3-8/4

- neigiami skaiciai
-5+2
-5-2
-5 - -2
-5+-2



*/