import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useActionState } from "react";

// Define the validation schema using Zod
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Simulate a server-side action for form submission
async function handleSubmit(previousState, formData) {
  // Simulate server processing
  if (formData.username === "admin" && formData.password === "password") {
    return { success: true, message: "Login successful!" };
  }
  throw new Error("Invalid username or password");
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(handleSubmit, {});

  const {
    register,
    handleSubmit: handleClientSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await formAction(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleClientSubmit(onSubmit)}>
      <div>
        <label>Username:</label>
        <input {...register("username")} />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  );
}

export default function App() {
  return (
    <div>
      <h1>Login Form</h1>
      <LoginForm />
    </div>
  );
}
