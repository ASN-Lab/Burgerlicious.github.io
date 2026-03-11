document.addEventListener('DOMContentLoaded', function () {
    function getEl(id) {
        const els = document.querySelectorAll('#' + id);
        for (let el of els) {
            let node = el;
            let visible = true;
            while (node && node !== document.body) {
                if (getComputedStyle(node).display === 'none') {
                    visible = false;
                    break;
                }
                node = node.parentElement;
            }
            if (visible) return el;
        }
        return els[0];
    }
    const emailInput    = getEl('email');
    const passwordInput = getEl('password');
    const showPassCheck = getEl('showPassword');
    const submitBtn     = getEl('btnLogin');
    const emailError    = getEl('emailError');
    const passwordError = getEl('passwordError');
    const formMessage   = getEl('formMessage');
    showPassCheck.addEventListener('change', function () {
        passwordInput.type = this.checked ? 'text' : 'password';
    });
    function showError(element, message) {
        element.textContent = message;
        element.classList.remove('hidden');
    }
    function clearError(element) {
        element.textContent = '';
        element.classList.add('hidden');
    }
    function showFormMessage(message, type = 'error') {
        formMessage.textContent = message;
        formMessage.className = 'text-sm text-center px-4 py-2 rounded-lg ';
        formMessage.className += type === 'success'
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700';
        formMessage.classList.remove('hidden');
    }
    function clearFormMessage() {
        formMessage.textContent = '';
        formMessage.classList.add('hidden');
    }
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function validate() {
        let valid = true;
        clearError(emailError);
        clearError(passwordError);
        clearFormMessage();
        const email    = emailInput.value.trim();
        const password = passwordInput.value;
        if (!email) {
            showError(emailError, 'Email tidak boleh kosong.');
            valid = false;
        } else if (!validateEmail(email)) {
            showError(emailError, 'Format email tidak valid.');
            valid = false;
        }
        if (!password) {
            showError(passwordError, 'Password tidak boleh kosong.');
            valid = false;
        } else if (password.length < 6) {
            showError(passwordError, 'Password minimal 6 karakter.');
            valid = false;
        }
        return valid;
    }
    emailInput.addEventListener('input', () => clearError(emailError));
    passwordInput.addEventListener('input', () => clearError(passwordError));
    submitBtn.addEventListener('click', function () {
        if (!validate()) return;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Loading...';
        setTimeout(() => {
            const dummyEmail    = 'test@gmail.com';
            const dummyPassword = 'password123';
            if (emailInput.value.trim() === dummyEmail && passwordInput.value === dummyPassword) {
                showFormMessage('Login berhasil! Mengalihkan...', 'success');
                setTimeout(() => { window.location.href = 'index.html'; }, 1500);
            } else {
                showFormMessage('Email atau password salah.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'SIGN IN';
            }
        }, 1000);
    });
});