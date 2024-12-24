
async function deleteBook(bukuId) {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      try {
        // Kirim permintaan DELETE ke server
        const response = await fetch(`http://localhost:7000/api/buku/${bukuId}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          alert("Buku berhasil dihapus.");
          // Refresh daftar buku setelah penghapusan
          fetchBooks();
        } else {
          alert("Gagal menghapus buku.");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        alert("Terjadi kesalahan saat menghapus buku.");
      }
    }
  }
  