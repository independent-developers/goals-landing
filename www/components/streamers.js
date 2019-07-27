import React from 'react'
import 'isomorphic-unfetch'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      streamersList: []
    }
  }

  componentDidMount() {
    const userId = '1234'
    const url = `https://goals-its091yko.now.sh/api/users/${userId}/goals`
    const fetchStreamersList = async () => {
      try {
        const response = await fetch(url).then(r => r.json())
        this.setState({ streamersList: response })
      } catch (err) {
        console.error(`Could not fetch time from ${url}`)
      }
      this.timeout = setTimeout(fetchStreamersList, 1000)
    }

    this.timeout = setTimeout(fetchStreamersList, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render () {
    const { streamerName } = this.props
    const { streamersList } = this.state
    const StreamersList = ({ streamers }) => {
        const listItems = streamers.map((number) =>
          <li key={number.key}>
              <p>{number.key}</p>
              <p>{number.title}</p>
          </li>
        );
        return (
          <ul>{listItems}</ul>
        );
      }

    return (
      <div className="clock">
        Okay {streamerName}  let's see what is on the menu today !
        {<StreamersList streamers={streamersList} />}
      </div>
    ) 
  }
}
