import React, { PropTypes } from 'react'
import FileDetails from './FileDetails'
import FileProgress from './FileProgress'
// const {
//   hasHover, message, isSaving,
//   savedProgress, savedValue, style, uploadStarted, value, ...rest,
// } = props
// const savedTxt = 'Processing...'
// <div>
//   <FileUploading isSaving={isSaving} savedProgress={savedProgress} value={value} />
//   {savedValue && <p>{savedTxt}<strong>{savedValue}</strong></p>}
// </div>
function FileUploading({ isSaving, savedProgress, value }) {
  const { dataUrl, name } = value
  // const { dataUrl, ...dimensions } = image
  const waitTxt = 'Calculating sha1 and preparing for upload.'

  return (
    <div className="dz-preview dz-processing dz-image-preview col-md-2">
      <FileDetails {...value} />
      {!isSaving && <p>{waitTxt}</p>}
      {isSaving && <p>Saving</p>}
      {dataUrl && (
        <div>
          { dataUrl &&
            <img alt={name} src={dataUrl} style={{ width: 300 }} width={300} />
          }
        </div>
      )}
      { savedProgress && isSaving && <FileProgress savedProgress={savedProgress} /> }
    </div>
  )
}
FileUploading.propTypes = {
  isSaving: PropTypes.bool.isRequired,
  value: PropTypes.object.isRequired,
  savedProgress: PropTypes.number.isRequired,
}
FileUploading.defaultProps = {
  image: {},
  width: 300,
}
export default FileUploading
