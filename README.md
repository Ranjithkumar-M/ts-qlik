# ts-qlik

> 

[![NPM](https://img.shields.io/npm/v/ts-qlik.svg)](https://www.npmjs.com/package/ts-qlik) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## TypeScript Qlik

In this library use to communicate with qlik sense capability api. Build your own react application in analytics by using qlik sense.

- Get object
- Get filter
- Get fields
- Can use Root API
- Can use App API
- Can use Bookmark API
- Can use Field API
- Can use Selection API
- Can use Variable API
- Can use Visualization API
- Can use Global API
- Can use Navigation API
- Can use Table API
- Can use Theme API

## Installation

```bash
npm install --save ts-qlik
```

## Usage  Get Qlik

```jsx
import { TSQlik, QSProps } from 'ts-qlik'

function GetQlik(props) {

  const config = {
    "host": "localhost",
    "port": 80,
    "prefix": "/proxy/",
    "isSecure": false
};

TSQlik(config).then((qlik) => {
  console.log(qlik);
    // It's comming list of datas
  console.log(QSProps);
})

  return (
    <div className="Qlik">
      Qlik connected
    </div>
  );
}

export default GetQlik;
```


## Usage  Open Qlik Application

```jsx
import { QSApp, QSProps } from 'ts-qlik'

function OpenApp(props) {

  const config = {
    "host": "localhost",
    "port": 80,
    "prefix": "/proxy/",
    "isSecure": false
};

let options = ['all'];

// options is not mandatory 
// What are the properties needed in apps. Just parse the function nale in array format
// like ['sheet', 'dimensionList', 'measureList', 'bookmark', 'filters', 'fields']

QSApp(appid, config, options).then((app) => {
  console.log(app);
  // It's comming list of datas
  console.log(QSProps);
})


  return (
    <div className="Qlik">
      Open Qlik App
    </div>
  );
}

export default OpenApp;
```

## License

MIT © [Ranjithkumar](https://github.com/Ranjithkumar-M)
