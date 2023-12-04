import React from 'react';
import axios from 'axios';

function JoinPage() {
  const joinRequest = async (e) => {
    e.preventDefault();
  
    try {
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const username = document.getElementById('username');
      const birthday = document.getElementById('birthday');
      const mobileNumber = document.getElementById('mobile-number');

      const userData = [email, password, username, birthday, mobileNumber];
      const message = [
        '이메일을 입력하세요.',
        '비밀번호를 입력하세요.',
        '이름을 입력하세요.',
        '생년월일을 선택하세요.',
        '휴대폰 번호을 입력하세요.',
      ]
      for (let i = 0; i < userData.length; i++) {
        if (!userData[i]) {
          alert(message[i]);
          return;
        }
      }

      const res = await axios.post('http://localhost:8000/auth/join', {
        email: email.value,
        password: password.value,
        username: username.value,
        birthday: birthday.value,
        mobile_number: mobileNumber.value,
      });

      const { type, content, redir } = res.data;
      if (type === 'redirect') {
        alert('회원가입 성공');
        // 리다이렉트 코드
      } else {
        alert(`회원가입 실패: ${content}`);
        userData.forEach(data => data.value = '');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>회원가입 페이지</h1>
      <form id='join-form'>
        <fieldset>
          <legend>회원가입 폼</legend>
          <label>email</label>
          <input
            id='email'
            type='text'
            placeholder='이메일'
          />
          <label>password</label>
          <input
            id='password'
            type='text'
            placeholder='패스워드'
          />
          <label>username</label>
          <input
            id='username'
            type='text'
            placeholder='사용자 이름'
          />
          <label>birthday</label>
          <input
            id='birthday'
            type='date'
          />
          <label>mobile_number</label>
          <input
            id='mobile-number'
            type='text'
            placeholder='010-0000-0000'
          />
          <button onClick={joinRequest}>회원가입</button>
        </fieldset>
      </form>
    </>
  );
}

export default JoinPage;