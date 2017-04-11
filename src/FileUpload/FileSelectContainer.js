import { createSelector } from 'reselect'
import { partialRight } from 'lodash'
// import { structuredSelector } from 'cape-select'
import { clearError, error as onError, onBlur, onDragEnter, onDragLeave } from 'redux-field'
import { createConnect, getFieldState } from '../capeField'
import Component from './FileSelect'

export const mapStateToProps = createSelector(
  partialRight(getFieldState, {}),
  ({ blur, error, focus, value }) => ({
    error,
    hasBlur: blur && value && !error,
    hasFocus: focus,
    value,
  })
)

const actions = {
  clearError,
  onBlur,
  onDragEnter,
  onDragLeave,
  onError,
}

export default createConnect(mapStateToProps, actions)(Component)
