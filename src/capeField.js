import { connect } from 'react-redux'
import {
  cond, flow, filter, get, isPlainObject, memoize, method,
  omit, overArgs, partial, property, stubTrue,
} from 'lodash'
import { at, getOr } from 'lodash/fp'
// import { mapDispatchToProps } from 'cape-redux'
import { mapPartial, selectForm } from 'redux-field'
import { bindActionCreators } from 'redux'

// @TODO Default values needed for prefixProps? Not for now.
// Create builder that accepts prefixProps array if required.
export function mapDispatchToProps(getActions) {
  return (dispatch, props) => ({ dispatch, ...bindActionCreators(getActions(props), dispatch) })
}
export const prefixProps = ['collectionId', 'fieldId']
export const getEntityPrefix = cond([
  [property('prefix'), property('prefix')],
  [stubTrue, flow(at(prefixProps), filter)],
])
export const getFieldState = overArgs(get, [selectForm, getEntityPrefix])
export const getFieldProp = flow(property, partial(flow, getFieldState))
export const getFieldPropOr = flow(getOr, partial(flow, getFieldState))

// Assume the actions never change for the life of component?
export const cacheKey = flow(getEntityPrefix, method('join', '-'))
export const createGetActions = actions => flow(
  getEntityPrefix,
  memoize(mapPartial(actions), cacheKey)
)

export const getActions = flow(createGetActions, mapDispatchToProps)
// Remove the props used to create the redux-field prefix.
export function mergeProps(stateProps, dispatchProps, ownProps) {
  const props = omit(ownProps, ['collectionId'])
  return Object.assign(props, stateProps, dispatchProps)
}
export function addPrefix(mapStateToProps) {
  return (state, props) => ({ ...mapStateToProps(state, props), prefix: getEntityPrefix(props) })
}
// modify actionObject and add our custom mergeProps onto standard redux connect().
export const createConnect = (mapStateToProps, actions) => connect(
  addPrefix(mapStateToProps), isPlainObject(actions) ? getActions(actions) : actions, mergeProps
)
