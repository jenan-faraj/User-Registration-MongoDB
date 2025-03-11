import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // تغيير اسم الدالة لتجنب التعارض
  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        { withCredentials: true } // إضافة هذا الخيار لإرسال الكوكيز مع الطلب
      );
      console.log(response.data);
      login(response.data); // تنفيذ login من context مع بيانات المستخدم
      navigate("/profile"); // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول
    } catch (error) {
      setError(error.response?.data?.error || "فشل تسجيل الدخول، يرجى التحقق من بياناتك");
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 rtl">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">تسجيل الدخول</h2>
        
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md border border-red-200 text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="mr-2 block text-sm text-gray-700">
                تذكرني
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
          
          <div className="text-center text-sm text-gray-600 mt-4">
            ليس لديك حساب؟{" "}
            <span 
              onClick={() => navigate("/register")} 
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              إنشاء حساب جديد
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;