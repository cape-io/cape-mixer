import sha1Hash from 'simple-sha1'
import { flow, propertyOf } from 'lodash'
import { at, join } from 'lodash/fp'
import { setKey, setField } from 'cape-lodash'

/* global window */

export const getFileName = flow(at(['contentSha1', 'ext']), join('.'))
export const setFileName = setField('fileName', getFileName)

export const getCollectionId = propertyOf({ image: 'ImageObject' })

// Write values to contentSha1 and fileName fields.
export function loadSha(file) {
  const reader = new window.FileReader()
  return new Promise((resolve, reject) => {
    reader.onloadend = () => sha1Hash(reader.result, flow(
      setKey('contentSha1', file), setFileName, resolve
    ))
    reader.onerror = reject
    reader.readAsArrayBuffer(file.file)
  })
}

// export const fileName = over()
export const MAX_BYTES = 4100069
export const errTxt = 'Invalid image file. The file is corrupt or has the wrong filename extension.'

export function loadImageUrl(file, onError, onSuccess) {
  if (file.size > MAX_BYTES) return onSuccess()
  const reader = new window.FileReader()
  reader.onloadend = () => {
    const img = new window.Image()
    img.onerror = () => onError(errTxt)
    img.onload = () => {
      onSuccess({
        dataUrl: reader.result, // Include fileData base64 thing.
        height: { unitCode: 'E37', value: img.height, unitText: 'pixel' },
        width: { unitCode: 'E37', value: img.width, unitText: 'pixel' },
      })
    }
    img.src = reader.result
  }
  return reader.readAsDataURL(file)
}
export function loadImage(url, onSuccess) {
  const img = new window.Image()
  img.onload = onSuccess
  img.src = url
}
