import React from 'react'
import PropTypes from 'prop-types'
import css from 'cape-style'
import LinkContent from './LinkContent'

// Action button.
// @TODO: Need a way to pass down some style to overwrite defaults.

function LinkAction({ action, ...rest }) {
  return (
    <button onClick={action} style={css('ba br1 p1 inlineBlock fs1 textReset bgTrans')}>
      <LinkContent {...rest} />
    </button>
  )
}

LinkAction.propTypes = {
  action: PropTypes.func.isRequired,
}
export default LinkAction
