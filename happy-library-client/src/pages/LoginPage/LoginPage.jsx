import axios from "axios";
import { useDispatch } from "react-redux";

import { login } from "../../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();

  // 로그인 로직 수정 요망
  // dispatch(login({ username: email.value }));
  const loginRequest = async (e) => {
    e.preventDefault();
  
    try {
      const email = document.getElementById("email");
      const password = document.getElementById("password");
  
      if (!email.value) {
        alert("이메일을 입력하세요.");
        return;
      } else if (!password.value) {
        alert("비밀번호를 입력하세요.");
        return;
      }
  
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        email: email.value,
        password: password.value,
      });

      const { type, content, redir } = res.data; 
      if (type === "redirect") {
        alert("로그인 성공");
        // 리다이렉트 코드
      } else {
        alert(`로그인 실패: ${content}`);
        email.value = "";
        password.value = "";
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>로그인 페이지</h1>
      <form id="login-form">
        <fieldset>
          <legend>로그인 폼</legend>
          <label>ID</label>
          <input
            id="email"
            type="email"
            placeholder="이메일"
          />
          <label>PW</label>
          <input
            id="password"
            type="text"
            placeholder="패스워드"
          />
          <button onClick={loginRequest}>로그인</button>
        </fieldset>
      </form>
    </>
  )
}

export default LoginPage;