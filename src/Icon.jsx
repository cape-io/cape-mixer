import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Icon({ symbol, className, hidden, ...props }) {
  const classStr = `fa fa-${symbol}`

  return (
    <i
      className={classnames(classStr, className)}
      aria-hidden={hidden}
      {...props}
    />
  )
}

Icon.propTypes = {
  symbol: PropTypes.string.isRequired,
  className: PropTypes.string,
  hidden: PropTypes.bool.isRequired,
}
Icon.defaultProps = {
  className: null,
  hidden: false,
}
export default Icon
