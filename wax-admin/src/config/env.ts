const requiredEnv = {
  apiUrl: import.meta.env.VITE_API_URL,
  hubUrl: import.meta.env.VITE_HUB_URL,
};

export const env = {
  apiUrl: requiredEnv.apiUrl ?? (import.meta.env.DEV ? '/api' : 'http://localhost:5005/api'),
  hubUrl: requiredEnv.hubUrl ?? (import.meta.env.DEV ? '/comments' : 'http://localhost:5005/comments'),
};