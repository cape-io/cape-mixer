import React, { PropTypes } from 'react'
import { map } from 'lodash'
import css from 'cape-style'
import { handleSelect } from '../image'
import { getEntityPrefix } from '../capeField'
import Field from './Field'
import FileSelect from '../FileUpload/FileSelectContainer'

function Fields(props) {
  const { entity, fields, title } = props
  const prefix = getEntityPrefix(props)
  // console.log(entity)
  return (
    <div className="fields">
      {title && <h2>{title}</h2>}
      <ul style={css('lsNone m0 p0')}>
        {map(fields, ({ id, ...field }) => (
          <li key={id}>
            {field.type === 'file' && <FileSelect
              {...field}
              collectionId={field.collectionId}
              initialValue={entity[id]}
              fieldId={id}
              subject={entity}
              onSelect={handleSelect}
            />}
            {field.type !== 'file' && <Field
              {...field}
              id={id}
              initialValue={entity[id]}
              prefix={prefix}
            />}
          </li>
        ))}
      </ul>
    </div>
  )
}

Fields.propTypes = {
  // dispatch: PropTypes.func,
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  // prefix: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
}
Fields.defaultProps = {
  title: 'Edit Entity',
}
export default Fields
