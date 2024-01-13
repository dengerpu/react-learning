import React from 'react'

class Demo extends React.Component {
  state = {
    email: ''
  };

  render() {
      return <div>
          <input type="text" value={this.state.email} onChange={(ev) => {
            this.setState({
              email: ev.target.value.trim()
            })
            console.log(this.state.email)
          }}/>
      </div>;
  }
}

export default Demo