import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// A simple span that displays help text.
// Optional class added when help is related to an error.
function Help({ help, hasErrors, id, suggestion, onClick }) {
  const preTxt = 'Do you mean '
  const postTxt = '? '

  const className = classNames({
    'help-block': true,
    'validation-message': hasErrors,
  })

  return (
    <p className={className} id={`${id}-helpBlock`}>
      {suggestion &&
        <span>
          {preTxt}
          <button onClick={onClick}>
            {suggestion}
          </button>
          {postTxt}
        </span>
      }
      {help}
    </p>
  )
}

Help.propTypes = {
  help: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hasErrors: PropTypes.bool,
  onClick: PropTypes.func,
  suggestion: PropTypes.string,
}

export default Help
