import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import css from 'cape-style'
import NavItem from './NavItem'

function Menu({ activeId, links, actions }) {
  function isActive({ id }) { return activeId === id }
  function getAction({ action }) { return actions[action] }
  return (
    <ul className="menu" style={css('lsNone p0')}>
      {map(links, link => (
        <NavItem {...link} key={link.id} isActive={isActive(link)} action={getAction(link)} />
      ))}
    </ul>
  )
}
Menu.propTypes = {
  activeId: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}
Menu.defaultProps = {
}
export default Menu