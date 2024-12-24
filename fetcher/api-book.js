$.ajax({
    url: `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=10`,
    method: "GET",
    success: function(data) {
      // Proses hasil di sini
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert('Terjadi kesalahan saat mengambil data buku.');
    }
  });
  