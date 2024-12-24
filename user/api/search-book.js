document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const bookContainer = document.getElementById("book-container");

  async function searchBooks(title) {
    try {
      const response = await fetch(
        `http://localhost:7000/api/books/search/${title}`
      );
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
      let stars = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= book.rating) {
          stars += '<i class="fa-solid fa-star"></i>'; // Full star
        } else {
          stars += '<i class="fa-regular fa-star"></i>'; // Empty star
        }
      }
      const bookElement = `<div class="bg-white  shadow-sm p-4 rounded-md w-full transition-all duration-300 ease-in-out mt-4" id="book-item">
              <div class="flex flex-row gap-2">
                <img
                  class="shadow-md -translate-y-8 w-40"
                  src="https://placehold.co/300x400/png"
                  alt="${book.title}"
                />
                <div class="p-2 flex flex-col justify-between">
                  <div>
                    <h1 class="text-center book-title font-bold mt-2 book-title">${book.title}</h1>
                    <div class="flex flex-row justify-between">
                      <p class="text-xs text-gray-500">${book.publisher}</p>
                      <p class="text-xs text-gray-500">${book.publication_date}</p>
                    </div>
                    <div class="flex flex-row text-yellow-300">
                      ${stars} <!-- Display the stars based on the rating -->
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
      searchBooks(query); // Panggil API dengan query
    }
  });
});
