export const getLoginUrl = () => {
  const currentUrl = window.location.href;
  return `https://manus.computer/oauth/github?redirect=${encodeURIComponent(currentUrl)}`;
};