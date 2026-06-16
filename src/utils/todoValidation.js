export const MAX_TODO_TITLE_LENGTH = 100;
export const MAX_SEARCH_LENGTH = 50;
export const MAX_EMAIL_LENGTH = 254;
export const MAX_PASSWORD_LENGTH = 128;

export function isValidTodoTitle(title) {
  const trimmed = title.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_TODO_TITLE_LENGTH;
}

export function isValidEmail(email) {
  const trimmed = email.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_EMAIL_LENGTH && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function isValidPassword(password) {
  return password.length > 0 && password.length <= MAX_PASSWORD_LENGTH;
}

export function isValidSearchTerm(term) {
  return term.length <= MAX_SEARCH_LENGTH;
}

export function getTodoTitleError(title) {
  const trimmed = title.trim();
  if (!trimmed) return 'Todo title is required.';
  if (trimmed.length > MAX_TODO_TITLE_LENGTH) {
    return `Todo title must be ${MAX_TODO_TITLE_LENGTH} characters or less.`;
  }
  return '';
}

export function getEmailError(email) {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required.';
  if (trimmed.length > MAX_EMAIL_LENGTH) return 'Email is too long.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return 'Enter a valid email address.';
  return '';
}

export function getPasswordError(password) {
  if (!password) return 'Password is required.';
  if (password.length > MAX_PASSWORD_LENGTH) return 'Password is too long.';
  return '';
}

export function getSearchTermError(term) {
  if (term.length > MAX_SEARCH_LENGTH) {
    return `Search must be ${MAX_SEARCH_LENGTH} characters or less.`;
  }
  return '';
}
