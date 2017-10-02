import React from 'react'
import PropTypes from 'prop-types'
import { humanFileSize } from './dropZoneUtils'
import Label from './Label'

function FileSize({ contentSize }) {
  const { unitText, value } = humanFileSize(contentSize)
  return (
    <div className="dz-size">
      <Label text="Size:" />
      <span className="dz-size-value">{value}</span>
      <span className="dz-size-unit">{unitText}</span>
    </div>
  )
}
FileSize.propTypes = {
  contentSize: PropTypes.number.isRequired,
}
export default FileSize
