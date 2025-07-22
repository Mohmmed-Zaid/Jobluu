import React, { useState } from "react";
import { Modal } from "@mantine/core";
import { X, Mail, ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface ResetPasswordProps {
  opened: boolean;
  close: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ opened, close }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "info" | "">("");
  const [isLoading, setIsLoading] = useState(false);

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
    
    if (!email) {
      showMessage("Please enter your email address.", "error");
      return;
    }

    setIsLoading(true);
    showMessage("Sending reset link...", "info");

    try {
      // Replace this with your actual reset password API call
      // await resetPasswordRequest(email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showMessage("Password reset link sent to your email!", "success");
      
      setTimeout(() => {
        setEmail("");
        setMessage("");
        setMessageType("");
        close();
      }, 2000);

    } catch (error: any) {
      console.error('Reset password error:', error);
      const errorMessage = error?.message || "Failed to send reset link. Please try again.";
      showMessage(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setMessage("");
    setMessageType("");
    close();
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
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border-b border-gray-700/50 p-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Reset Password</h3>
              <p className="text-sm text-gray-400">Secure account recovery</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Message Notification */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
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

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter your email address and we'll send you a secure link to reset your password. 
              The link will expire in 1 hour for security purposes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Buttons */}
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
                  <span>{isLoading ? "Sending..." : "Send Reset Link"}</span>
                  {!isLoading && <ArrowRight size={16} />}
                </div>
              </motion.button>
            </div>
          </form>

          {/* Footer */}
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
        </div>
      </motion.div>
    </Modal>
  );
};

export default ResetPassword;