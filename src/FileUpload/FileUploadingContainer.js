import { createSelector } from 'reselect'
import { partialRight } from 'lodash'
import { createConnect, getFieldState } from '../capeField'
import Component from './FileUploading'

export const mapStateToProps = createSelector(
  partialRight(getFieldState, {}),
  ({ meta, isSaving, savedProgress, savedValue, value }) => ({
    isSaving,
    savedProgress,
    savedValue,
    value: meta ? { ...meta, ...value } : value,
  })
)

export default createConnect(mapStateToProps)(Component)
