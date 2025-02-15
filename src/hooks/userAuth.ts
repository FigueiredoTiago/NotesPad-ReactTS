import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("auth"); // Obtém o token dos cookies
  return !!token; // Retorna `true` se o token existir
};

export default useAuth;
