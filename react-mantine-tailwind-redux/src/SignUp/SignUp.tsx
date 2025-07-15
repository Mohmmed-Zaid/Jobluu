import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface SignupProps {
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Toggles visibility for the password field.
  const togglePassword = () => setShowPassword((prev) => !prev);
  // Toggles visibility for the confirm password field.
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // Handles input changes for all form fields.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox separately.
    }));
  };

  // Handles the form submission for signup.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Password matching validation.
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return;
    }

    // In a real application, you would send this data to your backend to register the user.
    console.log("Signup Attempt:", formData);
    setMessage("Signing up...");
    setMessageType("info"); // A new message type for ongoing process

    // Simulate an asynchronous signup process.
    setTimeout(() => {
      setMessage("Signup successful!");
      setMessageType("success");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
        onSwitchToLogin(); // Automatically switch to login after successful signup.
      }, 3000);
    }, 1500); // Simulate network delay
  };

  return (
    // motion.form is used for Framer Motion animations.
    <motion.form
      key="signup" // Unique key is crucial for AnimatePresence to track component changes.
      initial={{ x: -500, opacity: 0 }} // Starts 500px to the left and invisible.
      animate={{ x: 0, opacity: 1 }}    // Animates to its final position (x: 0) and full opacity.
      exit={{ x: 500, opacity: 0 }}     // When exiting, animates 500px to the right and fades out.
      transition={{ duration: 0.5 }}    // Animation duration of 0.5 seconds.
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-mine-shaft-950/70 p-8 rounded-xl border border-mine-shaft-850 shadow-2xl backdrop-blur-sm"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Create Account</h2>
        <p className="text-sm text-gray-400">Start your journey with JobHook today.</p>
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

      {/* Input - Full Name */}
      <div>
        <label htmlFor="fullName" className="text-sm text-gray-300 mb-1 block">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Your full name"
          className="w-full px-4 py-3 bg-transparent border border-mine-shaft-850 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
        />
      </div>

      {/* Input - Email */}
      <div>
        <label htmlFor="email" className="text-sm text-gray-300 mb-1 block">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
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
        <label htmlFor="password" className="text-sm text-gray-300 mb-1 block">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
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

      {/* Input - Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="text-sm text-gray-300 mb-1 block">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-transparent border border-mine-shaft-850 rounded-md text-white placeholder-gray-500 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
          />
          <span
            onClick={toggleConfirmPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>
      </div>

      {/* Checkbox - Terms */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="termsAccepted"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          required
          className="accent-yellow-400 w-4 h-4 rounded-sm focus:ring-2 focus:ring-yellow-400"
        />
        <label htmlFor="termsAccepted" className="text-sm text-gray-300">
          I accept the{" "}
          <a href="#" className="text-yellow-400 underline hover:text-yellow-300">
            terms & conditions
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Sign Up
      </button>

      {/* Link to Login Page */}
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a
          href="#"
          onClick={onSwitchToLogin} // Calls the parent's function to switch to login form.
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          Login
        </a>
      </p>
    </motion.form>
  );
};

export default Signup;
