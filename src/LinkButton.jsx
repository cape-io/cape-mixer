import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import InternalLink, { Link } from 'redux-history-component'
import css from 'cape-style'
import LinkContent from './LinkContent'
import LinkAction from './LinkAction'
// Three kinds of links.
// 1. Internal link. { routeId: string, ...params }
// 1. External link. { href: string }
// 1. Action button. { action: function }

export function getHref(href, hash, siteId) {
  const loc = `${href}${hash || ''}`
  return siteId ? `${loc}?utm_source=${siteId}` : loc
}
export function isInternalLink({ internal, isInternal, ...rest }) {
  return isInternal || internal || (getLink(rest)[0] === '/')
}
function LinkButton({ action, hash, href, ...rest }) {
  if (action) return <LinkAction onClick={action} {...rest} />
  if (href) return <Link href={href} {...rest} />
  return <InternalLink {...rest} />
}
LinkButton.propTypes = {
  action: PropTypes.func,
  href: PropTypes.string,
}
export default Link
