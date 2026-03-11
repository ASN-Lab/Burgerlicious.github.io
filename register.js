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
    const namaInput        = getEl('nama');
    const emailInput       = getEl('email');
    const passwordInput    = getEl('password');
    const confirmPassInput = getEl('confirmPassword');
    const showPassCheck    = getEl('showPassword');
    const submitBtn        = getEl('btnRegister');
    const namaError        = getEl('namaError');
    const emailError       = getEl('emailError');
    const passwordError    = getEl('passwordError');
    const confirmPassError = getEl('confirmPasswordError');
    const formMessage      = getEl('formMessage');
    showPassCheck.addEventListener('change', function () {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type    = type;
        confirmPassInput.type = type;
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
        clearError(namaError);
        clearError(emailError);
        clearError(passwordError);
        clearError(confirmPassError);
        clearFormMessage();
        const nama        = namaInput.value.trim();
        const email       = emailInput.value.trim();
        const password    = passwordInput.value;
        const confirmPass = confirmPassInput.value;
        if (!nama) {
            showError(namaError, 'Nama lengkap tidak boleh kosong.');
            valid = false;
        } else if (nama.length < 3) {
            showError(namaError, 'Nama minimal 3 karakter.');
            valid = false;
        }
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
        if (!confirmPass) {
            showError(confirmPassError, 'Konfirmasi password tidak boleh kosong.');
            valid = false;
        } else if (password !== confirmPass) {
            showError(confirmPassError, 'Password tidak cocok.');
            valid = false;
        }
        return valid;
    }
    namaInput.addEventListener('input', () => clearError(namaError));
    emailInput.addEventListener('input', () => clearError(emailError));
    passwordInput.addEventListener('input', () => clearError(passwordError));
    confirmPassInput.addEventListener('input', () => clearError(confirmPassError));
    submitBtn.addEventListener('click', function () {
        if (!validate()) return;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Loading...';
        setTimeout(() => {
            showFormMessage('Registrasi berhasil! Silakan login.', 'success');
            setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        }, 1000);
    });
});