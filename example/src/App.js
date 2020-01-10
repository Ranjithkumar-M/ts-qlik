import React from 'react'
import { TSQlik, QSApp, QSProps } from 'ts-qlik'

function App(props) {

  const qlik = {
    "host": "localhost",
    "port": 80,
    "prefix": "/",
    "rejectUnauthorized": false,
    "isSecure": false
};

QSApp('031ec68a-9247-4fc5-9ddd-3b1764924aab', qlik, ['all']).then((app) => {
  console.log(app);
})

  return (
    <div className="App">
      <div className="Header">
        Hello
      </div>
      <div className="Qlik-sense"></div>
    </div>
  );
}

export default App;