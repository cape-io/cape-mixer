import React from 'react'
import PropTypes from 'prop-types'
import Link from 'redux-history-component'
import { merge } from 'cape-redux'

const styles = {
  active: {
    display: 'block',
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 12px rgba(66,67,47,.5)',
    border: '3px solid rgba(66,67,47,1)',
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}
function getLinkStyles(bgImage) {
  if (bgImage) return { backgroundImage: `url(${bgImage})` }
  return {}
}

function LinkOrNot({ children, color, parent, bgImage }) {
  const bgStyle = getLinkStyles(bgImage)
  if (parent.id === color.id) {
    return <span className="thisItem" style={merge(styles.active, bgStyle)}>{children}</span>
  }
  return (
    <Link href={color.link} title={color.id} style={bgStyle} className="bg-cover">
      {children}
    </Link>
  )
}

LinkOrNot.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  bgImage: PropTypes.string.isRequired,
}

export default LinkOrNot
