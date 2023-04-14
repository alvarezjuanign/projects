// Operands
const currentOperand = document.querySelector('.current-operand')
const previousOperand = document.querySelector('.previous-operand')

// Buttons
const deleteBtn = document.querySelector('[delete]')
const allClear = document.querySelector('[all-clear]')
const equal = document.querySelector('[equals]')
const operator = document.querySelectorAll('[operator]')
const numbers = document.querySelectorAll('[number]')


class calculator{
    constructor(currentOperandText,previousOperandText){
        this.currentOperandText = currentOperandText
        this.previousOperandText = previousOperandText

        this.allClear()
}

    allClear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    clear(){
        this.currentOperand = this.currentOperand.slice(0,-1)
    }

    appendChild(digit){
        // reject input multiple decimal points
        if (digit ==='.' && this.currentOperand.includes('.')) return

        // not allow multiple zeros
        if (digit === '0' && this.currentOperand === '0') return

        if(this.currentOperand === '0' && digit !== '0' && digit != '.'){
            this.currentOperand = ' '
        }

        // if digit is . and there are no prior digits, add a zero
        if(digit === '.' && this.currentOperand === '') this.currentOperand += '0'

        this.currentOperand += digit
    }

    selectOperation(operation){
        if(this.currentOperand === '' && operation === '-'){
            this.appendChild(operation)
            return
        }

        if(operation && this.currentOperand === '') return

        if(this.previousOperand !== '') this.calculate()

        this.operation = operation
        this.previousOperand = `${this.currentOperand} ${operation}` 
        this.currentOperand = ''
    }

    calculate(){
        this.previousOperand = `${this.previousOperand} ${this.currentOperand}`

        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        switch(this.operation){
            case '/':
                this.currentOperand = prev / current
                break
            case '*':
                this.currentOperand = current * prev
                break
            case '+' :
                this.currentOperand = current + prev
                break
            case '-':
                this.currentOperand = prev - current
                break
            default:
                return
        }
        this.previousOperand = ''
    }

    displayUpdate(){
        this.currentOperandText.innerHTML = this.currentOperand
        this.previousOperandText.innerHTML = this.previousOperand
    }
}


const Calculator = new calculator(currentOperand,previousOperand) 

// Event Listeners buttons
numbers.forEach(button =>{
    button.addEventListener('click', ()=>{
        Calculator.appendChild(button.innerHTML)
        Calculator.displayUpdate()
    })
})

operator.forEach(button =>{
    button.addEventListener('click', ()=>{
        Calculator.selectOperation(button.innerHTML)
        Calculator.displayUpdate()
    })
})

deleteBtn.addEventListener('click', ()=>{
    Calculator.clear()
    Calculator.displayUpdate()
})

allClear.addEventListener('click', ()=>{
    Calculator.allClear()
    Calculator.displayUpdate()
})

equal.addEventListener('click',()=>{
    Calculator.calculate()
    Calculator.displayUpdate()
})



// Event listeners keys
window.addEventListener('keyup', (e)=>{
    switch(e.key){
        case '1': case '2': case '3': case '4': case '5': case '6': case '7':
        case '8': case '9': case '.': case '0':
            Calculator.appendChild(e.key)
            Calculator.displayUpdate()
            break

        case '/': case '+': case '-': case '*':
            Calculator.selectOperation(e.key)
            Calculator.displayUpdate()
            break

        case 'Backspace': case 'Delete':
            Calculator.clear()
            Calculator.displayUpdate()
            break

        case 'Escape':
            Calculator.allClear()
            Calculator.displayUpdate()
            break

        case 'Enter': case '=':
            Calculator.calculate()
            Calculator.displayUpdate()
            break

        default:
            break
    }
})