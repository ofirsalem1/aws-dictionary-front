import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Word = () => {
  const [pos, setPos] = useState('');
  const navigate = useNavigate();
  const [wordDefinition, setWordDefinition] = useState<[Object] | null>(null);
  const { word } = useParams();
  const [searchInput, setSearchInput] = useState<string>('');
  useEffect(() => {
    if (word) {
      getWord(word);
    }
  }, []);

  const getWord = async (searchWord: string) => {
    setWordDefinition(null);
    const wordWithoutDot = searchWord.replace(/[^a-zA-Z ]/g, '');
    let response;
    if (pos === '') {
      response = await axios.get(`http://localhost:3000/${wordWithoutDot}`);
    } else {
      response = await axios.get(`http://localhost:3000/${wordWithoutDot}/${pos}`);
    }
    navigate(`/word/${wordWithoutDot}`);
    if (response.data.length === 0) {
      toast.error('The word does not exist !', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setWordDefinition(response.data);
  };
  const handleChange = (event: any) => {
    setPos(event.target.value);
  };

  return (
    <div>
      <h2>Search By Word</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          getWord(searchInput);
        }}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search Word..."
          onChange={e => setSearchInput(e.target.value)}
          required
        />
        <br />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <FormHelperText>Choose Part Of Speech</FormHelperText>
          <Select
            value={pos}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'adjectives'}>Adjectives</MenuItem>
            <MenuItem value={'adverbs'}>Adverbs</MenuItem>
            <MenuItem value={'interjections'}>Interjections</MenuItem>
            <MenuItem value={'nouns'}>Nouns</MenuItem>
            <MenuItem value={'verbs'}>Verbs</MenuItem>
            <MenuItem value={'pronouns'}>Pronouns</MenuItem>
            <MenuItem value={'prepositions'}>Prepositions</MenuItem>
            <MenuItem value={'conjunctions'}>Conjunctions</MenuItem>
          </Select>
        </FormControl>

        <br />
        <button className="btn-search">Search</button>
      </form>
      {!wordDefinition && (
        <div>
          <span className="loader"> </span>
        </div>
      )}
      {wordDefinition &&
        wordDefinition.map((word: any, i: number) => {
          return (
            <div className="definition-div" key={i}>
              <h3>
                {word.word}, {word.pos}
              </h3>
              {word.definitions.map((definition: string, i: number) => {
                const definitionArr = definition.split(' ');
                return (
                  <p key={i}>
                    {i + 1}:
                    {definitionArr.map((definitionWord: string, i: number) => {
                      return (
                        <span key={i} onClick={() => getWord(definitionWord)}>
                          {definitionWord}{' '}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
          );
        })}
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} rtl={false} />
    </div>
  );
};

export default Word;
