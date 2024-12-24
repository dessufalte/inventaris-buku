document.getElementById("saveBookButton").addEventListener("click", async (event) => {
    event.preventDefault(); // Mencegah halaman reload
  
    // Ambil data dari form
    const bookData = {
      title: document.getElementById("bookTitle").value,
      rating: parseFloat(document.getElementById("bookRating").value),
      publisher: document.getElementById("bookPublisher").value,
      author: document.getElementById("bookAuthor").value,
      category: document.getElementById("bookCategory").value,
      description: document.getElementById("bookDescription").value,
      stock: parseInt(document.getElementById("bookStock").value, 10),
      ISBN: document.getElementById("bookISBN").value,
      publication_date: document.getElementById("publicationDate").value,
    };
  
    try {
      // Kirim data ke backend
      const response = await fetch("http://localhost:7000/api/buku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Buku berhasil disimpan!");
        fetchBooks();
        console.log(result); // Log respons dari backend
        
        // Menyembunyikan modal dengan menambahkan kelas 'hidden'
        const modal = document.getElementById("addBookModal");
        if (modal) {
          modal.classList.add("hidden"); // Menambahkan kelas 'hidden' untuk menyembunyikan modal
        }
  
        // Pastikan form ada sebelum reset
        const form = document.getElementById("addBookForm");
        if (form) {
          form.reset(); // Reset form setelah data berhasil disimpan
        }
      } else {
        const error = await response.json();
        alert(`Gagal menyimpan buku: ${error.error}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat menyimpan buku.");
    }
  });
  