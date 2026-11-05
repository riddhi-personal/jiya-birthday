// Password stored client-side only for this static deployment
// Since there is no backend server, we store a hashed version and validate client-side.
// The password is: HBD_Jiya_Riddhi_2307

const SESSION_KEY = 'jiya_auth_v1';
const CORRECT_HASH = btoa('HBD_Jiya_Riddhi_2307_salt_xK9mP2');

export function checkPassword(input) {
  const inputHash = btoa(input + '_salt_xK9mP2');
  return inputHash === CORRECT_HASH;
}

export function setAuthenticated() {
  try {
    sessionStorage.setItem(SESSION_KEY, 'true');
  } catch (e) {}
}

export function isAuthenticated() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function logout() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (e) {}
}

// Rate limiting
const ATTEMPT_KEY = 'jiya_attempts';
const LOCKOUT_KEY = 'jiya_lockout';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

export function checkRateLimit() {
  try {
    const lockout = parseInt(localStorage.getItem(LOCKOUT_KEY) || '0');
    if (lockout && Date.now() < lockout) {
      const remaining = Math.ceil((lockout - Date.now()) / 1000);
      return { allowed: false, remainingSeconds: remaining };
    }
    return { allowed: true, remainingSeconds: 0 };
  } catch (e) {
    return { allowed: true, remainingSeconds: 0 };
  }
}

export function recordFailedAttempt() {
  try {
    const attempts = parseInt(localStorage.getItem(ATTEMPT_KEY) || '0') + 1;
    localStorage.setItem(ATTEMPT_KEY, attempts);
    if (attempts >= MAX_ATTEMPTS) {
      localStorage.setItem(LOCKOUT_KEY, Date.now() + LOCKOUT_DURATION);
      localStorage.setItem(ATTEMPT_KEY, '0');
    }
  } catch (e) {}
}

export function clearAttempts() {
  try {
    localStorage.removeItem(ATTEMPT_KEY);
    localStorage.removeItem(LOCKOUT_KEY);
  } catch (e) {}
}
