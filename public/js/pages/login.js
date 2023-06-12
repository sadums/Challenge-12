// Sign up form HTML elements
const signUpForm = document.getElementById('sign-up-form');
const signUpUsername = document.getElementById('sign-up-username');
const signUpPassword = document.getElementById('sign-up-password');
const signUpConfirmPassword = document.getElementById('sign-up-confirm-password');

const signUpBtn = document.getElementById('submit-sign-up');
const switchLoginBtn = document.getElementById('switch-login');

// Login form HTML elements
const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');

const loginBtn = document.getElementById('submit-login');
const switchSignUpBtn = document.getElementById('switch-sign-up');



// Login form events
loginBtn.addEventListener('click', (event) => {
    // store inputted values as variables
    const username = loginUsername.value;
    const password = loginPassword.value;

    console.log(username, password);
});
switchSignUpBtn.addEventListener('click', (event) => {
    // display sign up form and hide login form
    loginForm.setAttribute('style', 'display: none');
    signUpForm.setAttribute('style', 'display: block');
});


// Sign up form events
signUpBtn.addEventListener('click', (event) => {
    // store inputted values as variables
    const username = signUpUsername.value;
    const password = signUpPassword.value;
    const confirmPassword = signUpConfirmPassword.value;

    console.log(username, password, confirmPassword);
});
switchLoginBtn.addEventListener('click', (event) => {
    // display sign up form and hide login form
    signUpForm.setAttribute('style', 'display: none');
    loginForm.setAttribute('style', 'display: block');
});