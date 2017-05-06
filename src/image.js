import { flow } from 'lodash'
import { add, get, pick, size, split } from 'lodash/fp'
import { setField, setKeyVal } from 'cape-lodash'
import { getSelect } from 'cape-select'
import { clear, fieldValue, meta } from 'redux-field'
import { entityTypeSelector } from 'redux-graph'
import { selectUser } from 'cape-redux-auth'
import { saveEntity, saveTriple, uploadFile, updateEntityFields } from 'cape-firebase'

import { IMAGE } from './module'
import { omitFile } from './FileUpload/dropZoneUtils'
import { loadImage, loadImageDataUrl, loadSha } from './FileUpload/windowFileUtils'
import { getImgSrc, getImgPreviewSrc } from './select'

export const ACCEPT_FILE_TYPE = 'image/jpeg'
export const collectionId = 'file'
export function isUploaded(entity) {
  return entity.bytesTransferred === entity.contentSize
}
export const onFileComplete = (dispatch, entity, prefix) => (store) => {
  const state = store.getState()
  const url = getImgSrc(entity.fileName)(state)
  // Save the URL to the entity.
  dispatch(updateEntityFields(entity, { url }))

  // dispatch(saved(prefix, { id, value: url }))
  loadImage(getImgPreviewSrc(url)(state))
  .then(() => dispatch(clear(prefix)))
  // console.log('done', getFileUrl(fileName))
}

export const uploadImage = (dispatch, entity, file, props) => {
  // const { fileName } = entity
  loadImageDataUrl(file, console.error, (imageInfo) => {
    if (!imageInfo) return undefined
    const { dataUrl, ...sizes } = imageInfo
    const entityUpdateFields = { ...pick(['id', 'type'], entity), ...sizes }
    dispatch(saveEntity(entityUpdateFields))
    if (dataUrl) dispatch(meta(props.prefix, imageInfo))
    return undefined
  })
  dispatch(uploadFile({ file, entity }))
  .then(onFileComplete(dispatch, entity, props.prefix))
  // @TODO Make sure there isn't already this file in the database.

  // Need to update the image form field?
  // return uploadTask
}

// Select previous file selector error.
export const getError = fieldValue(collectionId, 'error')
// The number of dots in the name.
export const getDotCount = flow(get('name'), split('.'), size, add(-1))

export function blurSelectorOmitFile({ onBlur }, file) {
  return onBlur(omitFile(file))
}

export const selectImages = entityTypeSelector(IMAGE)
export const findImage = getSelect(
  selectImages,
  fieldValue(collectionId, 'value.contentSha1'),
)

export const createImageEntity = state => flow(
  omitFile,
  setField('id', get('contentSha1')),
  setKeyVal('type', IMAGE),
  setKeyVal('agent', selectUser(state))
)
// Get or create entity.
export const getOrCreateEntity = (file, state) => {
  const entity = get(file.contentSha1, selectImages(state))
  return entity || createImageEntity(state)(file)
}

// @return promise of entity.
export const ensureFileEntity = (props, file) => (dispatch, getState) => {
  const state = getState()
  const entity = getOrCreateEntity(file, state)
  // Attach entity to parent/subject.
  const { subject, fieldId, single } = props
  if (subject && fieldId) {
    dispatch(saveTriple({ subject, predicate: fieldId, object: entity, single }))
  }
  // bytesTransferred
  if (isUploaded(entity)) {
    return Promise.resolve(dispatch(blurSelectorOmitFile(props, entity)))
  }
  // Save to firebase
  return dispatch(saveEntity(entity))
}
export const invalidTypeMsg = ({ fileFormat }) =>
  `Invalid file type. Expected ${ACCEPT_FILE_TYPE}, got ${fileFormat}.`
export const invalidDotsMsg = dots =>
  `The file name must have exactly 1 dot, found ${dots}.`

export function errorCheck(props, file) {
  const { clearError, error, onError } = props
  if (!file.isAccepted) {
    return onError(invalidTypeMsg(file))
  }
  const dots = getDotCount(file)
  if (dots !== 1) {
    return onError(invalidDotsMsg(dots))
  }
  if (error) {
    console.log('clearError')
    clearError()
  }
  return false
}

export const errorOrBlur = next => props => (file) => {
  const hasError = errorCheck(props, file)
  if (hasError) return hasError
  blurSelectorOmitFile(props, file)
  return next(props, file)
}
// FILE UPLOAD
export const handleSelect = errorOrBlur((props, file) => {
  const { dispatch, prefix } = props
  loadSha(file)
  .then(fileWithSha => dispatch(ensureFileEntity(props, fileWithSha)))
  .then((entity) => {
    if (!isUploaded(entity)) {
      return uploadImage(dispatch, entity, file.file, props)
    }
    return dispatch(clear(prefix))
  })
})
