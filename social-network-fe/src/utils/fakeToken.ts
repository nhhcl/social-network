export const createFakeToken = (payload: any) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const encode = (obj: any) =>
    btoa(JSON.stringify(obj));

  return (
    encode(header) +
    '.' +
    encode({
      ...payload,
      iat: Date.now(),
      exp: Date.now() + 1000 * 60 * 60 // 1 giờ
    }) +
    '.fake-signature'
  );
};
