import React from 'react'
import PropTypes from 'prop-types'
import css from 'cape-style'

// Action button.
// @TODO: Need a way to pass down some style to overwrite defaults.

function LinkAction({ action, children }) {
  return (
    <button onClick={action} style={css('ba br1 p1 inlineBlock fs1 textReset bgTrans')}>
      {children}
    </button>
  )
}

LinkAction.propTypes = {
  action: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
export default LinkAction
