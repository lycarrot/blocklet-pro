import './app.css';
import { BrowserRouter as Router,Routes } from 'react-router-dom';
import Nav from './components/nav'
import InitRoute from './routes'


function App() {
  return (
    <div className="app">
      <Nav ></Nav>
      <Routes>
      {InitRoute()}
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
