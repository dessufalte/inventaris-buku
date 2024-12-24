$(document).ready(function () {
  // Get userId from URL parameter (assuming the URL is something like /profile/123)
  const urlParams = new URLSearchParams(window.location.search);
  const userId = sessionStorage.getItem("userId");

  if (!userId) {
    alert("Please log in first.");
    return; // Stop execution if user is not logged in
  }

  // Fetch borrowed books from the API for the logged-in user
  function loadBorrowedBooks() {
    $.ajax({
      url: `http://localhost:7000/api/peminjaman/user/${userId}`, // Update URL to include userId in the path
      method: "GET",
      success: function (data) {
        const $borrowedBooksList = $("#borrowedBooksList");
        $borrowedBooksList.empty(); // Clear the current list

        data.forEach((bookRecord) => {
          const book = bookRecord.buku; // Get book details from the related buku object
          const status = bookRecord.status; // Status is fetched directly from the peminjaman record

          // Calculate the remaining time or delay (if any)
          let statusMessage = "";
          const today = new Date();
          const returnDate = new Date(bookRecord.tanggal_kembali);
          const diffTime = returnDate - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert time to days

          if (diffDays > 0) {
            statusMessage = `${diffDays} Hari Tersisa`;
          } else {
            statusMessage = `Terlambat ${Math.abs(diffDays)} Hari`;
          }

          // Use a template to display the data
          const template = $("#bookItemTemplate").html();

          const statusClass = status.includes("Terlambat")
            ? "text-red-500"
            : "text-green-500";

          const bookItem = template
            .replace("{{title}}", book.title)
            .replace(
              "{{cover}}",
              book.cover || "https://via.placeholder.com/100x150"
            )
            .replace("{{borrowDate}}", bookRecord.tanggal_pinjam)
            .replace("{{returnDate}}", bookRecord.tanggal_kembali)
            .replace("{{status}}", statusMessage)
            .replace("{{statusClass}}", statusClass)
            .replace(/{{bookId}}/g, bookRecord.id_peminjaman);

          $borrowedBooksList.append(bookItem);
        });
      },
      error: function (err) {
        console.error("Error fetching borrowed books:", err);
        alert("Terjadi kesalahan saat memuat data peminjaman.");
      },
    });
  }

  // Load borrowed books on page load
  loadBorrowedBooks();

  // Event listeners for actions on the book list
  $(document).on("click", ".baca-btn", function () {
    const bookId = $(this).data("id");
    alert(`Membuka buku dengan ID: ${bookId}`);
  });
  $(document).on("click", ".kembalikan-btn", function () {
    const bookId = $(this).data("id"); // Ambil ID dari data-id tombol yang diklik
    const confirmed = confirm(
      `Apakah Anda yakin ingin mengembalikan buku dengan ID: ${bookId}?`
    );

    if (confirmed) {
      // Mengirimkan permintaan DELETE ke server
      $.ajax({
        url: `http://localhost:7000/api/peminjaman/${bookId}`, // Endpoint untuk menghapus peminjaman
        method: "DELETE",
        success: function () {
          alert(`Buku dengan ID: ${bookId} telah dikembalikan.`);
          // Setelah peminjaman berhasil dihapus, Anda bisa menghapus elemen buku dari daftar
          $(`button[data-id=${bookId}]`).closest(".border").remove(); // Menghapus elemen buku dari tampilan
        },
        error: function (err) {
          console.error("Error deleting loan:", err);
          alert("Terjadi kesalahan saat mengembalikan buku.");
        },
      });
    }
  });
});
