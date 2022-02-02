import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const RandomWordPos = () => {
  const navigate = useNavigate();
  const [pos, setPos] = useState('');
  const [wordDefinition, setWordDefinition] = useState<any>(null);
  const { part } = useParams();
  useEffect(() => {
    if (part) {
      getWord(part);
      setPos(part);
    }
  }, []);

  const getWord = async (searchWord: string) => {
    setWordDefinition(null);
    // const wordWithoutDot = searchWord.replace(/[^a-zA-Z ]/g, '');
    let response;
    response = await axios.get(`http://localhost:3000/part-of-speech/${searchWord}`);
    navigate(`/random-word-pos/${searchWord}`);
    setWordDefinition(response.data);
  };
  const handleChange = (event: any) => {
    setPos(event.target.value);
  };

  return (
    <div>
      <h2>A Random Word From Part Of Speech</h2>
      <form
        onSubmit={e => {
          e.preventDefault();
          getWord(pos);
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <FormHelperText>Choose Part Of Speech</FormHelperText>
          <Select
            value={pos}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
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
      {wordDefinition && (
        <div className="definition-div">
          <h3>
            {wordDefinition.word}, {wordDefinition.pos}
          </h3>
          {wordDefinition.definitions.map((definition: string, i: number) => {
            return (
              <p key={i}>
                {i + 1}: {definition}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RandomWordPos;
