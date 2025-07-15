import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Toggles the visibility of the password input field.
  const togglePassword = () => setShowPassword((prev) => !prev);

  // Handles changes to input fields and updates the form data state.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handles the form submission for login.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend for authentication.
    console.log("Login Attempt:", formData);

    // Simulate an asynchronous login process.
    setMessage("Logging in...");
    setMessageType("info"); // A new message type for ongoing process
    setTimeout(() => {
      // Simulate successful login
      setMessage("Login successful!");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
        // In a real app, you'd redirect the user or update global authentication state here.
      }, 3000);
    }, 1500); // Simulate network delay
  };

  return (
    // motion.form is used for Framer Motion animations.
    <motion.form
      key="login" // Unique key is crucial for AnimatePresence to track component changes.
      initial={{ x: 500, opacity: 0 }} // Starts 500px to the right and invisible.
      animate={{ x: 0, opacity: 1 }}    // Animates to its final position (x: 0) and full opacity.
      exit={{ x: -500, opacity: 0 }}    // When exiting, animates 500px to the left and fades out.
      transition={{ duration: 0.5 }}    // Animation duration of 0.5 seconds.
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-mine-shaft-950/70 p-8 rounded-xl border border-mine-shaft-850 shadow-2xl backdrop-blur-sm"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Welcome Back!</h2>
        <p className="text-sm text-gray-400">Sign in to your JobHook account.</p>
      </div>

      {/* Message Notification */}
      {message && (
        <div
          className={`px-4 py-2 rounded-lg text-sm font-medium animate-fade-in-down
            ${messageType === "error" ? "bg-red-600" : messageType === "success" ? "bg-green-600" : "bg-blue-600"} shadow-md`}
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
          <span
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Login
      </button>

      {/* Link to Signup Page */}
      <p className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <a
          href="#"
          onClick={onSwitchToSignup} // Calls the parent's function to switch to signup form.
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          Sign Up
        </a>
      </p>
    </motion.form>
  );
};

export default Login;
