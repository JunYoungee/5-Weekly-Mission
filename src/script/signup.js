import { email, pw, checkEmail, APIPATH, emailNotice, passwordNotice } from './common.js';
//비밀번호 확인 input
const checkPassword = document.querySelector('.verify-password');
const verifyNotice = document.querySelector('.verify-notice');
// 회원가입 button
const signupBtn = document.querySelector('.signup-btn');
// 비밀번호 눈 아이콘
const passwordEyes = document.querySelector('.password-eyes');
const verifyEyes = document.querySelector('.verify-eyes');

//윈도우 로드시에 localStroge에 accessToken이 있을 때 folder페이지로 이동
window.onload = function () {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        location.href = './folder.html';
    }
};

//emailInput focus-out시 이벤트 함수
const handleIdFocusOut = (e) => {
    if (e.target.value === '') {
        email.classList.add('active');
        emailNotice.textContent = '이메일을 입력해주세요.';
    } else if (!checkEmail.test(e.target.value)) {
        email.classList.add('active');
        emailNotice.textContent = '올바른 이메일 주소가 아닙니다.';
    } else {
        email.classList.remove('active');
        emailNotice.textContent = '';
    }
};

// passwordInput focus-out시 이벤트 함수
const handlePasswordFocusOut = (e) => {
    if (e.target.value === '') {
        pw.classList.add('active');
        passwordNotice.textContent = '비밀번호를 입력비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.';
    } else {
        pw.classList.remove('active');
        passwordNotice.textContent = '';
    }
};

const verifyPassword = (e) => {
    if (pw.value !== checkPassword.value) {
        checkPassword.classList.add('active');
        verifyNotice.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
        checkPassword.classList.remove('active');
        verifyNotice.textContent = '';
    }
};

//이메일 중복체크
const checkEmailDuplication = async (e) => {
    try {
        const response = await fetch(`${APIPATH}/api/check-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
            }),
        });

        if (!response.ok) {
            throw new Error('이미 사용중인 이메일입니다.');
        }
        attemptSignup();
    } catch (error) {
        email.classList.add('active');
        emailNotice.textContent = '이미 사용중인 이메일입니다.';
        console.error(error);
    }
};

//회원가입
const attemptSignup = async (e) => {
    try {
        const response = await fetch(`${APIPATH}/api/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: pw.value,
            }),
        });

        if (!response.ok) {
            throw new Error('이미 사용중인 이메일입니다.');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);

        location.href = '../folder.html';
    } catch (error) {
        console.error(error);
    }
};

const enterSignup = (e) => {
    if (e.key === 'Enter') {
        checkEmailDuplication();
    }
};

//눈 아이콘 눌렀을 때 비밀번호 보이기
const showPassword = (e) => {
    const clickCheck = e.target.alt;
    if (clickCheck == '비밀번호') {
        if (pw.type == 'password') {
            pw.type = 'text';
            passwordEyes.setAttribute('src', '/src/img/eyes.svg');
        } else {
            pw.type = 'password';
            passwordEyes.setAttribute('src', '/src/img/noeyes.svg');
        }
    } else if (clickCheck == '비밀번호 확인') {
        if (verifyPassword.type == 'password') {
            verifyPassword.type = 'text';
            verifyEyes.setAttribute('src', '/src/img/eyes.svg');
        } else {
            verifyPassword.type = 'password';
            verifyEyes.setAttribute('src', '/src/img/noeyes.svg');
        }
    }
};

// emailInput focus-out시 이벤트 함수 적용
email.addEventListener('focusout', handleIdFocusOut);
// password focus-out시 이벤트 함수 적용
pw.addEventListener('focusout', handlePasswordFocusOut);

// 비밀번호 input와 비밀번호 확인 input 태그의 value값 확인 이벤트 함수 적용
checkPassword.addEventListener('focusout', verifyPassword);

// 이메일 중복체크
signupBtn.addEventListener('click', checkEmailDuplication);

// 회원가입 시 Enter 클릭 이벤트 함수 적용
email.addEventListener('keypress', enterSignup);
pw.addEventListener('keypress', enterSignup);
verifyPassword.addEventListener('keypress', enterSignup);

// 눈 아이콘 클릭 시 password 보이게 만드는 이벤트 함수 적용
passwordEyes.addEventListener('click', showPassword);
verifyEyes.addEventListener('click', showPassword);
