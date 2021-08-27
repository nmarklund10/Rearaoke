import logo from '../static/logo.svg';
import '../css/App.css';

function Default() {
  return (
    <div className="Default">
      <header className="Default-header">
      <img src={logo} className="Default-logo" alt="logo" />
      <p>
        Edit <code>src/components/Default.jsx</code> and save to reload.
      </p>
      <a
        className="Default-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React!
      </a>
      </header>
    </div>
  );
}

export default Default;