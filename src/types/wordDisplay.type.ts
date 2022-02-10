import { WordInterface } from './wordForm.type';

export interface WordDisplayPropsInterface {
  wordDefinition: WordInterface[] | null;
  getWordDefinition: (searchWord: string) => {};
}
