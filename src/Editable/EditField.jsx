import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Input from './input/Input'

import EditableButtons from './Buttons'
import Help from './Help'

// Manage help text.
// Bubble hasError (and value?) up.

function EditField(props) {
  const {
    buttons, fieldEvent, formEvent, className, id, form, onSubmit, preventClose, type, ...other
  } = props
  const { hasError, errorMessage, help, suggestion, value } = form
  const helpTxt = hasError ? errorMessage : help
  return (
    <div className={classNames('editable-form', className)}>
      <div className="editable-row">
        <Input
          {...other}
          {...formEvent}
          className="form-control"
          id={id}
          type={type}
          value={value}
        />
        {buttons &&
          <EditableButtons
            {...fieldEvent}
            {...formEvent}
            handleSubmit={onSubmit}
            disabled={hasError}
            preventClose={preventClose}
          />
        }
      </div>
      {(helpTxt || suggestion) &&
        <Help
          help={helpTxt}
          hasErrors={hasError}
          id={id}
          suggestion={suggestion}
        />
      }
    </div>
  )
}

EditField.propTypes = {
  buttons: PropTypes.bool.isRequired,
  fieldEvent: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  form: PropTypes.object.isRequired,
  help: PropTypes.string,
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  preventClose: PropTypes.bool,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}
EditField.defaultProps = {
  buttons: true,
}
export default EditField
