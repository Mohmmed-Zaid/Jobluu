import React, { useState, useRef, useEffect } from "react";
import { Modal } from "@mantine/core";
import { X, Mail, ArrowRight, Shield, Check, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface ResetPasswordProps {
  opened: boolean;
  close: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ opened, close }) => {
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "info" | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const showMessage = (msg: string, type: "error" | "success" | "info") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 4000);
  };

  // FIX: Added event.stopPropagation() to prevent event bubbling
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event from bubbling up to parent forms
    
    console.log("📝 Email input changed:", email);
    console.log("🔄 Attempting to send OTP to:", email);
    
    if (!email) {
      showMessage("Please enter your email address.", "error");
      return;
    }

    setIsLoading(true);
    showMessage("Sending OTP to your email...", "info");

    try {
      console.log("📤 Trying API call: POST /api/users/sendOTP/" + email);
      const response = await axios.post(`http://localhost:8080/api/users/sendOTP/${email}`);
      
      if (response.data.success) {
        showMessage("OTP sent successfully! Check your email.", "success");
        setStep('otp');
        setCountdown(300); // 5 minutes countdown
        
        // Focus first OTP input
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (error: any) {
      console.error('Send OTP error:', error);
      const errorMessage = error?.response?.data?.errorMessage || 
                          error?.response?.data?.message || 
                          "Failed to send OTP. Please try again.";
      showMessage(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // FIX: Added event.stopPropagation() to prevent event bubbling
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event from bubbling up to parent forms
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      showMessage("Please enter the complete 6-digit OTP.", "error");
      return;
    }

    setIsLoading(true);
    showMessage("Verifying OTP...", "info");

    try {
      const response = await axios.get(`http://localhost:8080/api/users/verifyOtp/${email}/${otpString}`);
      
      if (response.data.success) {
        showMessage("OTP verified successfully!", "success");
        setStep('success');
        
        // Auto close after success
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      const errorMessage = error?.response?.data?.errorMessage || 
                          error?.response?.data?.message || 
                          "Invalid OTP. Please try again.";
      showMessage(errorMessage, "error");
      
      // Clear OTP and focus first input
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    showMessage("Resending OTP...", "info");

    try {
      const response = await axios.post(`http://localhost:8080/api/users/sendOTP/${email}`);
      
      if (response.data.success) {
        showMessage("New OTP sent successfully!", "success");
        setOtp(["", "", "", "", "", ""]);
        setCountdown(300);
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      }
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      const errorMessage = error?.response?.data?.errorMessage || 
                          "Failed to resend OTP. Please try again.";
      showMessage(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setMessage("");
    setMessageType("");
    setCountdown(0);
    close();
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp(["", "", "", "", "", ""]);
    setMessage("");
    setMessageType("");
    setCountdown(0);
  };

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // FIX: Added onClick handler to prevent event bubbling on modal content
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title=""
      size="md"
      centered
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.8,
        blur: 8,
      }}
      styles={{
        content: {
          backgroundColor: 'transparent',
          border: 'none',
        },
        body: {
          padding: 0,
        },
        header: {
          display: 'none',
        },
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
        onClick={handleModalContentClick} // FIX: Prevent event bubbling
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border-b border-gray-700/50 p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X size={20} />
          </button>
          
          {step === 'otp' && (
            <button
              onClick={handleBackToEmail}
              className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
            >
              <ArrowRight size={20} className="rotate-180" />
            </button>
          )}
          
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-colors ${
              step === 'success' 
                ? 'bg-gradient-to-br from-green-400 to-green-500' 
                : 'bg-gradient-to-br from-yellow-400 to-yellow-500'
            }`}>
              {step === 'success' ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <Shield className="w-6 h-6 text-black" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {step === 'email' && 'Reset Password'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'success' && 'Success!'}
              </h3>
              <p className="text-sm text-gray-400">
                {step === 'email' && 'Secure account recovery'}
                {step === 'otp' && 'Check your email for OTP'}
                {step === 'success' && 'Password reset initiated'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Message Notification */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`px-4 py-3 rounded-xl text-sm font-medium mb-6 border ${
                  messageType === "error"
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : messageType === "success"
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : messageType === "info"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                }`}
              >
                <div className="flex items-center justify-center">
                  {message}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* Email Step */}
            {step === 'email' && (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Enter your email address and we'll send you a 6-digit OTP to reset your password.
                  </p>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="reset-email" className="text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-yellow-400" />
                      <input
                        type="email"
                        id="reset-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 py-3 px-4 border border-gray-600 text-gray-300 font-medium rounded-xl hover:bg-gray-700/50 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      className={`flex-1 py-3 px-4 font-semibold rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                        isLoading
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-yellow-400/25"
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <span>{isLoading ? "Sending..." : "Send OTP"}</span>
                        {!isLoading && <ArrowRight size={16} />}
                      </div>
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* OTP Step */}
            {step === 'otp' && (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <p className="text-gray-400 text-sm leading-relaxed mb-2">
                    We've sent a 6-digit OTP to <span className="text-yellow-400 font-medium">{email}</span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Please check your inbox and enter the code below.
                  </p>
                </div>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Enter OTP
                    </label>
                    <div className="flex justify-center space-x-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (otpInputRefs.current[index] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center text-xl font-bold bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-300"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Countdown and Resend */}
                  <div className="text-center">
                    {countdown > 0 ? (
                      <p className="text-sm text-gray-400">
                        Resend OTP in {formatCountdown(countdown)}
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading}
                        className="text-sm text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300 hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                      >
                        <RotateCcw size={14} />
                        <span>Resend OTP</span>
                      </button>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || otp.join('').length !== 6}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-3 px-4 font-semibold rounded-xl transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                      isLoading || otp.join('').length !== 6
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-yellow-400/25"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>{isLoading ? "Verifying..." : "Verify OTP"}</span>
                      {!isLoading && <ArrowRight size={16} />}
                    </div>
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* Success Step */}
            {step === 'success' && (
              <motion.div
                key="success-step"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">OTP Verified Successfully!</h4>
                <p className="text-gray-400 text-sm">
                  Your identity has been verified. You can now reset your password.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          {step !== 'success' && (
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300 hover:underline"
                  >
                    Back to Sign In
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Modal>
  );
};

export default ResetPassword;