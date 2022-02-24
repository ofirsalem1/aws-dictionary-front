import './wordDisplay.css';
import { ToastContainer } from 'react-toastify';
import { WordDisplayPropsInterface } from '../../types/wordDisplay.type';

const WordDisplay = ({ wordDefinition, getWordDefinition }: WordDisplayPropsInterface) => {
  return (
    <div>
      {!wordDefinition && (
        <div>
          <span className="loader"> </span>
        </div>
      )}
      {wordDefinition &&
        wordDefinition.map((word: any, i: number) => {
          return (
            <div className="definitions-div" key={i}>
              <h3>
                {word.word}, {word.pos}
              </h3>
              {word.definitions.map((definition: string, i: number) => {
                const definitionArr = definition.split(' ');
                return (
                  <p className="definition-div" key={i}>
                    <hr />
                    {i + 1}.{' '}
                    {definitionArr.map((definitionWord: string, i: number) => {
                      return (
                        <span key={i} onClick={() => getWordDefinition(definitionWord)}>
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

export default WordDisplay;
