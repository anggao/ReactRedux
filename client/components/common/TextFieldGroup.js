import React from 'react'
import classnames from 'classnames'

const TextFieldGrop = ({ field, value, label, error, type, onChange}) => (
  <div className={classnames('form-group', {'has-error': error})}>
    <label className="control-label">{label}</label>
    <input
      onChange={onChange}
      type={type}
      value={value}
      name={field}
      className="form-control"
    />
    {error && <span className="help-block">{error}</span>}
  </div>
)

TextFieldGrop.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

TextFieldGrop.defaultProps = {
  type: 'text'
}

export default TextFieldGrop
