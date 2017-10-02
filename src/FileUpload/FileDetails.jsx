import React from 'react'
import PropTypes from 'prop-types'
import FileSize from './FileSize'
import Label from './Label'

function FileDetails({ contentSha1, contentSize, fileFormat, height, lastModified, name, width }) {
  return (
    <div className="dz-details">
      <div className="dz-filename"><Label text="Name:" />{name}</div>
      <div className="dz-fileformat"><Label text="Format:" />{fileFormat}</div>
      <div className="dz-filemodified"><Label text="Modified:" />{lastModified}</div>
      { contentSize && <FileSize contentSize={contentSize} />}
      { contentSha1 && <div><Label text="SHA-1" />{contentSha1}</div>}
      {height && width && (
        <div>
          <span>{width.value}</span>
          <span>x</span>
          <span>{height.value}</span>
        </div>
      )}
    </div>
  )
}
FileDetails.propTypes = {
  contentSha1: PropTypes.string,
  contentSize: PropTypes.number.isRequired,
  fileFormat: PropTypes.string,
  height: PropTypes.shape({ value: PropTypes.number }),
  lastModified: PropTypes.number,
  name: PropTypes.string.isRequired,
  width: PropTypes.shape({ value: PropTypes.number }),
}
FileDetails.defaultProps = {
}
export default FileDetails
