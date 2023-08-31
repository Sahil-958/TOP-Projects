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

const floatingButton = document.createElement('a');
floatingButton.classList.add('floatingButton');
floatingButton.setAttribute('href', '#bottom');
floatingButton.setAttribute('id', 'floatingButton');
floatingButton.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 m-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>';
let leftCont=document.querySelector('.left-cont');
leftCont.appendChild(floatingButton);

let scrollListener = window.addEventListener('scroll', () => {
    floatingButton.style.display='none';
}, { once: true });

floatingButton.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
        behavior: 'smooth'
    });
    floatingButton.style.display='none';
});

