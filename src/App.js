import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Table } from './components/Table';
import Table2 from './components/Table2';
import NoSuchPage from './components/NoSuchPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">    
        <Router>
          <nav>
            <ul style={{listStyleType:'none'}}>
              <li>
                <Link to="/table">Table</Link>
              </li>
              <li>
                <Link to="/table2">Table2</Link>
              </li>  
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<NoSuchPage/>}/>
            <Route path='/table' element={<Table/>}/>
            <Route path='/table2' element={<Table2/>}/>
          </Routes>
      </Router>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
      </header>
    </div>
  );
}

export default App;
