import React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'jumpstate'

class ShowScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }
  componentDidMount () {
    Actions.loadGist(this.props.params.id).then(() => {
      this.setState({isLoading: false})
    })
  }
  render () {
    const {gist} = this.props
    return (
      <div>
        {!this.state.isLoading && <div>
          <h2>{gist.description ? gist.description : ' - '}</h2>
          <img src={gist.owner && gist.owner.avatar_url ? gist.owner.avatar_url : 'https://assets-cdn.github.com/images/gravatars/gravatar-user-420.png'} />
        </div>}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    gist: state.gist.currentGist
  }
}

export default connect(mapStateToProps)(ShowScreen)
