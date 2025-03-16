export async function logoutfunction() {
    // Agora, limpe o lado do cliente
    document.cookie = "auth_token=; Max-Age=0; path=/;";
    localStorage.removeItem("auth_token");
  
    // Redirecione para a página de login
    window.location.href = "/auth/login";
  }
  