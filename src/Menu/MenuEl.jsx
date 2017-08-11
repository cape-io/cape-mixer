import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import map from 'lodash/map'
import css from 'cape-style'
import NavItem from './NavItem'

function Menu({ activeId, className, links, actions, styles }) {
  function getAction({ action }) { return actions[action] }
  function isActive({ id }) { return activeId === id }
  return (
    <ul className={classnames(className, 'menu')} style={css(styles.menu || 'lsNone p0')}>
      {map(links, link => (
        <NavItem {...link} key={link.id} action={getAction(link)} isActive={isActive(link)} />
      ))}
    </ul>
  )
}
Menu.propTypes = {
  activeId: PropTypes.string,
  className: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  styles: PropTypes.objectOf(PropTypes.object),
}
Menu.defaultProps = {
  activeId: null,
  className: null,
  styles: {
    menu: {},
    links: {},
  },
}
export default Menu
