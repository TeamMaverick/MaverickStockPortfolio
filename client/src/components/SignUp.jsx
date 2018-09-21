import React from 'react'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      pw: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  onChange(e, type) {
    e.preventDefault()
    this.setState({
      [type]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.signUp(this.state.username, this.state.email, this.state.pw)
  }

  render() {
    return (
              <section className="hero signinbg is-fullheight">
        <div className="hero-body">
          <div className="columns is-multiline is-centered">
            <div className="column">
              <div className="card card-signin">
                <div className="card-content">
                  <div className="content">
                  <form>
                  <div className="field">
                      <label className="label">Username</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" onChange={(e) => this.onChange(e,'username')} value={this.state.username} autoComplete="username" type="text" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input" onChange={(e) => this.onChange(e,'email')} value={this.state.email} autoComplete="email" type="text" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <p className="control has-icons-left">
                        <input className="input" onChange={(e) => this.onChange(e, 'pw')} value={this.state.pw} autoComplete="current-password" type="password" />
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field is-grouped">
                      <div className="control signin">
                        <button className="button" onClick={(e) => this.handleSubmit(e)}>Sign Up</button>
                      </div>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SignUp