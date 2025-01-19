import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useActionState } from "react";

const schema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters"),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

async function helper(previousState, formData) {
  if (formData.name === "admin" && formData.email === "test@test.com") {
    return { success: true, message: "successful!" };
  }
  throw new Error("error");
}

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(helper, {});

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>this form is built with react hook form</h1>
      <div>
        <label>Name:</label>
        <input {...register("name")} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <button disabled={isSubmitting || isPending}>
        {isSubmitting || isPending ? "Submitting..." : "Submit"}
      </button>

      {state.message && <p>{state.message}</p>}
      {isPending && <p>Processing...</p>}
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
