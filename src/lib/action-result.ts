export type ActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export const actionSuccess = (message: string): ActionResult => ({ success: true, message });

export const actionFailure = (
  message: string,
  fieldErrors?: Record<string, string[]>,
): ActionResult => ({ success: false, message, fieldErrors });
