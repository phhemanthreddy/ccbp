import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const ListItem = props => {
  const {id, w, u, p, t, dlt} = props
  return (
    <li>
      <p>{w[0].toUpperCase()}</p>
      <p>{w}</p>
      <p>{u}</p>
      {t ? (
        <p>{p}</p>
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
        />
      )}
      <button type="button" onClick={() => dlt(id)} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    passwordsList: [],
    searchInput: '',
    isTicked: false,
  }

  submit = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newItem = {
      id: uuidv4(),
      website: formData.get('website'),
      username: formData.get('username'),
      password: formData.get('password'),
    }
    this.setState(p => ({passwordsList: [...p.passwordsList, newItem]}))
    e.target.reset()
  }

  search = e => {
    this.setState({searchInput: e.target.value})
  }

  checkbox = () => {
    this.setState(p => ({isTicked: !p.isTicked}))
  }

  deleteBtn = id => {
    this.setState(p => ({
      passwordsList: p.passwordsList.filter(e => e.id !== id),
    }))
  }

  render() {
    const {passwordsList, searchInput, isTicked} = this.state

    const finalList = passwordsList.filter(e =>
      e.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div>
        <img
          alt="app logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        />
        <div>
          <div>
            <h1>Add New Password</h1>
            <form onSubmit={this.submit}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input type="text" name="website" placeholder="Enter Website" />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input type="text" name="username" placeholder="Enter Username" />
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              <button type="submit">Add</button>
            </form>
          </div>
          <img
            alt="password manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          />
        </div>
        <div>
          <h1>Your Passwords</h1>
          <p>{finalList.length}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            alt="search"
          />
          <input type="search" value={searchInput} onChange={this.search} />
          <hr />
          <input type="checkbox" id="pass" onClick={this.checkbox} />
          <label htmlFor="pass">Show passwords</label>
          {finalList.length ? (
            <ul>
              {finalList.map(e => (
                <ListItem
                  t={isTicked}
                  key={e.id}
                  id={e.id}
                  w={e.website}
                  u={e.username}
                  p={e.password}
                  dlt={this.deleteBtn}
                />
              ))}
            </ul>
          ) : (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default App
