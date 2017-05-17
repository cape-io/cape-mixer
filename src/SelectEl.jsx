import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isNumber, isString, map } from 'lodash'
import classnames from 'classnames'

function SelectOption({ value, name, active }) {
  return (
    <option className={classnames({ active })} value={value}>
      {name}
    </option>
  )
}
SelectOption.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}
SelectOption.defaultProps = {
  active: false,
  value: '',
}
function getOptValue(arg, value) {
  if (isString(arg.value)) return arg.value
  if (isString(value)) return value
  if (isNumber(arg)) return arg.toString()
  return arg
}
function getOptName(arg) {
  if (isString(arg.name)) return arg.name
  if (isNumber(arg)) return arg.toString()
  return arg
}
function opts(arg, id, value) {
  const val = getOptValue(arg, id)
  return {
    active: value === val,
    key: id,
    value: val,
    name: getOptName(arg),
  }
}

function Select({ firstOptionName, options, value, required, ...props }) {
  if (isEmpty(options)) return <div>NO OPTIONS</div>
  return (
    <select {...props} value={value}>
      {!required && <SelectOption name={firstOptionName} />}
      {map(options, (opt, id) => <SelectOption {...opts(opt, id, value)} />)}
    </select>
  )
}

Select.propTypes = {
  firstOptionName: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.objectOf(PropTypes.string),
  ]).isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
}
Select.defaultProps = {
  firstOptionName: '- All -',
  onBlur: undefined,
  required: false,
  value: '',
}
export default Select
