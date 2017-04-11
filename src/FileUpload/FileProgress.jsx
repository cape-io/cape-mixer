import React, { PropTypes } from 'react'

function FileProgress({ savedProgress }) {
  const progressStr = `${savedProgress}%`

  return (
    <div className="dz-progress progress">
      <div
        className="progress-bar" role="progressbar"
        style={{ backgroundColor: 'lightgreen', width: progressStr }}
        aria-valuenow={savedProgress} aria-valuemin="0" aria-valuemax="100"
      >
        {progressStr}
      </div>
    </div>
  )
}
FileProgress.propTypes = {
  savedProgress: PropTypes.number.isRequired,
}
FileProgress.defaultProps = {
  width: 300,
}
export default FileProgress
