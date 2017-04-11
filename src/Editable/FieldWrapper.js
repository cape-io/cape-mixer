import React, { PropTypes } from 'react'
import { connectField } from 'redux-field'

import FormGroup from './FormGroup'
import PreviewText from './PreviewText'
import EditField from './EditField'

// Using this for a typical horizontal editable field.
// Think of this as the field form container.
function FieldWrapper(props) {
  const { editable, emptyText, id, type, fieldEvent, formEvent, form, onSubmit, value } = props
  const { saving } = form
  function handleOpen() {
    fieldEvent.open(form.value || value)
  }
  const preventClose = !saving && props.open
  const open = preventClose || form.open
  return (
    <FormGroup {...props}>
      {!open &&
        <PreviewText
          editable={!saving && editable}
          emptyText={emptyText}
          onClick={handleOpen}
          value={form.value || value}
        />
      }
      {open &&
        <EditField
          fieldEvent={fieldEvent}
          formEvent={formEvent}
          defaultValue={value}
          form={form}
          id={id}
          key={id}
          onSubmit={onSubmit}
          preventClose={preventClose}
          type={type}
        />
      }
    </FormGroup>
  )
}

FieldWrapper.propTypes = {
  editable: PropTypes.bool.isRequired,
  emptyText: PropTypes.string,
  fieldEvent: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  formEvent: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.oneOf([
    'email',
    'dateTime',
    'fullName',
    'select',
    'text',
    'textarea',
  ]).isRequired,
  value: PropTypes.any,
}
FieldWrapper.defaultProps = {
  editable: true,
  type: 'text',
}
export default connectField()(FieldWrapper)
