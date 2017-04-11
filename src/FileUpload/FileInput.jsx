import React, { PropTypes } from 'react'

// Should only provide drop functionality. Nothing more. Use Uploading component to show progress.

function FileInput({ accept, message, onSelect, uploadStarted }) {
  // Display empty div when upload has started.
  if (uploadStarted) return <div className="uploading" />
  return (
    <div className="fileInput">
      <p>{message}</p>
      <input
        accept={accept}
        type="file"
        name="fileselect"
        onChange={onSelect}
        value=""
      />
    </div>
  )
}

FileInput.propTypes = {
  accept: PropTypes.string,
  // id: PropTypes.string,
  message: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  uploadStarted: PropTypes.bool,
}
FileInput.defaultProps = {
  message: 'Select a new file to upload.',
  multiple: false,
}
export default FileInput
