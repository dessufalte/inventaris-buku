document.addEventListener("DOMContentLoaded", async () => {
  const bookContainer = document.querySelector("#book-container"); // Pastikan ada elemen dengan ID ini di HTML

  // Fungsi untuk mengambil data buku
  async function fetchBooks() {
    try {
      const response = await fetch("http://localhost:7000/api/buku"); // URL API
      if (!response.ok) throw new Error("Gagal mengambil data buku");

      const books = await response.json();

      // Tampilkan setiap buku menggunakan panelBuku
      books.forEach((book) => {
        const bookElement = panelBuku(
          book.link || "default-image.jpg", // Link gambar atau default
          book.title || "Judul Tidak Tersedia",
          book.publisher || "Publisher Tidak Diketahui",
          book.publication_date
            ? new Date(book.publication_date).getFullYear()
            : "Tahun Tidak Tersedia",
          book.description || "Deskripsi tidak tersedia", book.buku_id, book.rating
        );
        bookContainer.innerHTML += bookElement;
      });
    } catch (error) {
      console.error("Error fetching books:", error);
      bookContainer.innerHTML = `<p class="text-red-500">Gagal memuat data buku</p>`;
    }
  }

  // Panggil fungsi untuk memuat buku
  fetchBooks();
});
const panelBuku = (link, judul, publisher, tahun, deskripsi, id, rating) => {
    link = "https://placehold.co/300x400/png";
    
    // Generate the stars based on the rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fa-solid fa-star"></i>'; // Full star
      } else {
        stars += '<i class="fa-regular fa-star"></i>'; // Empty star
      }
    }
  
    return `<div class="bg-white  shadow-sm p-4 rounded-md w-full transition-all duration-300 ease-in-out mt-4" id="book-item">
              <div class="flex flex-row gap-2">
                <img
                  class="shadow-md -translate-y-8 w-40"
                  src="${link}"
                  alt="${judul}"
                />
                <div class="p-2 flex flex-col justify-between">
                  <div>
                    <h1 class="text-center book-title font-bold mt-2 book-title">${judul}</h1>
                    <div class="flex flex-row justify-between">
                      <p class="text-xs text-gray-500">${publisher}</p>
                      <p class="text-xs text-gray-500">${tahun}</p>
                    </div>
                    <div class="flex flex-row text-yellow-300">
                      ${stars} <!-- Display the stars based on the rating -->
                    </div>
                    <p>${deskripsi}</p>
                  </div>
                  <button 
                    class="pinjam-button flex items-center menubtn-u text-green-400 flex-rows justify-center gap-2" 
                    data-id="${id}" 
                    data-title="${judul}" 
                    data-publisher="${publisher}" 
                    data-year="${tahun}" 
                    data-description="${deskripsi}">
                    <i class="fab fa-readme"></i>
                    <p>Pinjam</p>
                  </button>
                </div>
              </div>
            </div>`;
  };
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const bookContainer = document.getElementById("book-container");
  
    async function searchBooks(title) {
      try {
        const response = await fetch(`http://localhost:7000/api/books/search/${title}`);
        if (!response.ok) {
          throw new Error("Gagal mencari buku.");
        }
        const books = await response.json();
        displayBooks(books);
      } catch (error) {
        console.error(error);
        bookContainer.innerHTML = `<p class="text-red-500">Terjadi kesalahan saat memuat data.</p>`;
      }
    }
  
    function displayBooks(books) {
      bookContainer.innerHTML = ""; // Bersihkan kontainer
      if (books.length === 0) {
        bookContainer.innerHTML = `<p class="text-gray-500">Tidak ada buku yang ditemukan.</p>`;
        return;
      }
      books.forEach((book) => {
        const bookElement = `
          <div class="bg-white shadow-sm p-4 rounded-md w-full transition-all duration-300 ease-in-out mt-4 book-item">
            <div class="flex flex-row gap-2">
              <img
                class="shadow-md -translate-y-8 w-40"
                src="${book.cover || 'https://placehold.co/300x400/png'}"
                alt="${book.title}"
              />
              <div class="p-2 flex flex-col justify-between">
                <div>
                  <h1 class="text-center book-title font-bold mt-2">${book.title}</h1>
                  <div class="flex flex-row justify-between">
                    <p class="text-xs text-gray-500">${book.publisher}</p>
                    <p class="text-xs text-gray-500">${book.publication_date}</p>
                  </div>
                  <p>${book.description}</p>
                </div>
                <button 
                  class="pinjam-button flex items-center menubtn-u text-green-400 flex-rows justify-center gap-2" 
                  data-id="${book.buku_id}" 
                  data-title="${book.title}" 
                  data-publisher="${book.publisher}" 
                  data-year="${book.publication_date}" 
                  data-description="${book.description}">
                  <i class="fab fa-readme"></i>
                  <p>Pinjam</p>
                </button>
              </div>
            </div>
          </div>`;
        bookContainer.innerHTML += bookElement;
      });
    }
  
    // Event listener untuk pencarian
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        searchBooks(query); // Panggil API dengan query
      } else {
        fetchBooks();
      }
    });
  });
  