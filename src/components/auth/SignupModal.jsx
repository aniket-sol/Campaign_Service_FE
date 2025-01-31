import { useState } from "react";
import { authAPI } from "../../api/auth";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .max(100, "First name must be at most 100 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .max(100, "Last name must be at most 100 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .test("passwords-match", "Passwords must match", function (value) {
      return value === this.parent.password;
    }),
});

export const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = async (name, value) => {
    try {
      // For confirmPassword, we need to validate against the current password
      if (name === "confirmPassword") {
        await validationSchema.validateAt(name, { ...userData, [name]: value });
      } else {
        await Yup.reach(validationSchema, name).validate(value);
      }
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: error.message }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    // If password changes, revalidate confirmPassword
    if (name === "password" && userData.confirmPassword) {
      validateField("confirmPassword", userData.confirmPassword);
    }
  };

  // Rest of your code remains the same...
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate all fields
      await validationSchema.validate(userData, { abortEarly: false });

      const submitData = { ...userData };
      delete submitData.confirmPassword;

      const user = await authAPI.signup(submitData);
      console.log(user);
      toast.success("Signup successful!");
      onClose();
    } catch (err) {
      if (err.inner) {
        // Yup validation errors
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        // API error
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries({
            first_name: "First Name",
            last_name: "Last Name",
            username: "Username",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
          }).map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={
                  name.toLowerCase().includes("password")
                    ? "password"
                    : name === "email"
                    ? "email"
                    : "text"
                }
                name={name}
                className={`mt-1 block w-full rounded-md border ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                } px-3 py-2`}
                value={userData[name]}
                onChange={handleChange}
              />
              {errors[name] && (
                <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading && Object.keys(errors).length > 0}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <button
          onClick={onSwitchToLogin}
          className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};
