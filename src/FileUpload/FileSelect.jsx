import React, { PropTypes } from 'react'

import { handleSelect } from './dropZoneUtils'

import DropZone from './DropZone'
import FileInput from './FileInput'
import FileUploading from './FileUploadingContainer'

function FileSelect(props) {
  const { error, hasBlur, id, isRequired, name, value, ...rest } = props
  const onSelect = handleSelect(props)
  return (
    <div>
      {name && <label htmlFor={id}><strong>{name}{isRequired ? '*' : false}</strong></label>}
      {error && <p>{error}</p>}
      {hasBlur && <p className="uploading">Image Selected</p>}
      {!hasBlur &&
        <div>
          <DropZone {...rest} onSelect={onSelect} />
          <FileInput {...rest} onSelect={onSelect} />
        </div>
      }
      {value && <FileUploading {...rest} value={value} />}
    </div>
  )
}
FileSelect.propTypes = {
  error: PropTypes.string,
  hasBlur: PropTypes.bool,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  onSelect: PropTypes.func,
  value: PropTypes.shape({
    name: PropTypes.string,
  }),
}
export default FileSelect
