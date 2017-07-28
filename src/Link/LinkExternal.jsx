import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-history-component'

export function getHref({ href, siteId }) {
  if (siteId) return `${href}?utm_source=${siteId}`
  return href
}

function LinkExternal(props) {
  return <Link {...props} href={getHref(props)} />
}
LinkExternal.propTypes = {
  siteId: PropTypes.string,
  href: PropTypes.string.isRequired,
}
LinkExternal.defaultProps = {
  siteId: null,
}
export default LinkExternal
