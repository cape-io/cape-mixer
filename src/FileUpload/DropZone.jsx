import React from 'react'
import PropTypes from 'prop-types'
import css from 'cape-style'
import { handleHover } from './dropZoneUtils'
import Icon from '../Icon'

const baseStyle = css('bgGray pt5 pb5 pl2 pr2 mb2')
const styles = {
  base: baseStyle,
  onHover: { ...baseStyle, ...css('bgWashedBlue ba bw0p125') },
}

// Should only provide drop functionality. Nothing more. Use Uploading component to show progress.

function DropZone({ hasFocus, message, onDragEnter, onDragLeave, onDragOver, onSelect, style }) {
  const inlineStyle = hasFocus ? styles.onHover : styles.base
  return (
    <div
      style={{ ...inlineStyle, ...style }}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onSelect}
      className="dropzone"
    >
      <p>
        {message} <br />
        <Icon style={css('mt1')} symbol="picture-o" className="fa-3x" />
      </p>
      {hasFocus && <p>Drop it</p>}
    </div>
  )
}

DropZone.propTypes = {
  hasFocus: PropTypes.bool,
  // id: PropTypes.string,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragOver: PropTypes.func,
  // onDrop: PropTypes.func,
  onSelect: PropTypes.func,
  message: PropTypes.string.isRequired,
  style: PropTypes.object,
}
DropZone.defaultProps = {
  message: 'Drop in a new file to upload.',
  multiple: false,
  onDragOver: handleHover,
  style: {},
}
export default DropZone
