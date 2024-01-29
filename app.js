const username = 'admin';
const password = 'admin';
const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Store the username and password in local storage
localStorage.setItem('username', username);
localStorage.setItem('password', password);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('username').value;
    const passInput = document.getElementById('password').value;

    if (userInput === username && passInput === password ){
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'resume.html';
            alert('login Successfully');
    } else {
        errorMessage.innerText = 'Invalid username/password';
    }
});

// Restrict user from going back to the login page

if (localStorage.getItem('loggedIn') === 'true') {
    window.location.href = 'resume.html';
}