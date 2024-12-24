document.addEventListener("DOMContentLoaded", () => {
    // Select form elements
    const form = document.querySelector("form");
    const usernameInput = form.querySelector("input[type='text']");
    const passwordInput = form.querySelector("input[type='password']");
    const submitButton = form.querySelector("input[type='submit']");
  
    // Add event listener for form submission
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission
  
      // Retrieve input values
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Basic validation
      if (!username || !password) {
        alert("Username dan password harus diisi!");
        return;
      }
  
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.value = "Processing...";
  
      try {
        // Send login request to the server
        const response = await fetch("http://localhost:7000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
  
        // Handle server response
        if (response.ok) {
          const data = await response.json();
          
          // Check user role and redirect accordingly
          if (data.peran === "admin") {
            window.location.href = "/admin";
            sessionStorage.setItem("userId", data.id);
          } else if (data.peran === "user") {
            window.location.href = "/user";
            sessionStorage.setItem("userId", data.id);
          } else {
            alert("Peran pengguna tidak valid.");
          }
        } else {
          const error = await response.json();
          alert(`Login gagal: ${error.message}`);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.value = "Sign In";
      }
    });
  });
  