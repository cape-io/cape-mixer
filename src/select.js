import { selectDbPath } from 'cape-redux-reducer'

export const selectCdn = selectDbPath('cdnUrl')
// @TODO getOr from db.
export function imgPreviewSettings() {
  return '?crop=entropy&fit=crop&h=100&w=100'
}
// Create default image url.
export function getImgSrc(fileName) {
  return state => `${selectCdn(state)}${fileName}`
}

export function getImgPreviewSrc(url) {
  return state => url + imgPreviewSettings(state)
}
