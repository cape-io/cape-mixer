import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

function Button({ children, className, icon, ...props }) {
  return (
    <button {...props} className={classnames('', className)}>
      {icon && <i className={classnames('fa', `fa-${icon}`)} aria-hidden="true" />}
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
}

export default Button
