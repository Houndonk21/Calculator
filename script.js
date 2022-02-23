class Calculator
{
    constructor(previous, current)
    {
        this.previous = previous;
        this.current = current;
        this.clear();
    }

    clear()
    {
        this.currop = '';
        this.prevop = '';
        this.operation = undefined;
    }

    delete()
    {
        this.currop =  this.currop.toString().slice(0, -1);
    }

    compute()
    {
        let result;
        const previousLet = parseFloat(this.prevop);
        const currentLet = parseFloat(this.currop);
        if (isNaN(previousLet) || isNaN(currentLet)) return;
        switch (this.operation)
        {
        case '+':
            result = previousLet + currentLet;
            break;
        case '-':
            result = previousLet - currentLet;
            break;
        case '*':
            result = previousLet * currentLet;
            break;
        case '/':
            if (previousLet === 0 && currentLet === 0)
            {
                alert("THIS OPERATION IS NOT LEGAL. PLEASE PRESS THE AC BUTTON FOR A CALL BACK IN TIME.");
                break;
            }
            result = previousLet / currentLet;
            break;
        default:
            return;
        }
        this.currop = result;
        this.operation = undefined;
        this.prevop = '';
    }

    chooseOperation(operation)
    {
        if (this.currop === '') return
        if (this.previous !== '')
        {
            this.compute
        }
        this.operation = operation;
        this.prevop = this.currop;
        this.currop = '';
    }

    appendNumber(number)
    {
        if (number === '.' && this.currop.includes('.')) return
        this.currop = this.currop.toString() + number.toString();
    }

    getDisplayNumber(number)
    {
        const stringN = number.toString();
        const integerN = parseFloat(stringN.split('.')[0]);
        const decimalN =  stringN.split('.')[1];
        let integerDisplay;
        if (isNaN(integerN))
        {
            integerDisplay = '';
        }
        else
        {
            integerDisplay = integerN.toLocaleString('en', {maximumFractionDigits: 0}) 
        }
        if (decimalN != null)
        {
            return `${integerDisplay}.${decimalN}`;
        }
        else
        {
            return integerDisplay;
        }
    }

    updateDisplay()
    {
        this.current.innerHTML = this.getDisplayNumber(this.currop);
        if (this.operation != null)
        {
            this.previous.innerHTML = `${this.getDisplayNumber(this.prevop)} ${this.operation}`;
        }
        else 
        {
            this.previous.innerHTML = '';
        }
        
    }
}
console.log("hello");
const del = document.querySelector("#delete");
const equals = document.querySelector("#equals");
const numberButtons = document.querySelectorAll('#number');
const operationButtons = document.querySelectorAll('#operationButton');
const allClearButton = document.querySelector('#all-clear');
const previous = document.querySelector("#previous-op");
const current = document.querySelector("#current-op");

const calculator = new Calculator(previous, current);

numberButtons.forEach(button => {
    button.addEventListener('click',  () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click',  () => {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    })
});

equals.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

del.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
