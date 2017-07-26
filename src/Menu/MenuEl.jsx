import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import css from 'cape-style'
import NavItem from './NavItem'

function Menu({ links, actions }) {
  function getAction({ action }) { return actions[action] }
  return (
    <ul className="menu" style={css('lsNone p0')}>
      {map(links, link => (
        <NavItem {...link} key={link.id} action={getAction(link)} />
      ))}
    </ul>
  )
}
Menu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
}
Menu.defaultProps = {
}
export default Menu
