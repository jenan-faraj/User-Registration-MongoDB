import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // طلب البيانات المحمية من السيرفر
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/profile", {
          withCredentials: true, // لإرسال الكوكيز مع الطلب
        });
        setUser(response.data); // حفظ بيانات المستخدم المسترجعة
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
        setError("فشل في تحميل بيانات الملف الشخصي. يرجى تسجيل الدخول مرة أخرى.");
        
        // في حالة وجود خطأ 401 (غير مصرح)، انتقل إلى صفحة تسجيل الدخول
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 rtl">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md border border-red-200">
              {error}
            </div>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        ) : user ? (
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-3xl font-bold">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">مرحباً، {user.username}</h1>
            <p className="text-gray-600 mb-6">{user.email}</p>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm text-gray-500">تاريخ الانضمام</h3>
                  <p className="font-medium">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('ar-EG') 
                      : 'غير متاح'}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm text-gray-500">آخر تسجيل دخول</h3>
                  <p className="font-medium">
                    {user.lastLogin 
                      ? new Date(user.lastLogin).toLocaleDateString('ar-EG') 
                      : 'غير متاح'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mt-6">
              <button 
                onClick={() => navigate("/edit-profile")} 
                className="w-full py-2 px-4 bg-gray-100 text-gray-800 font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                تعديل الملف الشخصي
              </button>
              
              <button 
                onClick={handleLogout} 
                className="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">لم يتم العثور على بيانات المستخدم</p>
        )}
      </div>
    </div>
  );
};

export default Profile;