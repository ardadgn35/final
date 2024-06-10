function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;

    if (name === '' || email === '' || password === '' || repassword === '') {
        alert('All fields are required.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    if (password !== repassword) {
        alert('Passwords do not match.');
        return;
    }

    alert('Register Successfully');
}
