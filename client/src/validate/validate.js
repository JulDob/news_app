export function validatePassword(str) {
  return str.length > 7;
}

export function validateEmail(value) {
  // eslint-disable-next-line
  const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return re.test(value);
}
