import React, { PropTypes } from 'react'

import classnames from 'classnames'

import { preventDefault } from './utils'

// Editable formGroup wrapper.
function FormGroup(props) {
  const { children, className, label, form, id, required, editable, wrapClass, savingTxt } = props
  const { saving, status } = form
  const cssClasses = {
    editable,
    'form-group': true,
    'has-error': (status === 'error'),
    'has-success': (status === 'success'),
    'has-warning': (status === 'warning'),
    'has-feedback': status,
  }
  return (
    <div className={classnames('editable-form', wrapClass)} onSubmit={preventDefault}>
      <div className={classnames(cssClasses, className)} id={`${id}-group`}>
        {label &&
          <label className="control-label" htmlFor={id}>
            {label}
            {required ? '*' : false}
          </label>
        }
        {children}
        {saving && <span className="saving small mono">{savingTxt}</span>}
      </div>
    </div>
  )
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  editable: PropTypes.bool,
  form: PropTypes.shape({
    editing: PropTypes.bool,
    errorMessage: PropTypes.string,
    status: PropTypes.string,
  }),
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  savingTxt: PropTypes.string.isRequired,
  status: PropTypes.string,
  wrapClass: PropTypes.string,
}

FormGroup.defaultProps = {
  savingTxt: 'Saving...',
  wrapClass: 'form-horizontal',
}

export default FormGroup
