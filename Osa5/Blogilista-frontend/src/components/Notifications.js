import React from 'react'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  if (!error) {
    return (
      <div className="success">
        {message}
      </div>)
  }
  console.error('MESSAGE');
  
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification