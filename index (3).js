import {Component} from 'react'

class Feedback extends Component {
  state = {
    select: null,
  }

  onClick = params => {
    this.setState({select: params})
  }

  render() {
    const {select} = this.state
    const {resources} = this.props
    const {emojis, loveEmojiUrl} = resources
    console.log(select)

    return (
      <>
        <div>
          {select === null ? (
            <>
              <div>
                <h1>
                  How satisfied are you with our customer support performance?
                </h1>
              </div>
              <ul>
                {emojis.map(e => (
                  <Item
                    key={e.id}
                    name={e.name}
                    onClick={() => this.onClick(e.name)}
                    url={e.imageUrl}
                  />
                ))}
              </ul>
            </>
          ) : (
            <div>
              <img src={loveEmojiUrl} alt="love emoji" />
              <h1>Thank You</h1>
              <p>
                We will use your feedback to improve our customer support
                performance.
              </p>
            </div>
          )}
        </div>
      </>
    )
  }
}

const Item = props => {
  const {name, onClick, url} = props

  return (
    <li>
      <div>
        <img src={url} onClick={onClick} alt="name" />
        <p>{name}</p>
      </div>
    </li>
  )
}

export default Feedback
