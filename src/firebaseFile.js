import { flow, partial, pick } from 'lodash'
import { clear, meta } from 'redux-field'
import { updateEntityFields } from 'cape-firebase'
import { loadImage, loadImageDataUrl } from './FileUpload/windowFileUtils'
import { getImgSrc, getImgPreviewSrc } from './select'

// Update entity progress.
export const onProgress = (dispatch, entity) => flow(
  pick('bytesTransferred'),
  partial(updateEntityFields, entity),
  dispatch
)

export const onComplete = ({ dispatch, getState }, entity, prefix) => () => {
  const state = getState()
  const url = getImgSrc(entity.fileName)(state)
  // Save the URL to the entity.
  dispatch(updateEntityFields(entity, { url }))

  // dispatch(saved(prefix, { id, value: url }))
  loadImage(getImgPreviewSrc(url)(state))
  .then(() => dispatch(clear(prefix)))
  // console.log('done', getFileUrl(fileName))
}

// @param entity: entity created for this file.
// @param file: javascript File object.
// @param prefix: redux-field prefix.
export function handleFileUpload({ action, firebase, store }) {
  const { dispatch } = store
  const { entity, file, prefix } = action
  const { fileName } = entity
  loadImageDataUrl(file)
  .then((imageInfo) => {
    if (!imageInfo) return undefined
    const { dataUrl, ...sizes } = imageInfo
    dispatch(updateEntityFields(entity, sizes))
    if (dataUrl) dispatch(meta(prefix, imageInfo))
    return undefined
  })

  // @TODO Make sure there isn't already this file in the database.

  const uploadTask = firebase.storage.child(fileName).put(file)
  .on('state_changed',
    onProgress(dispatch, prefix),
    console.error,
    onComplete(dispatch, entity, prefix)
  )
  // Need to update the image form field.
  return uploadTask
}
