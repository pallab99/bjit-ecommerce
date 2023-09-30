import jwt_decode from 'jwt-decode';
export const isAdmin = (token) => {
  const decoded = jwt_decode(token);
  return decoded.rank === 1;
};
