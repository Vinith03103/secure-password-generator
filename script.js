function updateLength() {
  document.getElementById('lengthValue').textContent =
    document.getElementById('length').value;
}

function generatePassword() {
  const length = document.getElementById('length').value;
  const includeUpper = document.getElementById('uppercase').checked;
  const includeLower = document.getElementById('lowercase').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeSymbols = document.getElementById('symbols').checked;

  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

  let allowedChars = '';
  if (includeUpper) allowedChars += upper;
  if (includeLower) allowedChars += lower;
  if (includeNumbers) allowedChars += numbers;
  if (includeSymbols) allowedChars += symbols;

  if (allowedChars.length === 0) {
    alert("Please select at least one character type.");
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  }

  document.getElementById('password').value = password;
  evaluateStrength(password);
}

function copyPassword() {
  const passwordField = document.getElementById('password');
  passwordField.select();
  passwordField.setSelectionRange(0, 99999); // for mobile
  document.execCommand('copy');
  alert('Password copied to clipboard!');
}

function evaluateStrength(password) {
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) {
    strengthBar.style.background = "red";
    strengthBar.style.width = "33%";
    strengthText.textContent = "Strength: Weak";
  } else if (strength === 3 || strength === 4) {
    strengthBar.style.background = "orange";
    strengthBar.style.width = "66%";
    strengthText.textContent = "Strength: Medium";
  } else if (strength === 5) {
    strengthBar.style.background = "green";
    strengthBar.style.width = "100%";
    strengthText.textContent = "Strength: Strong";
  }
}
