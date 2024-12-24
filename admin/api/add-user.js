document
  .getElementById("addNewUser")
  .addEventListener("click", async (event) => {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil data dari form
    const newUser = {
      username: document.getElementById("newUserName").value,
      password: document.getElementById("newUserPassword").value,
      peran: document.getElementById("newUserRole").value,
      email: document.getElementById("newUserEmail").value,
    };

    try {
      // Kirim data ke backend
      const response = await fetch("http://localhost:7000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Pengguna berhasil ditambahkan!");
        fetchUsers();
        console.log(result);
        // Reset form dan sembunyikan popup
        document.getElementById("addUserPopup").classList.add("hidden");
      } else {
        const error = await response.json();
        alert(`Gagal menambah pengguna: ${error.error}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menambah pengguna.");
    }
  });

// Tombol Batal
document.getElementById("cancelAddUser").addEventListener("click", () => {
  document.getElementById("addUserPopup").classList.add("hidden");
});

function openUserModal() {
  document.getElementById("addUserPopup").classList.remove("hidden");
  document.getElementById("addUserPopup").classList.add("grid");

}
