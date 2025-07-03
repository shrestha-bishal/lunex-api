import './style.css'
import RestClient from 'lunex-http'

document.querySelector('#app').innerHTML = `Hello World`

const client = new RestClient('https://api.example.com/')
console.log('RestClient created')
let response = await client.getAsync('users')
console.log(response)