function openEditUserPopup(userId) {
    // Ambil data pengguna berdasarkan ID
    fetch(`http://localhost:7000/api/user/${userId}`)
      .then(response => response.json())
      .then(user => {
        // Isi form dengan data pengguna
        console.log(user)
        document.getElementById("editUserName").value = user.username;
        document.getElementById("editPassword").value = user.password;
        document.getElementById("editUserEmail").value = user.email;
        document.getElementById("editPeran").value = user.peran;
       
  
        // Simpan ID pengguna yang sedang diedit
        currentUserId = user.user_id;
  
        // Tampilkan pop-up
        document.getElementById("editUserPopup").classList.remove("hidden");
        document.getElementById("editUserPopup").classList.add("grid");

      })
      .catch(error => {
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
        alert("Gagal memuat data pengguna.");
      });
  }
  
  function closeEditUserPopup() {
    document.getElementById("editUserPopup").classList.add("hidden");
  }
  
  // Simpan perubahan
  async function saveEditUser() {
    const username = document.getElementById("editUserName").value;
    const email = document.getElementById("editUserEmail").value;
    const password = document.getElementById("editPassword").value;
    const peran = document.getElementById("editPeran").value;  
    try {
      const response = await fetch(`http://localhost:7000/api/user/${currentUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          peran,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Gagal mengedit pengguna: ${response.status}`);
      }
  
      alert("Pengguna berhasil diperbarui!");
      closeEditUserPopup();
      fetchUsers(); // Refresh daftar pengguna
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menyimpan perubahan.");
    }
  }
  
  // Event listeners
  document.getElementById("cancelEditUser").addEventListener("click", closeEditUserPopup);
  document.getElementById("saveEditUser").addEventListener("click", saveEditUser);
  