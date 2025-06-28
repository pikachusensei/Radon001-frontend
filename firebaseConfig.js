import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // ...rest of config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;