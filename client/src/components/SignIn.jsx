import React from 'react';

const SignIn = (props) => {
  function handleSubmit(event) {
    event.preventDefault();
    props.changeView('home');
  }
  return (
    <section className="hero signinbg is-fullheight">
      <div className="hero-body">
        <div className="columns is-multiline is-centered">
          <div className="column">
            <div className="card card-signin">
              <div className="card-content">
                <div className="content">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label">Username</label>
                    <div className="control has-icons-left has-icons-right">
                      <input className="input is-success" autoComplete="username" type="text" />
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
                      <input className="input" autoComplete="current-password" type="password" />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field is-grouped">
                    <div className="control signin">
                      <button className="button is-link">Sign In</button>
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

export default SignIn;