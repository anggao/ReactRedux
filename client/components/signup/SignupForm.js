import React from 'react';
import timezones from '../../data/timezones'
import map from 'lodash/map'
import classnames from 'classnames'

import validateInput from '../../../server/shared/validations/signup'
import TextFieldGrop from '../common/TextFieldGroup'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  onSubmit(e) {
    e.preventDefault()
    if (this.isValid()) {
      this.setState({errors: {}, isLoading: true})
      this.props.userSignupRequest(this.state).then(
        () => {},
        ({data}) => this.setState({errors: data, isLoading: false})
      )
    }
  }

  render() {
    const { errors } = this.state
    const options = map(timezones, (val, key) => (
      <option value={val} key={val}>{key}</option>
    ))
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join us</h1>
        <TextFieldGrop
          error={errors.username}
          label="UserName"
          onChange={this.onChange}
          value={this.state.username}
          field="username"
        />

        <TextFieldGrop
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />

        <TextFieldGrop
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />

        <TextFieldGrop
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />

        <div className={classnames("form-group", {'has-error': errors.timezone})}>
          <div className="control-label">Timezone</div>
          <select
            name="timezone"
            className="form-control"
            onChange={this.onChange}
            value={this.state.timezone}
          >
            <option value="" disabled>Choose your timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>

        <div className="form-group">
          <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
            Sign up
          </button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm;
