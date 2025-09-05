import { ZodError } from "zod";

export function formatZodError(err: unknown) {
  if (err instanceof ZodError) {
    const errors = err.issues.map(e => ({
      field: e.path.join("."), 
      message: e.message,
    }));

    return {
      error: "Validation failed",
      fields: errors,
    };
  }

  return {
    error: "Unknown validation error",
    message: (err as Error)?.message || "Unknown error",
  };
}
