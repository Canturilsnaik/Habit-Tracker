// const axios = require('axios');

// axios.get('localhost:3000/', (req, res) => {
//   console.log(res)
// })

const test = fetch('localhost:3000/').then( response => console.log(response.json()))