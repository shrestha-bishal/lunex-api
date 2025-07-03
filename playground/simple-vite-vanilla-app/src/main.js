import './style.css'
import LunexClient from 'lunex-http'

document.querySelector('#app').innerHTML = `Hello World`

const client = new LunexClient('https://api.example.com/')
console.log('LunexClient created')
let response = await client.getAsync('users')
console.log(response)