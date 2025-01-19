import React, { useActionState, useOptimistic } from "react";

async function submitFeedback(previousState, formData) {
  const feedback = formData.get("feedback");
  if (!feedback) {
    return {
      status: "ERROR",
      message: "Feedback is required",
    };
  }

  try {
    // Simulating potential network failure
    return await new Promise((resolve, reject) => {
      // Randomly fail some requests to demonstrate error handling
      setTimeout(() => {
        Math.random() > 0.7
          ? resolve({
              status: "SUCCESS",
              message: `Feedback received: ${feedback}`,
            })
          : reject(new Error());
      }, 3000);
    });
  } catch (error) {
    return {
      status: "ERROR",
      message: "Failed to submit feedback. Please try again.",
    };
  }
}

export default function App() {
  const [state, formAction, isPending] = useActionState(submitFeedback, {
    status: "INIT",
    message: "",
  });

  const [optimisticState, addOptimistic] = useOptimistic(
    state,
    (currentState, newFeedback) => ({
      ...currentState,
      status: "PENDING",
      message: newFeedback,
    })
  );

  return (
    <form
      action={(formData) => {
        const feedback = formData.get("feedback");
        addOptimistic(feedback);
        formAction(formData);
      }}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <h1>Feedback Form with Error Handling</h1>

      <textarea name="feedback" placeholder="Enter your feedback" rows={4} />

      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Feedback"}
      </button>

      {/* Comprehensive State Rendering */}
      {optimisticState.status === "PENDING" && (
        <p style={{ color: "orange" }}>
          📡 Sending your feedback... {optimisticState.message}
        </p>
      )}

      {optimisticState.status === "SUCCESS" && (
        <p style={{ color: "green" }}>✅ {optimisticState.message}</p>
      )}

      {optimisticState.status === "ERROR" && (
        <div
          style={{
            color: "red",
            border: "1px solid red",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          ❌ {optimisticState.message}
          <button
            onClick={() => {
              // Optional: Retry mechanism
              formAction(new FormData(document.querySelector("form")));
            }}
            style={{
              marginLeft: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "3px",
            }}
          >
            Retry
          </button>
        </div>
      )}
    </form>
  );
}
