document.addEventListener("DOMContentLoaded", () => {
  const borrowModal = document.getElementById("borrowBookModal");
  const bookDetails = document.getElementById("bookDetails");
  const closeBorrowModalButton = document.getElementById(
    "closeBorrowModalButton"
  );
  const cancelBorrowButton = document.getElementById("cancelBorrowButton");
  const confirmBorrowButton = document.getElementById("confirmBorrowButton");
  const userId = sessionStorage.getItem("userId");
  let bookIds
  // Fungsi untuk membuka modal dengan detail buku
  const openBorrowModal = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:7000/api/buku/${bookId}`);
      if (!response.ok) {
        throw new Error(`Gagal mengambil data buku: ${response.statusText}`);
      }
      const book = await response.json();
      bookIds = bookId
      // Masukkan data buku ke dalam modal
      bookDetails.innerHTML = `
          <p><strong>Judul:</strong> ${book.title}</p>
          <p><strong>Penerbit:</strong> ${book.publisher}</p>
          <p><strong>Tahun Terbit:</strong> ${
            book.publication_date.split("T")[0]
          }</p>
          <p><strong>Deskripsi:</strong> ${book.description}</p>
          <p><strong>Stok:</strong> ${book.stock}</p>
          <p><strong>Stok:</strong> ${userId}</p>
        `;
        
      console.log("User ID is stored in sessionStorage:", userId);
      borrowModal.classList.remove("hidden");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengambil data buku.");
    }
  };

  // Tutup modal
  const closeBorrowModal = () => {
    borrowModal.classList.add("hidden");
  };

  // Event listener untuk tombol Pinjam
  document.addEventListener("click", (event) => {
    if (event.target.closest(".pinjam-button")) {
      const button = event.target.closest(".pinjam-button");
      const bookId = button.dataset.id;
      openBorrowModal(bookId); // Ambil data buku berdasarkan ID
    }
  });

  // Event listener untuk tombol Tutup dan Batal
  closeBorrowModalButton.addEventListener("click", closeBorrowModal);
  cancelBorrowButton.addEventListener("click", closeBorrowModal);
  const borrowBook = async (bookId) => {
    // Get the current date
    const currentDate = new Date();

    // Calculate the return date (7 days later)
    const tanggalKembali = new Date(
      currentDate.setDate(currentDate.getDate() + 7)
    )
      .toISOString()
      .split("T")[0]; // Format as YYYY-MM-DD

    const status = "DIPINJAM"; // Status for borrowing
    const userId = sessionStorage.getItem("userId"); // Retrieve userId from session storage

    // Check if user is logged in (userId exists)
    if (!userId) {
      alert("User tidak terdaftar. Silakan login terlebih dahulu.");
      return;
    }

    // Send POST request to create a peminjaman record
    try {
        alert("Book id" + bookIds + "User id" + userId + "tgl " + tanggalKembali + "status" + status)
      const response = await fetch("http://localhost:7000/api/peminjaman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId), // Send the userId from session storage
          buku_id: parseInt(bookId), // Send the bookId
          tanggal_pinjam: currentDate,
          tanggal_kembali: tanggalKembali, // Send the automatically calculated return date
          tanggal_dikembalikan: "",
          status: status, // Send the status
        }),
      });

      // Handle response from the server
      if (response.ok) {
        const peminjaman = await response.json();
        alert("Buku berhasil dipinjam!", response.body );
        closeBorrowModal(); // Close modal after successful borrowing
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`); // Display error message if any
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Terjadi kesalahan saat meminjam buku.");
    }
  };

  // Event listener for the 'Konfirmasi Pinjam' button
  confirmBorrowButton.addEventListener("click", () => {
    borrowBook(bookIds); // Call the borrowBook function
  });


});
