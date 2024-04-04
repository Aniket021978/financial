import React, { useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Table from './components/Table/Table';

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
    sendDataToBackend(userInput);
  };

const sendDataToBackend = async (userInput) => {
  try {
    const response = await fetch('http://localhost:5000/api/saveUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};


  const yearlyData = [];
  if (userInput) {
    let currentSavings = +userInput['current-savings']; 
    const yearlyContribution = +userInput['yearly-contribution']; 
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div className='fade-in'>
      <Header />
      <Form userInputCalculator={calculateHandler} setUserInput={setUserInput} />
      {!userInput ? (
        <p style={{ width: '80%', margin: '0 auto', textAlign: 'center' }}>
          On the 1st year, interest is given upon the current saving then the current saving
          is added up with your interest amount and yearly saving and passed on to next year
          and the same process goes on.
        </p>
      ) : (
        <Table calculatedData={yearlyData} initialInvestment={userInput['current-savings']} />
      )}
    </div>
  );
}

export default App;
