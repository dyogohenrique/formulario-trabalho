import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Resultados from './components/pages/Resultados';
import Container from './components/layout/Container';

function App() {
  return (
      <Router basename="/formulario-trabalho">
        <Container>

          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/resultados' element={<Resultados />}/>
          </Routes>

        </Container>
      </Router>
  );
}

export default App;
