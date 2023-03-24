import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Nav from './components/Nav'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Nav />
     <div className='pages'>
      <Routes>
        <Route 
          path="/"
          element={<Home />}
          />
          <Route 
          path="/login"
          element={<Login />}
          />
           <Route 
          path="/signup"
          element={<Signup />}
          />
      </Routes>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;