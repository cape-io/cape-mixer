import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, pick } from 'lodash'
import classNames from 'classnames'

import Editable from './FieldViewEditable'
import Static from './FieldViewStatic'

// The preview of a field value. Used for really simple text fields.
function FieldView({ className, isEditable, value, ...props }) {
  const cssClasses = {
    'editable-click': isEditable,
    'editable-empty': isEmpty(value),
    'form-value': true,
  }
  const PreviewEl = isEditable ? Editable : Static
  const editableProps = pick(props, 'emptyText', 'id', 'initialValue', 'onClick')
  return (
    <div className={classNames(cssClasses, className)}>
      <PreviewEl {...editableProps} value={value} />
    </div>
  )
}
FieldView.defaultProps = {
  className: null,
  emptyText: 'Empty',
  isEditable: true,
  value: null,
}
FieldView.propTypes = {
  className: PropTypes.string,
  emptyText: PropTypes.string,
  isEditable: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

export default FieldView
