import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Store/hooks";
import { setUser } from "../Store/userSlice";
import { loginUser } from "../Services/UserService";
import ResetPassword from './ResetPassword';

interface LoginProps {
  onSwitchToSignup: () => void;
  onSwitchToResetPassword: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignup, onSwitchToResetPassword }) => {
  // Check for corrupted Redux persist state on component mount
  React.useEffect(() => {
    try {
      const persistedState = localStorage.getItem('persist:root');
      if (persistedState) {
        const parsed = JSON.parse(persistedState);
        // Check if user state is corrupted (encrypted string instead of object)
        if (parsed.user && typeof parsed.user === 'string' && parsed.user.startsWith('U2FsdGVkX1')) {
          console.log('🔧 Detected corrupted Redux persist state, clearing...');
          localStorage.clear();
          window.location.reload();
          return;
        }
      }
    } catch (e) {
      console.log('🔧 Error checking persist state, clearing localStorage...');
      localStorage.clear();
      window.location.reload();
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "info" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  // Redux hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showMessage = (msg: string, type: "error" | "success" | "info") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation - check if fields are filled
    if (!formData.email || !formData.password) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    setIsLoading(true);
    showMessage("Logging in...", "info");

    try {
      console.log('🔄 Starting login process...');
      
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      console.log("Login Attempt:", loginData);

      const result = await loginUser(loginData);
      console.log('✅ Login API response:', result);

      // Extract token and user data from the API response
      // Check for different possible token field names
      const token = result.token || result.accessToken || result.authToken || result.jwt;
      const user = result.user || result.userData || result;

      // If no token is provided by the API, we'll create a simple session
      // You should ask your backend team to include a proper JWT token
      if (!token) {
        console.log('⚠️ No token in API response, creating session without token');
        console.log('API Response structure:', Object.keys(result));
        
        // For now, we'll use the user ID as a basic identifier
        // This is NOT secure for production - you need a proper JWT token
        const sessionId = `user_${result.id}_${Date.now()}`;
        localStorage.setItem('authToken', sessionId);
        localStorage.setItem('userId', result.id?.toString() || '');
        
        console.log('Created session with ID:', sessionId);
      } else {
        // Store the actual token
        localStorage.setItem('authToken', token);
      }

      console.log('🔄 Setting Redux state...');
      console.log('Token/Session:', token || `session for user ${result.id}`);
      console.log('User:', user);

      // Store token in localStorage for persistence (already done above)
      
      // Set user profile in Redux
      dispatch(setUser(user));

      console.log('✅ Login state updated successfully');
      showMessage("Login successful! Redirecting...", "success");

      // Use React Router navigation
      setTimeout(() => {
        console.log('🔄 Navigating to find-jobs...');
        navigate('/find-jobs');
      }, 1000);

    } catch (error: any) {
      console.error('❌ Login error:', error);
      console.log('Login failed, handling error state...');
      
      // Check if this is a Redux persist error and clear localStorage if needed
      if (error.message && error.message.includes('Cannot create property')) {
        console.log('🔧 Detected Redux persist error, clearing localStorage...');
        localStorage.clear();
        window.location.reload();
        return;
      }
      
      const errorMessage = error?.errorMessage || error?.message || "Login failed. Please try again.";
      showMessage(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const openReset = () => setResetOpen(true);
  const closeReset = () => setResetOpen(false);

  return (
    <>
      <motion.form
        key="login"
        initial={{ x: 500, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -500, opacity: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-mine-shaft-950/70 p-8 rounded-xl border border-mine-shaft-850 shadow-2xl backdrop-blur-sm"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Welcome Back!</h2>
          <p className="text-sm text-gray-400">Sign in to your Jobluu account.</p>
        </div>

        {/* Message Notification */}
        {message && (
          <div
            className={`px-4 py-2 rounded-lg text-sm font-medium animate-fade-in-down ${
              messageType === "error"
                ? "bg-red-600 text-white"
                : messageType === "success"
                ? "bg-green-600 text-white"
                : messageType === "info"
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-white"
            } shadow-md`}
          >
            {message}
          </div>
        )}

        {/* Input - Email */}
        <div>
          <label htmlFor="login-email" className="text-sm text-gray-300 mb-1 block">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-transparent border border-mine-shaft-850 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          />
        </div>

        {/* Input - Password */}
        <div>
          <label htmlFor="login-password" className="text-sm text-gray-300 mb-1 block">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-transparent border border-mine-shaft-850 rounded-md text-white placeholder-gray-500 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 cursor-pointer transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 font-semibold rounded-md transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
            isLoading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-yellow-500 text-black hover:bg-yellow-400"
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={openReset}
            className="text-sm text-bright-sun-400 hover:underline cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>

        {/* Link to Signup Page */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-yellow-400 underline hover:text-yellow-300"
          >
            Sign Up
          </button>
        </p>
      </motion.form>

      {/* Reset Password Modal */}
      <ResetPassword opened={resetOpen} close={closeReset} />
    </>
  );
};

export default Login;