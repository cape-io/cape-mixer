import React from 'react'
import PropTypes from 'prop-types'
import { get, pick } from 'lodash/fp'
import InternalLink from 'redux-history-component'
import css from 'cape-style'
import LinkContent from './LinkContent'

// Three kinds of links.
// 1. Internal link. { routeId: string, ...params }
// 1. External link. { href: string }
// 1. Action button. { action: function }

export function getLink({ href, link, src }) {
  return href || src || link
}
export function getHref(props) {
  const linkHref = getLink(props)
  if (props.siteId) return `${linkHref}?utm_source=${props.siteId}`
  return linkHref
}
export const isInternalLink = get('routeId')
export const getProps = pick(['className', 'title'])

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
    <a href={getHref(props)} {...getProps(rest)}>
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
