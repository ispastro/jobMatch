import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Login, RegisterUser } from './authSlice';

export default function LoginRegister() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seeker',
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(Login(formData));
    } else {
      dispatch(RegisterUser(formData));
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <div className="role-select">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="seeker"
                  checked={formData.role === 'seeker'}
                  onChange={handleChange}
                />
                Job Seeker
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="provider"
                  checked={formData.role === 'provider'}
                  onChange={handleChange}
                />
                Job Provider
              </label>
            </div>
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={status === 'loading'}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        {error && <p className="error">{error}</p>}
      </form>

      <p>{isLogin ? "Don't have an account?" : 'Already registered?'}</p>
      <button onClick={toggleForm} className="toggle-form-btn">
        {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
}
