import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Додано для навігації
import { registerUser } from "../../../services/authService";
import styles from "./RegistrationModal.module.scss";
import Icon1 from "../../../assets/not-visible-interface.svg";
import Icon2 from "../../../assets/eye-visible-outlined.svg";

// Валідація форми
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const RegistrationModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ✅ Додано useNavigate для редіректу

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} onKeyDown={(e) => e.key === "Escape" && onClose()} tabIndex={0}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>&times;</button>
        <h2 className={styles.title}>Registration</h2>
        <p className={styles.subtitle}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information
        </p>
        <form onSubmit={handleSubmit(async (data) => {
          try {
            await registerUser(data.email, data.password);
            navigate("/teachers"); // ✅ Перенаправлення на сторінку викладачів
            onClose();
          } catch (error) {
            console.error("Registration error:", error.message);
          }
        })}>
                    <p className={styles.error}>{errors.name?.message}</p>

          <input type="text" placeholder="Name" {...register("name")} className={styles.input} />
          <p className={styles.error}>{errors.email?.message}</p>
          <input type="email" placeholder="Email" {...register("email")} className={styles.input} />

          <div className={styles.passwordContainer}>
          <p className={styles.error}>{errors.password?.message}</p>
  
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={styles.input}
            />
<span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
  <img src={showPassword ? Icon2 : Icon1} alt="Toggle password visibility" />
</span>

          </div>

          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
