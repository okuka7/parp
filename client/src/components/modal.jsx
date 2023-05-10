import React from 'react';

export default function Modal() {
	return (
		<div className="logInbox">
			<div className="wrapperLog">
				<div className="form-box login">
					<h2>Login</h2>
					<form action="#">
						<div className="input-box">
							<span className="icon"></span>
							<input type="email" required />
							<label>Email</label>
						</div>
						<div className="input-box">
							<span className="icon"></span>
							<input type="password" required />
							<label>Password</label>
						</div>
						<div className="remember-forgot">
							<label><input type="checkbox"/>Remember me</label>
							<p><a href="#">비밀번호를 잊으셨나요?</a></p>
						</div>
						<button type="submit" className="btn">Login</button>
						<div className="login-register">
							<p>아이디가 없으신가요?
							<a href="#" className="register-link" onClick={regiLink}>회원가입</a></p>
						</div>
					</form>
				</div>
				<div className="form-box register">
					<h2>회원가입</h2>
					<form action="#">
						<div className="input-box">
							<span className="icon"></span>
							<input type="text" required />
							<label>Username</label>
						</div>
						<div className="input-box">
							<span className="icon"></span>
							<input type="email" required />
							<label>Email</label>
						</div>
						<div className="input-box">
							<span className="icon"></span>
							<input type="password" required />
							<label>Password</label>
						</div>
						<div className="remember-forgot">
							<label><input type="checkbox"/>이용약관에 동의합니다.</label>
						</div>
						<button type="submit" className="btn">회원가입</button>
						<div className="login-register">
							<p>이미 아이디가 있으신가요?
							<a href="#" className="login-link" onClick={logLink}>Login</a></p>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

	function regiLink() {
		document.querySelector('.wrapperLog').classList.add('active');
	}
	function logLink() {
		const wrapper = document.querySelector('.wrapperLog');
		wrapper.classList.remove('active');
	}
