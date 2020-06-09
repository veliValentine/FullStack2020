import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    <div>
      {notification === null ? <></> :
        <div style={style}>
          {notification}
        </div>
      }
    </div>
  )
}

export default connect(
  (state) => ({ notification: state.notification })
)(Notification)