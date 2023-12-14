// import Message from './Message';

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
  // message
}) => {
  return (
    <>
      {/* {message && <Message message={message} />} */}
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
