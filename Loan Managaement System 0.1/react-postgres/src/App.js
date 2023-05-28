import React, { useState, useEffect } from 'react';

function App() {
  const [loans, setLoans] = useState(false);

  useEffect(() => {
    getLoan();
  }, []);

  function getLoan() {
    fetch('http://localhost:3001/')
      .then(response => {
         return response.text();
      })
      .then(data => {
        setLoans(data);
      });
  }

  function createLoan() {
    //let l_id = prompt('Enter loan ID');
    let b_id = prompt('Enter branch ID');
    let agent = prompt('Enter agent');
    let amount = prompt('Enter loan amount');
    let loan_term = prompt('Enter loan term');
    let date = prompt('Enter date');
    let status = prompt('Enter status');
    let interest_rate = prompt('Enter interest rate');
    let balance = prompt('Enter balance');

    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //l_id,
        b_id,
        agent,
        amount,
        loan_term,
        date,
        status,
        interest_rate,
        balance,
      }),
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getLoan();
      });
  }

  function deleteLoan() {
    let l_id = prompt('Enter loan ID');
    fetch(`http://localhost:3001/loans/${l_id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        getLoan();
      });
  }

  return (
    <div>
      {loans ? loans : 'There is no loan data available'}
      <br />
      <button onClick={createLoan}>Add loan</button>
      <br />
      <button onClick={deleteLoan}>Delete loan</button>
    </div>
  );
}

export default App;
