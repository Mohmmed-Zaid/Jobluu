import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "../Services/UserService"; 

interface SignupProps {
  onSwitchToLogin: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: "APPLICANT" | "EMPLOYER";
  termsAccepted: boolean;
}

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "APPLICANT",
    termsAccepted: false,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "info" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  // Toggle password visibility
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle account type selection
  const handleAccountTypeChange = (accountType: "APPLICANT" | "EMPLOYER") => {
    setFormData((prev) => ({ ...prev, accountType }));
  };

  // Show message with auto-clear
  const showMessage = (msg: string, type: "error" | "success" | "info") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType(""); // Now "" is included in the type union
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      showMessage("Passwords do not match!", "error");
      return;
    }

    if (!formData.termsAccepted) {
      showMessage("Please accept the terms and conditions!", "error");
      return;
    }

    setIsLoading(true);
    showMessage("Creating your account...", "info");

    try {
      // Prepare data for Spring Boot backend (matching UserDto structure)
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.confirmPassword, // Keep lowercase as in your original code
        accountType: formData.accountType
      };

      console.log('Submitting signup data:', signupData); // Debug log

      // Use the registerUser service
      const result = await registerUser(signupData);
      
      showMessage("Account created successfully!", "success");
      
      // Clear form data
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "APPLICANT",
        termsAccepted: false,
      });

      // Auto-switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);

    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error?.message || "Signup failed. Please try again.";
      showMessage(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      key="signup"
      initial={{ x: -500, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 500, opacity: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 bg-mine-shaft-950/70 p-8 rounded-xl border border-mine-shaft-850 shadow-2xl backdrop-blur-sm"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-1">Create Account</h2>
        <p className="text-sm text-gray-400">Start your journey with Jobluu today.</p>
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
              : "bg-gray-600 text-white" // fallback for empty string
          } shadow-md`}
        >
          {message}
        </div>
      )}

      {/* Full Name Input */}
      <div>
        <label htmlFor="name" className="text-sm text-gray-300 mb-1 block">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          className="w-full px-4 py-3 bg-transparent border border-mine-shaft-850 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
        />
      </div>

      {/* Email Input */}
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

      {/* Password Input */}
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
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
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
          <button
            type="button"
            onClick={toggleConfirmPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Account Type Selection */}
      <div>
        <label className="text-sm text-gray-300 mb-2 block font-medium">
          Account Type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleAccountTypeChange("APPLICANT")}
            className={`flex-1 py-3 px-4 border rounded-lg transition-all duration-300 ${
              formData.accountType === "APPLICANT"
                ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                : "border-mine-shaft-800 text-gray-300 hover:bg-mine-shaft-900"
            }`}
          >
            Applicant
          </button>
          <button
            type="button"
            onClick={() => handleAccountTypeChange("EMPLOYER")}
            className={`flex-1 py-3 px-4 border rounded-lg transition-all duration-300 ${
              formData.accountType === "EMPLOYER"
                ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                : "border-mine-shaft-800 text-gray-300 hover:bg-mine-shaft-900"
            }`}
          >
            Employer
          </button>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="termsAccepted"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          required
          className="accent-yellow-400 w-4 h-4 mt-0.5 rounded-sm focus:ring-2 focus:ring-yellow-400"
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
        disabled={isLoading}
        className={`w-full py-3 font-semibold rounded-md transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
          isLoading
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-yellow-500 text-black hover:bg-yellow-400"
        }`}
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-yellow-400 underline hover:text-yellow-300"
        >
          Login
        </button>
      </p>
    </motion.form>
  );
};

export default Signup;
