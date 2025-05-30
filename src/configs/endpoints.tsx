const formatUrl = (pathname: string) => {
  return process.env.NEXT_PUBLIC_BASE_URL + '/' + pathname;
};
const endpoints = {
  register: formatUrl('register/'),
  login: formatUrl('login'),
  user: formatUrl('user/'),
  history: formatUrl('user/history'),
  feedback : formatUrl("feedback"),
  google : formatUrl("google/auth")
}
export default endpoints;