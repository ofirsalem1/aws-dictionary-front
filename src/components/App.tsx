import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NavBar from './NavBar';
import Word from './WordForm';
import RandomWordPos from './RandomWordPos';
import RandomWordPosStartWith from './RandomWordPosStartWith';

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
