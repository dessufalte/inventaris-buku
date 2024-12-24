// Fungsi untuk membuka modal Edit Buku
function openEditModal(book, buku_id) {
  // Isi data buku ke dalam form modal
  document.getElementById("editBookTitle").value = book.title;
  document.getElementById("editBookCategory").value = book.category;
  document.getElementById("editBookAuthor").value = book.author;
  document.getElementById("editBookPublisher").value = book.publisher;
  document.getElementById("editBookDescription").value = book.description;
  document.getElementById("editBookStock").value = book.stock;
  document.getElementById("editBookRating").value = book.rating;
  document.getElementById("editBookISBN").value = book.ISBN;
  document.getElementById("editPublicationDate").value = book.publication_date.split('T')[0]; // Format tanggal
  document.getElementById("buku_id").value = buku_id;
  document.getElementById("editBookModal").classList.remove("hidden");

}

function closeEditModal() {
  document.getElementById("editBookModal").classList.add("hidden");
}

document.getElementById("closeEditModalButton").addEventListener("click", closeEditModal);
document.getElementById("cancelEditButton").addEventListener("click", closeEditModal);

// Event listener untuk menyimpan perubahan buku
document.getElementById("saveEditBookButton").addEventListener("click", async (event) => {
  event.preventDefault();

  // Ambil data dari form Edit Buku
  const updatedBook = {
    title: document.getElementById("editBookTitle").value,
    category: document.getElementById("editBookCategory").value,
    author: document.getElementById("editBookAuthor").value,
    publisher: document.getElementById("editBookPublisher").value,
    description: document.getElementById("editBookDescription").value,
    stock: parseInt(document.getElementById("editBookStock").value, 10),
    rating: parseFloat(document.getElementById("editBookRating").value),
    ISBN: document.getElementById("editBookISBN").value,
    publication_date: document.getElementById("editPublicationDate").value,
    id: document.getElementById("buku_id").value,
  };

  try {
    // Kirim data ke server untuk menyimpan perubahan
    const response = await fetch(`http://localhost:7000/api/buku/${updatedBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });

    if (response.ok) {
      alert("Perubahan buku berhasil disimpan!");
      closeEditModal(); // Tutup modal setelah menyimpan
      // Refresh daftar buku atau update UI
    } else {
      const error = await response.json();
      alert(`Gagal menyimpan perubahan: ${error.error}`);
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert("Terjadi kesalahan saat menyimpan perubahan buku.");
  }
});
// Fungsi untuk memuat data buku berdasarkan ID dan membuka modal Edit Buku
async function editBook(bukuId) {
  try {
    // Fetch data buku dari API berdasarkan ID
    const response = await fetch(`http://localhost:7000/api/buku/${bukuId}`);
    if (response.ok) {
      const book = await response.json();

      // Isi data buku ke dalam form modal Edit Buku
      openEditModal(book, bukuId);
    } else {
      alert("Gagal mengambil data buku.");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    alert("Terjadi kesalahan saat memuat data buku.");
  }
}
