import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from './NavBar';
import Word from './Word';
import RandomWordPos from './RandomWordPos';
import RandomWordPosStartWith from './RandomWordPosStartWith';

// const BASE_URL = 'https://ty8omrsmwa.execute-api.eu-west-1.amazonaws.com/dev';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="header">Dictionary</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/word/:word" element={<Word />} />
          <Route path="/random-word-pos/:part" element={<RandomWordPos />} />
          <Route path="/random-word-pos-start-with" element={<RandomWordPosStartWith />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
