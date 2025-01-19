import React, { useActionState } from "react";

export default function App() {
  const [state, performAction] = useActionState();
  // const [error, submitAction, isPending] = useActionState(
  //   async (previousState, formData) => {
  //     const error = await updateName(formData.get("name"));
  //     if (error) {
  //       return error;
  //     }
  //     redirect("/path");
  //     return null;
  //   },
  //   null
  // );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    await performAction(async () => {
      // Simulate server-side processing
      if (!data.name || !data.email) {
        throw new Error("All fields are required.");
      }
      console.log("Form submitted successfully:", data);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>
        this form is built with react 19's useActionSate(formely known as
        useFormState)
      </h1>
      <div>
        <label>Name:</label>
        <input name="name" />
      </div>
      <div>
        <label>Email:</label>
        <input name="email" />
      </div>
      {state.error && <p style={{ color: "red" }}>{state.error.message}</p>}
      {state.success && (
        <p style={{ color: "green" }}>Form submitted successfully!</p>
      )}
      <button type="submit" disabled={state.loading}>
        {state.loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
