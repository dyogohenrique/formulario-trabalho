import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Container from './components/layout/Container';
import People from './components/pages/People';
import Person from './components/pages/Person';

function App() {
  return (
      <Router basename="/formulario-trabalho">
        <Container>

          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route path='/people' element={<People />}/>
            <Route path='/person/:id' element={<Person />}/>
          </Routes>

        </Container>
      </Router>
  );
}

export default App;
