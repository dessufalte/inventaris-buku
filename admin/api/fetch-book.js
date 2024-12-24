// Fungsi untuk mengambil daftar buku dari server
async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:7000/api/buku"); // Ganti dengan URL API yang sesuai
    if (response.ok) {
      const books = await response.json();

      // Ambil elemen #bookList
      const bookListElement = document.getElementById("bookList");

      // Bersihkan isi sebelumnya
      bookListElement.innerHTML = "";

      // Loop melalui setiap buku dan buat elemen HTML untuk ditambahkan ke #bookList
      books.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.classList.add(
          "flex",
          "flex-row",
          "justify-between",
          "border-b-2",
          "p-2"
        );

        const bookDetails = document.createElement("div");
        bookDetails.innerHTML = `
          <p class="font-semibold">${book.title}</p>
          <p class="text-gray-600">Kategori: ${book.category}</p>
        `;

        const bookActions = document.createElement("div");
        bookActions.classList.add("flex", "flex-row", "gap-2");
        bookActions.innerHTML = `
          <button class="menubtn text-xs" onclick="showBookDetail(${book.buku_id})">Detail</button>
          <button class="menubtn text-xs" onclick="editBook(${book.buku_id})">Edit</button>
          <button class="menubtn text-xs" onclick="deleteBook(${book.buku_id})">Hapus</button>
        `;

        // Menambahkan detail buku dan aksi ke dalam bookItem
        bookItem.appendChild(bookDetails);
        bookItem.appendChild(bookActions);

        // Menambahkan bookItem ke dalam #bookList
        bookListElement.appendChild(bookItem);
      });
    } else {
      console.error("Gagal mengambil data buku");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

async function showBookDetail(bookId) {
  try {
    const response = await fetch(`http://localhost:7000/api/buku/${bookId}`);
    if (response.ok) {
      const book = await response.json();

      // Pastikan elemen detailModalContent ditemukan
      const modalContent = document.getElementById("detailModalContent");
      if (!modalContent) {
        console.error("Elemen detailModalContent tidak ditemukan.");
        return;
      }

      // Isi data detail buku ke dalam modal
      modalContent.innerHTML = `
        <h2 class="text-lg font-bold mb-2">${book.title}</h2>
        <p><strong>Penulis:</strong> ${book.author}</p>
        <p><strong>Kategori:</strong> ${book.category}</p>
        <p><strong>Penerbit:</strong> ${book.publisher}</p>
        <p><strong>ISBN:</strong> ${book.ISBN}</p>
        <p><strong>Stok:</strong> ${book.stock}</p>
        <p><strong>Tanggal Publikasi:</strong> ${new Date(
          book.publication_date
        ).toLocaleDateString()}</p>
        <p><strong>Deskripsi:</strong> ${book.description}</p>
      `;

      // Tampilkan modal
      document.getElementById("detailModal").classList.remove("hidden");
      document.getElementById("detailModal").classList.add("grid");
    } else {
      console.error("Gagal mengambil detail buku");
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

// Fungsi untuk menutup modal detail
function closeModal() {
  document.getElementById("detailModal").classList.add("hidden");
}
// Fungsi untuk menutup modal detail

fetchBooks();
document.addEventListener("DOMContentLoaded", async () => {
  const totalBooksElement = document.querySelector("#countbook"); // Sesuaikan dengan elemen tempat menampilkan total buku
  
  try {
    const response = await fetch("http://localhost:7000/api/buku/count");
    if (!response.ok) {
      throw new Error("Gagal mengambil data total buku.");
    }
    const data = await response.json();
    totalBooksElement.textContent = `Total Buku: ${data.totalBooks}`;
  } catch (error) {
    console.error(error);
    totalBooksElement.textContent = "Gagal mengambil data total buku.";
  }
});
