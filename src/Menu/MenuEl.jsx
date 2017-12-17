import React from 'react'
import PropTypes from 'prop-types'
import { flow, get, propertyOf } from 'lodash/fp'
import { map } from 'lodash'
import classnames from 'classnames'
import css from 'cape-style'
import NavItem from './NavItem'

function Menu({ activeId, className, links, actions, styles }) {
  const getAction = flow(get('action'), propertyOf(actions))
  function isActive({ id }) { return activeId === id }
  return (
    <ul className={classnames(className, 'menu')} style={css('lsNone p0', styles.menu)}>
      {map(links, link => (
        <NavItem {...link} key={link.id} action={getAction(link)} isActive={isActive(link)} />
      ))}
    </ul>
  )
}
Menu.propTypes = {
  activeId: PropTypes.string,
  className: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
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
