import React, { PropTypes } from 'react'
import classNames from 'classnames'

import PreviewTextStatic from './PreviewTextStatic'
import PreviewTextEditable from './PreviewTextEditable'

// The preview of a field value. Used for really simple text fields.
function PreviewText({ className, editable, value, ...rest }) {
  const cssClasses = {
    'editable-click': editable,
    'editable-empty': !value,
    'form-value': true,
  }

  const PreviewEl = editable ? PreviewTextEditable : PreviewTextStatic
  return (
    <div className={classNames(cssClasses, className)}>
      <PreviewEl value={value} {...rest} />
    </div>
  )
}

PreviewText.defaultProps = {
  editable: true,
}
PreviewText.propTypes = {
  className: PropTypes.string,
  editable: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default PreviewText
