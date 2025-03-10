import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // تنظيف الأخطاء السابقة

        try {
            if (!email || !password) {
                throw new Error("All fields are required!");
            }
            
            console.log({ email, password });

            // مثال: تفريغ الحقول بعد الإرسال
            setEmail("");
            setPassword("");

            // مثال: إعادة توجيه بعد النجاح
            // navigate("/dashboard");  // لو كنتِ تستخدمين useNavigate من react-router-dom
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                
                <p className="mt-4 text-center">
                    Don't have an account?{" "}
                        Sign Up
                    
                </p>
            </div>
        </div>
    );
};

export default Login;
