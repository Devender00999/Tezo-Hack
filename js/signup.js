const scriptURL = 'https://script.google.com/macros/s/AKfycbyHSmUruqAXRPpVf3gD5bJKq5gG7Tv_51mughQyKr3lldZWTu8ltcQ8FLoAsWa8JKNc/exec'
const form = document.forms['google-form']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(() => {
        window.location.href = "./listener/";
    })
    .catch(error => console.error('Error!', error.message))
})