import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import InternalLink from 'redux-history-component'
import css from 'cape-style'
import LinkAction from './LinkAction'
import LinkContent from './LinkContent'

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

function Link(props) {
  const { action, ...rest } = props

  if (isInternalLink(rest)) return <InternalLink {...rest}><LinkContent {...rest} /></InternalLink>

  return (
    <a href={getHref(props)} {...pick(rest, 'className', 'title')}>
      <LinkContent {...props} />
    </a>
  )
}
Link.propTypes = {
  action: PropTypes.func,
  className: PropTypes.string,
  internal: PropTypes.bool,
  href: PropTypes.string,
  name: PropTypes.string,
  // siteId: PropTypes.string,
}
export default Link
