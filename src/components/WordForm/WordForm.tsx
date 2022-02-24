import './wordForm.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WordInterface } from '../../types/wordForm.type';
import WordDisplay from '../WordDIsplay/WordDisplay';

// const BASE_URL = 'http://localhost:3000/';
const BASE_URL = 'https://ty8omrsmwa.execute-api.eu-west-1.amazonaws.com/dev/';

const Word = () => {
  const [pos, setPos] = useState<string>(''); // optional to choose part of speech
  const [wordDefinition, setWordDefinition] = useState<WordInterface[] | null>(null); //response from API
  const [searchInput, setSearchInput] = useState<string>('');
  const { word } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (word) {
      getWordDefinition(word);
    }
  }, []);

  const getWordDefinition = async (searchWord: string) => {
    setWordDefinition(null); // clear previous word definition
    const wordWithoutSymbols = searchWord.replace(/[^a-zA-Z ]/g, ''); // remove symbols from the word
    let response;
    if (pos === '') {
      response = await axios.get(`${BASE_URL}${wordWithoutSymbols}`);
    } else {
      response = await axios.get(`${BASE_URL}${wordWithoutSymbols}/${pos}`);
    }
    navigate(`/word/${wordWithoutSymbols}`); // navigate to the word page
    // if no definition found
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

  // if part of speech is selected
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setPos(event.target.value);
  };

  return (
    <div>
      <h2>Search By Word</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          getWordDefinition(searchInput);
        }}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Search Word..."
          onChange={e => setSearchInput(e.target.value)}
          required
        />
        <FormControl sx={{ m: 1, width: '10rem' }}>
          <FormHelperText
            sx={{ color: 'white', fontSize: '1rem', 'white-space': 'nowrap', margin: '0 auto' }}
          >
            Part Of Speech:
          </FormHelperText>
          <Select
            value={pos}
            onChange={handleSelectChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ color: 'white', border: 'white solid 2px', 'border-radius': '15px' }}
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
      <WordDisplay wordDefinition={wordDefinition} getWordDefinition={getWordDefinition} />
    </div>
  );
};

export default Word;
