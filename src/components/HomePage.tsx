import React from 'react';

const HomePage = () => {
  return (
    <div className="homepage-div">
      <h3>Home Page</h3>
      In this dictionary you can search by:
      <ul>
        <li>Word</li>
        <li>Word with a specific part of speech</li>
        <li>A random word from a specific part of speech</li>
        <li>A random word from a specific part of speech and letter begin with</li>
      </ul>
    </div>
  );
};

export default HomePage;
