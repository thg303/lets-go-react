import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Actions } from 'jumpstate'
import { Helmet } from 'react-helmet'

class ListScreen extends React.Component {
  componentDidMount () {
    Actions.listGists()
  }
  render () {
    return (<div>
      <Helmet>
        <title>Gist List</title>
      </Helmet>
      {this.props.gists.map((item, i) => (
        <div key={i}>
          <Link to={`/gist/${item.id}`}>{item.id}</Link>
          <p>created at <italic>{item.created_at}</italic></p>
        </div>
      ))}
    </div>)
  }
}

ListScreen.fetchData = () => {
  return Actions.listGists()
}

function mapStateToProps (state) {
  return {
    gists: state.gist.list
  }
}

export default connect(mapStateToProps)(ListScreen)
