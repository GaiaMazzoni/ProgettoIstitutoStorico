import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppRoutes from './routes/AppRoutes';

function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;

