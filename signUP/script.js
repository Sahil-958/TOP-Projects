const strengthMeter = document.getElementById("strengthMeter");
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
passwordInput.addEventListener('input', e => updatePasswordStrength(e));
confirmPasswordInput.addEventListener('input', e => confirmPasswordHandler(e));
passwordInput.addEventListener('blur', () => {
    strengthMeter.classList.add('hidden');
});
document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    submitHandler();
});

const passCont = document.querySelector(".passwordCont");
const errMsg = document.createElement('p');
errMsg.textContent = 'Password Mismatched';
errMsg.setAttribute('id', 'errMsg');
errMsg.classList.add('hidden');
errMsg.style.color = 'var(--error)';
passCont.appendChild(errMsg);

function updatePasswordStrength(e) {
    errMsg.classList.add('hidden');
    let password = e.target.value;
    let length = password.length;
    if (length > 0) {
        strengthMeter.classList.remove('hidden');
        strengthMeter.classList.add('meter');
    } else {
        strengthMeter.classList.add('hidden');

    }
    strengthMeter.setAttribute('value', length);
}


function confirmPasswordHandler(e) {
    matchPasswords() ? errMsg.classList.add('hidden') : errMsg.classList.remove('hidden');
}

function matchPasswords() {
    return passwordInput.value === confirmPasswordInput.value ? true : false;
}

function submitHandler() {
    if (matchPasswords()) {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    }
}