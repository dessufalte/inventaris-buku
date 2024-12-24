async function fetchUsers() {
  try {
    // Fetch data pengguna dari backend
    const response = await fetch("http://localhost:7000/api/user");
    if (!response.ok) {
      throw new Error("Gagal mengambil data pengguna.");
    }

    const users = await response.json();
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Kosongkan tabel sebelum render ulang

    // Render data pengguna ke dalam tabel
    users.forEach((user) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td class="px-4 py-2 border">${user.username}</td>
          <td class="px-4 py-2 border">${user.email}</td>
          <td class="px-4 py-2 border">${user.peran}</td>
          <td class="px-4 py-2 border">
            <button class="menubtn text-xs" onclick="openEditUserPopup(${user.user_id})">Edit</button>
            <button class="menubtn text-xs" onclick="deleteUser(${user.user_id})">Hapus</button>
          </td>
        `;

      userList.appendChild(row);
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert("Terjadi kesalahan saat mengambil data pengguna.");
  }
}

async function deleteUser(userId) {
  if (!confirm("Yakin ingin menghapus pengguna ini?")) return;

  try {
    const response = await fetch(`http://localhost:7000/api/user/${userId}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Gagal menghapus pengguna.");
    }

    alert("Pengguna berhasil dihapus.");
    fetchUsers(); // Refresh tabel pengguna
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert("Terjadi kesalahan saat menghapus pengguna.");
  }
}

// Panggil fungsi fetchUsers saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchUsers);
