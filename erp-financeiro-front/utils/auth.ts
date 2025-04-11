// utils/auth.ts
export const getUserIdFromToken = (): number | null => {
  const token = localStorage.getItem('jwt');
  if (!token) return null;

  try {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(atob(payloadBase64));
    return payload?.sub || null;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};
