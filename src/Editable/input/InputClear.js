import radium from 'radium'
import React, { PropTypes } from 'react'
import Icon from '../../Icon'

const styles = {
  base: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 4,
    border: 'none',
    background: 'transparent',
    color: 'currentColor',
    height: 'auto',
    width: '1rem',
    textAlign: 'right',
    margin: 0,
    padding: 0,
    ':hover': {
      background: 'transparent',
      color: 'rgba(189,178,119,0.5)',
    },
    ':focus': {
      background: 'transparent',
      color: 'rgba(189,178,119,0.75)',
      boxShadow: 'none',
    },
    ':active': {
      background: 'rgba(189,178,119,0.25)',
      color: 'rgba(103,099,049,1)',
      boxShadow: 'none',
    },
  },
}

function InputClear({ style, ...props }) {
  return (
    <button {...props} type="button" style={[ styles.base, style ]}>
      <Icon symbol="times" />
    </button>
  )
}

InputClear.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
}
InputClear.defaultProps = {
  title: 'Clear input value',
}
export default radium(InputClear)
