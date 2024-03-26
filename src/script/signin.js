import { email, emailTag, pw, passwordTag, checkEmail, APIPATH, emailNotice, passwordNotice } from './common.js';

// 로그인 button
const loginBtn = document.querySelector('.login-btn');
// 비밀번호 눈 아이콘
const passwordEyes = document.querySelector('.password-eyes');

//윈도우 로드시에 localStroge에 accessToken이 있을 때 folder페이지로 이동
window.onload = function () {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        location.href = './folder.html';
    }
};

//email-input focus-out시 이벤트 함수
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

// passwordCreateElement focus-out시 이벤트 함수
const handlePasswordFocusOut = (e) => {
    if (e.target.value === '') {
        pw.classList.add('active');
        passwordNotice.textContent = '비밀번호를 입력해주세요.';
    } else {
        pw.classList.remove('active');
        passwordNotice.textContent = '';
    }
};
// 로그인 함수
const attemptLogin = async (e) => {
    try {
        const response = await fetch(`${APIPATH}/api/sign-in`, {
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
            throw new Error('로그인 실패');
        }

        const data = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);
        location.href = '../folder.html';
    } catch (error) {
        email.classList.add('active');
        emailNotice.textContent = '이메일을 확인해주세요.';
        pw.classList.add('active');
        passwordNotice.textContent = '비밀번호를 확인해주세요.';
        console.error(error);
    }
};

//로그인 버튼 Enter키 적용
const enterLogin = (e) => {
    if (e.key === 'Enter') {
        attemptLogin();
    }
};

//눈 아이콘 눌렀을 때 비밀번호 보이기
const showPassword = () => {
    if (pw.type === 'password') {
        pw.type = 'text';
        passwordEyes.setAttribute('src', '/src/img/eyes.svg');
    } else {
        pw.type = 'password';
        passwordEyes.setAttribute('src', '/src/img/noeyes.svg');
    }
};

// email-input focus-out시 이벤트 함수 적용
email.addEventListener('focusout', handleIdFocusOut);
// password-input focus-out시 이벤트 함수 적용
pw.addEventListener('focusout', handlePasswordFocusOut);
// 로그인 이벤트 함수 적용
loginBtn.addEventListener('click', attemptLogin);
// 로그인 시 Enter키 이벤트 함수 적용
email.addEventListener('keypress', enterLogin);
pw.addEventListener('keypress', enterLogin);
// 눈 아이콘 클릭 시 password 보이게 만드는 이벤트 함수 적용
passwordEyes.addEventListener('click', showPassword);
