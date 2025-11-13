// Simple form validation and submission (no server)
const form = document.getElementById('contactForm');
const resultBox = document.getElementById('result');


function showError(name, message){
const el = document.querySelector(`small.error[data-for="${name}"]`);
if(el) el.textContent = message;
}
function clearErrors(){
document.querySelectorAll('small.error').forEach(s => s.textContent = '');
}


form.addEventListener('submit', function(e){
e.preventDefault();
clearErrors();
resultBox.textContent = '';


const data = new FormData(form);
const name = data.get('name').trim();
const email = data.get('email').trim();
const password = data.get('password');
const message = data.get('message').trim();
const terms = data.get('terms');


let ok = true;
if(!name){ showError('name', 'Please enter your name.'); ok = false }
if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showError('email', 'Enter a valid email.'); ok = false }
if(!password || password.length < 6){ showError('password', 'Password must be at least 6 characters.'); ok = false }
if(!terms){ showError('terms', 'You must agree to the terms.'); ok = false }


if(!ok) return;


// Simulate successful submission
const out = {
name, email, message: message || null,
gender: data.get('gender'),
submittedAt: new Date().toISOString()
};


resultBox.textContent = 'Form submitted successfully! See object below.';
const pre = document.createElement('pre');
pre.style.marginTop = '8px';
pre.textContent = JSON.stringify(out, null, 2);
resultBox.appendChild(pre);


// Optionally reset the form after submission
// form.reset();
});


// Clear errors on input
form.addEventListener('input', (e) => {
const name = e.target.name;
if(name) showError(name, '');
});