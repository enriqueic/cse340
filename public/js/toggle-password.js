document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("togglePassword")
  const passwordInput = document.getElementById("accountPassword")

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password"
      passwordInput.type = isPassword ? "text" : "password"
      togglePassword.textContent = isPassword ? "Hide" : "Show"
    })
  }
})