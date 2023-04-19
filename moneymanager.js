
//......................................MoneyManager......................................
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  titleInput = e => {
    this.setState({title: e.target.value})
  }

  amountInput = e => {
    this.setState({amount: e.target.value})
  }

  onChange = e => {
    this.setState({type: e.target.value})
  }

  addBtn = e => {
    e.preventDefault()
    const {type, title, amount} = this.state

    const newTransactionItem = {
      id: uuidv4(),
      Title: title,
      Amount: Number(amount),
      Type: type,
    }

    this.setState(p => ({
      transactionList: [...p.transactionList, newTransactionItem],
    }))

    this.setState({title: '', amount: '', type: 'INCOME'})

    if (type === 'INCOME') {
      this.setState(p => ({
        income: p.income + Number(amount),
      }))
    } else {
      this.setState(p => ({
        expenses: p.expenses + Number(amount),
      }))
    }

    document.getElementById('mySelect').value = 'INCOME'
  }

  dltBtn = id => {
    const {transactionList} = this.state
    const deleteAmount = transactionList.find(e => e.id === id).Amount
    const deleteType = transactionList.find(e => e.id === id).Type
    if (deleteType === 'INCOME') {
      this.setState(p => ({income: p.income - deleteAmount}))
    } else {
      this.setState(p => ({expenses: p.expenses - deleteAmount}))
    }
    this.setState({transactionList: transactionList.filter(e => e.id !== id)})
  }

  render() {
    const {income, expenses, title, amount, transactionList} = this.state

    return (
      <div>
        <div>
          <h1>Hi Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails income={income} expenses={expenses} />
        <div>
          <h1>Add Transaction</h1>
          <form>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              value={title}
              placeholder="TITLE"
              onChange={this.titleInput}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              value={amount}
              placeholder="AMOUNT"
              onChange={this.amountInput}
            />
            <label htmlFor="type">TYPE</label>
            <select id="mySelect" onChange={this.onChange}>
              <option value="INCOME">Income</option>
              <option value="EXPENSES">Expenses</option>
            </select>
            <button type="submit" onClick={this.addBtn}>
              Add
            </button>
          </form>
        </div>
        <div>
          <h1>History</h1>
          <p>Title</p>
          <p>Amount</p>
          <p>Type</p>
          <ul>
            {transactionList.map(e => (
              <TransactionItem
                id={e.id}
                key={e.id}
                title={e.Title}
                amount={e.Amount}
                type={
                  transactionTypeOptions.find(f => f.optionId === e.Type)
                    .displayText
                }
                dlt={this.dltBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager

//....................................TransactionItem..........................................

const TransactionItem = props => {
  const {title, amount, type, dlt, id} = props

  return (
    <li>
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button onClick={() => dlt(id)} type="button" data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem

//..........................................MoneyDetails .......................................

const MoneyDetails = p => {
  const {income, expenses} = p
  const balance = income - expenses

  return (
    <>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <p>Your Balance</p>
        <p>Rs. </p>
        <p data-testid="balanceAmount">{balance}</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <p>Your Income</p>
        <p>Rs. </p>
        <p data-testid="incomeAmount">{income}</p>
      </div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <p>Your Expenses</p>
        <p>Rs. </p>
        <p data-testid="expensesAmount">{expenses}</p>
      </div>
    </>
  )
}

export default MoneyDetails
