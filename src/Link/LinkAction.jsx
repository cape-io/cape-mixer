import React from 'react'
import PropTypes from 'prop-types'
// import css from 'cape-style'

// Action button.
// @TODO: Need a way to pass down some style to overwrite defaults.
// 'ba br1 p1 inlineBlock fs1 textReset bgTrans'

function LinkAction({ action, children, style }) {
  return (
    <button onClick={action} style={style}>
      {children}
    </button>
  )
}

LinkAction.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.objectOf(PropTypes.string),
}
LinkAction.defaultProps = {
  style: null,
}
export default LinkAction
