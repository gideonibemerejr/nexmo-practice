const numberInput = document.getElementById('number')
const textInput = document.getElementById('message')
const button = document.getElementById('button')
const response = document.querySelector('.response')

button.addEventListener('click', send, false)

function send() {
  const number = numberInput.value.replace(/\D/g, '')
  const text = textInput.value

  fetch('/', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ number: number, text: text })
  })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
