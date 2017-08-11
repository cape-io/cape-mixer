import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from 'cape-style'
import LinkEl from '../Link/Link'

const styles = {
  links: css('bb block fs1 textReset'),
}

function NavItem({ className, isActive, id, ...props }) {
  return (
    <li className={classnames(id, className, { active: isActive })}>
      <LinkEl style={styles.links} {...props} />
    </li>
  )
}
NavItem.propTypes = {
  // action: PropTypes.func,
  className: PropTypes.string,
  // icon: PropTypes.string,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  // label: PropTypes.string,
}
NavItem.defaultProps = {
  className: null,
  id: null,
  isActive: false,
}
export default NavItem
