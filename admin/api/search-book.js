document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchBookInput");
    const filterByCategory = document.getElementById("filterByCategory");
    const bookListElement = document.getElementById("bookList");
  
    // Fungsi untuk mengambil daftar buku dari server
    async function fetchBooks(query = "", category = "") {
      try {
        let url = "http://localhost:7000/api/buku";
        
        // Jika ada query pencarian dan kategori, gunakan API pencarian dengan kategori
        if (query && category) {
          url = `http://localhost:7000/api/buku/search/${query}/category/${category}`;
        } else if (query) {
          // Jika hanya ada query pencarian
          url = `http://localhost:7000/api/books/search/${query}`;
        } else if (category) {
          // Jika hanya ada kategori
          url = `http://localhost:7000/api/buku/category/${category}`;
        }
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Gagal mengambil data buku");
        }
  
        const books = await response.json();
  
        // Bersihkan daftar buku sebelumnya
        bookListElement.innerHTML = "";
  
        // Loop untuk menampilkan buku-buku
        books.forEach((book) => {
          const bookItem = document.createElement("div");
          bookItem.classList.add("flex", "flex-row", "justify-between", "border-b-2", "p-2");
  
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
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        bookListElement.innerHTML = "<p class='text-red-500'>Terjadi kesalahan saat memuat data buku.</p>";
      }
    }
  
    // Event listener untuk input pencarian
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();
      const category = filterByCategory.value;
      fetchBooks(query, category); // Panggil fungsi fetchBooks dengan query dan kategori
    });
  
    // Event listener untuk filter kategori
    filterByCategory.addEventListener("change", () => {
      const category = filterByCategory.value;
      const query = searchInput.value.trim();
      fetchBooks(query, category); // Panggil fungsi fetchBooks dengan query dan kategori
    });
  
    // Inisialisasi daftar buku saat pertama kali halaman dimuat
    fetchBooks();
  });
  