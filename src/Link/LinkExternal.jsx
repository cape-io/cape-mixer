import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'
import LinkContent from './LinkContent'

export function getHref({ href, siteId }) {
  if (siteId) return `${href}?utm_source=${siteId}`
  return href
}

function LinkExternal(props) {
  return (
    <a href={getHref(props)} {...pick(props, 'className', 'title', 'style', 'onClick')}>
      <LinkContent {...props} />
    </a>
  )
}
LinkExternal.propTypes = {
  siteId: PropTypes.string,
  href: PropTypes.string.isRequired,
}
LinkExternal.defaultProps = {
  siteId: null,
}
export default LinkExternal
