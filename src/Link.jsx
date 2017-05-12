import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import InternalLink from 'redux-history-component'
import css from 'cape-style'
import LinkContent from './LinkContent'

export function getLink({ href, link, src }) {
  return href || src || link
}
export function getHref(props) {
  const linkHref = getLink(props)
  if (props.siteId) return `${linkHref}?utm_source=${props.siteId}`
  return linkHref
}
export function isInternalLink({ internal, isInternal, ...rest }) {
  return isInternal || internal || (getLink(rest)[0] === '/')
}
function Link(props) {
  const { action, ...rest } = props
  if (action) {
    return (
      <button onClick={action} style={css('ba br1 p1 inlineBlock fs1 textReset bgTrans')}>
        <LinkContent {...rest} />
      </button>
    )
  }
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
