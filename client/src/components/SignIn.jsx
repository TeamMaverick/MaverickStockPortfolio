import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'login',
      email: '',
      password: '',
      firsname: '',
      lastname: ''
    }
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  

  handleSignInSubmit(event) {
    event.preventDefault();
    this.props.signInUser(this.state.email, this.state.password)
    // this.props.changeView('home');
  }

  handleSignUpSubmit(e) {
    e.preventDefault();
    this.props.createUser(this.state.email, this.state.password, this.state.firstname, this.state.lastname)
  }

  handleChange(e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj)
  }

  toggleView() {
    if(this.state.view === 'login') {
      this.setState({view:'signup'})
    } else {
      this.setState({view:'login'})
    }
  }

  render() {
    return  this.state.view === 'login' ? 
      (<section className="hero signinbg is-fullheight">
        <div className="hero-body">
          <div className="columns is-multiline is-centered">
            <div className="column">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                  <form>
                    <div className="field">
                      <label className="label">E-mail</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" value={this.state.email} onChange={this.handleChange} autoComplete="email" type="text" name="email"/>
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <p className="control has-icons-left">
                        <input className="input" value={this.state.password} onChange={this.handleChange} autoComplete="current-password" type="password" name="password"/>
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link" onClick={this.handleSignInSubmit}>Sign In</button>
                      </div>
                      <div>
                        <button className="button is-link" onClick={this.toggleView}>Create Account</button>
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
    ) : (
      <section className="hero signinbg is-fullheight">
        <div className="hero-body">
          <div className="columns is-multiline is-centered">
            <div className="column">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                  <form onSubmit={this.handleSignUpSubmit}>
                  <div className="field">
                      <label className="label">First Name</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" value={this.state.firstname} onChange={this.handleChange} autoComplete="firstname" type="text" name="firstname"/>
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Last Name</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" value={this.state.lastname} onChange={this.handleChange} autoComplete="lastname" type="text" name="lastname"/>
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">E-mail</label>
                      <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" value={this.state.email} onChange={this.handleChange} autoComplete="email" type="text" name="email"/>
                        <span className="icon is-small is-left">
                          <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fas fa-check"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <p className="control has-icons-left">
                        <input className="input" value={this.state.password} onChange={this.handleChange} autoComplete="current-password" type="password" name="password"/>
                        <span className="icon is-small is-left">
                          <i className="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <button className="button is-link">Submit</button>
                      </div>
                      <div>
                        <button className="button is-link" onClick={this.toggleView}>Sign In</button>
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

export default SignIn;