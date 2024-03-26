// 이메일 input
const email = document.querySelector('.id');
const emailTag = document.querySelector('.email-tag');
// 비밀번호 input
const pw = document.querySelector('.password');
const passwordTag = document.querySelector('.password-tag');

const emailNotice = document.querySelector('.email-notice');
const passwordNotice = document.querySelector('.password-notice');
//이메일 유효성 검사
const checkEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+$/;

//서버 경로
const APIPATH = 'https://bootcamp-api.codeit.kr';

export { email, emailTag, pw, passwordTag, checkEmail, APIPATH, emailNotice, passwordNotice };
