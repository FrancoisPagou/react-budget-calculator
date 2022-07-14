import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from "uuid/dist/v4";

const initialExpenses = [
    {id: uuid(), charge: 'rent', amount: 1600},
    {id: uuid(), charge: 'car payment', amount: 400},
    {id: uuid(), charge: 'credit card bill', amount: 1200}
];

function App() {
    const [expenses, setExpenses] = useState(initialExpenses); 
    const [charge, setCharge] = useState('');
    const [amount, setAmount] = useState('');
    const [alert, setAlert] = useState({show: false});
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(0);

    const handleCharge = e => {
        setCharge(e.target.value);
    }

    const handleAmount = e => {
        setAmount(e.target.value);
    }

    const handleAlert = ({type, text}) => {
        setAlert({show: true, type, text});
        setTimeout(() => {
            setAlert({show: false});
        }, 3000); 
    }

    const clearAllItems = () => {
        setExpenses([]);
        handleAlert({type: 'danger', text: 'all item deleted'});
    }

    const handleDelete = (id) => {
        let tempExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(tempExpenses);
        handleAlert({type: 'danger', text: 'Item deleted'});
    }

    const handleEdit = (id) => {
        let expense = expenses.find(expense => expense.id === id);
        let {charge, amount} = expense;
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
        setId(id);
          
        console.log("expense : ", expense); 
        console.log("expenses : ", expenses); 
    }
    
    const handleSubmit = e => {
        e.preventDefault();

        if (charge !== '' && amount > 0) {
            if (edit) {
                let tempExpenses = expenses.map(expense => {
                    return expense.id === id ? {...expense, charge, amount} : expense;
                });
                setExpenses(tempExpenses);
                setEdit(false);
                handleAlert({type: 'success', text: 'Item edited '});
            } else {
                const singleExpense = {id: uuid(), charge, amount};
                setExpenses([...expenses, singleExpense]);
                handleAlert({type: 'success', text: 'Item added '});
            }
           
            setCharge('');
            setAmount('');
        } else {
            handleAlert({type: 'danger', text: `Charge can't be empty value and the amount value has to be bigger than 0`})
        }
    }

    return <>
        {alert.show && <Alert type={alert.type} text={alert.text}/>}
        
        <h1>Budget calculator</h1>
        <main className="App">
            <ExpenseForm 
                charge={charge} 
                amount={amount}
                handleAmount={handleAmount} 
                handleCharge={handleCharge} 
                handleSubmit={handleSubmit}
                edit={edit}
             />
            <ExpenseList 
                expenses={expenses} 
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                clearAllItems={clearAllItems}
            />
        </main>
        <h1>
            Total spending: 
            <span className="total">
                ${expenses.reduce((accumulator, current) => {
                    return accumulator += parseInt(current.amount);
                }, 0)}
            </span>
        </h1>
    </>;
}

// </>
export default App;
