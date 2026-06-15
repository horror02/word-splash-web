import React, { useState } from "react";
import toast from "react-hot-toast";
import useLoginHook from "./hooks/useLoginHook";
import useAuthStore from "../../setup/stores/AuthStore";
import { jwtDecode } from "jwt-decode";
import useUserStore from "../../setup/stores/UserStore";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Header from "../../reusable-components/header/Header";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { getAuthentication, errorMessage, isLoading } = useLoginHook();
    const authLogin = useAuthStore((state) => state.authLogin);
    const { setUserData } = useUserStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authentication = await getAuthentication(username, password);

        if (authentication?.token) {
            authLogin(authentication.token, authentication.expiresIn);
            const decodedToken = jwtDecode(authentication.token);
            setUserData(decodedToken);
            navigate("/admin/dashboard");
            toast.success("Login successful!");
        }

        if (errorMessage) {
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
            <Header />
            <div className="flex flex-1 items-center justify-center px-4">
                <div className="max-w-md w-full p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username or email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-medium mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-semibold py-2 rounded-lg transition-colors ${
                                isLoading
                                    ? "bg-purple-300 cursor-not-allowed"
                                    : "bg-purple-500 hover:bg-purple-600 text-white"
                            }`}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>

                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center">
                                {errorMessage}
                            </p>
                        )}

                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm text-purple-500 hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
