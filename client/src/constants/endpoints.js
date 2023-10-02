const HTTP_HOST = "http://localhost:5000";

export const endpoints = {
  login: `${HTTP_HOST}/api/login`,
  registration: `${HTTP_HOST}/api/registration`,
  refresh: `${HTTP_HOST}/api/refresh`,
  logout: `${HTTP_HOST}/api/logout`,
  users: `${HTTP_HOST}/api/users`,
  messages: `${HTTP_HOST}/api/messages`,
  sendMessages: `${HTTP_HOST}/api/send-message`,
};
