const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
  const { email, password, username, birthday, mobile_number } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      const message = '이미 가입된 회원입니다.';
      return res.status(200).send({
        type: 'popUpMessage',
        content: message,
        redir: null, 
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      password: hash,
      username,
      birthday,
      mobile_number,
    });
    return res.status(201).send({
      type: 'redirect',
      content: null,
      redir: '/',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  // 로그인 전략 수행 => localStrategy.js
  passport.authenticate('local', (authError, user, info) => {
    console.log(authError, user, info);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(201).send({
        type: 'popUpMessage',
        content: info.message,
        redir: null,
      });
    }
    // req.login 메서드가 passport/index.js의 serializeUser를 호출하며 user 전달
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.status(201).json({
        type: 'redirect',
        content: null,
        redir: '/'
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  // logout 메서드가 req.user 객체와 req.session 객체를 제거
  req.logout(() => {
    res.status(200).send({
      type: 'OK',
      content: null,
      redir: '/login',
    });
  });
};