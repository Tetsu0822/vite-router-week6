
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  // 使用環境變數驗證帳號密碼
  const onSubmit = (data) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (data.username === adminEmail && data.password === adminPassword) {
      setLoginError("");
      navigate("/admin/products");
    } else {
      setLoginError("帳號或密碼錯誤");
    }
  };

  return (
    <div className="login-container" style={{maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #E3879F', borderRadius: 16}}>
      <h2 className="h4 text-primary-900 mb-2">後台登入</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom: 16}}>
          <label>帳號（Email）</label>
          <input
            type="email"
            {...register("username", {
              required: "請輸入 Email",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email 格式不正確"
              }
            })}
            style={{width: '100%', padding: 8, marginTop: 4}}
          />
          {errors.username && <p style={{color: 'red'}}>{errors.username.message}</p>}
        </div>
        <div style={{marginBottom: 16}}>
          <label>密碼</label>
          <input
            type="password"
            {...register("password", { required: "請輸入密碼" })}
            style={{width: '100%', padding: 8, marginTop: 4}}
          />
          {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
        </div>
        {loginError && <p style={{color: 'red', marginBottom: 16}}>{loginError}</p>}
        <button type="submit" style={{width: '100%', padding: 10, background: '#E3879F', color: '#fff', border: 'none', borderRadius: 0}}>登入</button>
      </form>
    </div>
  );
}

export default Login;