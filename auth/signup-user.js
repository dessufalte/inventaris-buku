document.addEventListener("DOMContentLoaded", () => {
    // Select form elements
    const form = document.querySelector("form");
    const usernameInput = form.querySelector("input[type='text']");
    const emailInput = form.querySelector("input[type='email']");
    const passwordInput = form.querySelector("input[type='password']");
    
    // Listen to the form submission event
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission
      
      // Retrieve form data
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Basic validation
      if (!username || !email || !password) {
        alert("Semua field harus diisi!");
        return;
      }
  
      try {
        // Send data to the server
        const response = await fetch("http://localhost:7000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            peran : "user",
          }),
        });
  
        // Handle server response
        if (response.ok) {
            const data = await response.json();
            alert("Masuk!");
            form.reset(); 
            window.location.href = "login.html"; // Redirect ke halaman login
          } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
          }
          
      } catch (error) {
        console.error("Error during user signup:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    });
  });
  