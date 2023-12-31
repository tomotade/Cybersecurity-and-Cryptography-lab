const loginForm = document.querySelector('#login-form')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const messageDiv = document.querySelector('#message')
const loginURL = `http://localhost:4000/login`

const sendLogin = body => {
  axios.post(loginURL, body)
    .then((res) => {
      if (res.data.success) {
        console.log('login successful');
        displayDestinyUponLogin(res.data.destiny);
      } else {
        console.log('no axios error, but login not successful: bad username or password');
        alert(res.data.message);
      }
    })
    .catch(err => {
      console.log('axios error:');
      console.log(err);
    })
}

function submitHandler(event) {
  event.preventDefault();

  let body = {
    email: emailInput.value,
    password: passwordInput.value
  }

  emailInput.value = "";
  passwordInput.value = "";

  sendLogin(body);
}

loginForm.addEventListener('submit', submitHandler);

function displayDestinyUponLogin(destiny) {
  const messageCenterElement = document.createElement('div');
  messageCenterElement.innerHTML = `<p class="destiny-intro">Your final destiny is to</p><p class="destiny">${destiny}</p>`;
  messageDiv.appendChild(messageCenterElement);
}
