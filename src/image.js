import { flow, partial } from 'lodash'
import { add, get, map, orderBy, pick, size, split } from 'lodash/fp'
import { callWith, replaceField, setField, setKeyVal } from 'cape-lodash'
import { createSelector } from 'reselect'
import { getSelect, structuredSelector } from 'cape-select'
import { clear, fieldValue, meta, saved, saveProgress } from 'redux-field'
import { entityTypeSelector } from 'redux-graph'
import { selectUser } from 'cape-redux-auth'
import { saveEntity, saveTriple, updateEntity } from 'cape-firebase'

import { IMAGE } from './module'
import { omitFile } from './FileUpload/dropZoneUtils'
import { loadImage, loadImageUrl, loadSha } from './FileUpload/windowFileUtils'
import { getIdFromFile, selectItems } from './items'
import firebase from '../firebase'

const { storage } = firebase

export const ACCEPT_FILE_TYPE = 'image/jpeg'
export const collectionId = 'file'


export const uploadImage = (dispatch, entity, file, props) => {
  // console.log(entity, file)
  const { fileName } = entity
  loadImageUrl(file, console.error, (imageInfo) => {
    if (!imageInfo) return undefined
    const { dataUrl, ...sizes } = imageInfo
    const entityUpdateFields = { ...pick(['id', 'type'], entity), ...sizes }
    dispatch(saveEntity(entityUpdateFields))
    if (dataUrl) dispatch(meta(props.prefix, imageInfo))
    return undefined
  })

  // @TODO Make sure there isn't already this file in the database.
  const uploadTask = storage.child(fileName).put(file)
  uploadTask.on('state_changed',
    onProgress(dispatch, props.prefix), console.error, onComplete(dispatch, entity, props.prefix)
  )
  // Need to update the image form field.
  return uploadTask
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
  if (entity) console.log('found entity')
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
  if (entity.bytesTransferred === entity.contentSize) {
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
  const { dispatch } = props
  loadSha(file)
  .then(fileWithSha => dispatch(ensureFileEntity(props, fileWithSha)))
  .then(entity => !entity.hasEntity && uploadImage(dispatch, entity, file.file, props))
})

// A file has been selected. Upload a file. First func is props. Use that instead of thunk.
// export const handleUpload = props => (file) => {
//   console.log(file)
  // const hasError = errorCheck(props, file)
  // blurSelectorOmitFile(props, file)
  // clearFileSelect(dispatch)
  // loadSha(file, ensureFileEntity(props, getState))
  // if (file) loadSha(file, uploadImage(dispatch, agent))
  // console.log(file)
//   return undefined
// }
export const findItemFromFile = getSelect(
  selectItems,
  flow(fieldValue(collectionId), getIdFromFile),
)

export const getImg = flow(
  pick(['dateCreated', 'name', 'url']),
  replaceField('url', getImgSrc)
)
// Specific to item file upload page.
export const getImages = createSelector(
  selectImages,
  flow(
    map(getImg),
    orderBy('dateCreated', 'desc'),
  )
)
export const imageSelector = structuredSelector({
  accept: ACCEPT_FILE_TYPE,
  collectionId,
  images: getImages,
  item: findItemFromFile,
})
