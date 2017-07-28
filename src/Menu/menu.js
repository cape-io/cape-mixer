import { flow, partial } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators } from 'redux'
import { createObj } from 'cape-lodash'
import { getRouteId } from 'cape-routes'
import { auth, logout } from 'cape-firebase'


// Used for the component state.
export const menuSelector = createStructuredSelector({
  activeId: getRouteId,
})

const actions = {
  auth,
  logout,
}
export const menuActions = flow(
  partial(bindActionCreators, actions),
  createObj('actions')
)
