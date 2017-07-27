import React from 'react'
import PropTypes from 'prop-types'
// import { pick } from 'lodash'
import InternalLink from 'redux-history-component'
// import css from 'cape-style'
import LinkAction from './LinkAction'
import LinkContent from './LinkContent'
import LinkExternal from './LinkExternal'

// Get the link type. Three kinds:
// 1. Action button. { action: function }
// 1. External link. { href: string }
// 1. Internal link. { routeId: string, ...params }
export function getLinkElement({ action, href, routeId }) {
  if (action) return LinkAction
  if (href) return LinkExternal
  if (routeId) return InternalLink
  return LinkContent
}

// Link Router. Decide if it's internal, external, or an action button.
function Link(props) {
  const Component = getLinkElement(props)
  return (<Component {...props} />)
}
Link.propTypes = {
  action: PropTypes.func,
  href: PropTypes.string,
  routeId: PropTypes.string,
  // siteId: PropTypes.string,
}
Link.defaultProps = {
  action: null,
  href: null,
  routeId: null,
}
export default Link
