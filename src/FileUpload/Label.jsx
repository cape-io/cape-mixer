import React, { PropTypes } from 'react'

const style = {
  fontWeight: 'bold',
  marginRight: '0.5rem',
}

function Label({ text }) {
  return <span style={style}>{text}</span>
}
Label.propTypes = {
  text: PropTypes.string.isRequired,
}
export default Label
