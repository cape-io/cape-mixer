import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from 'cape-style'

function Button({ children, className, icon, styles, ...props }) {
  return (
    <button {...props} style={css(styles)} className={classnames('', className)}>
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
  styles: PropTypes.string,
}

export default Button
