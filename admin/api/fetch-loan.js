document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch all loan data and display it in the rental list
  async function fetchLoanData() {
    try {
      const response = await fetch("http://localhost:7000/api/peminjaman");
      if (!response.ok) {
        throw new Error("Failed to fetch loan data");
      }

      const data = await response.json(); // Parse the JSON response

      const rentalList = document.getElementById("rentalList");
      rentalList.innerHTML = ""; // Clear current content

      // Loop through the fetched data and populate the rental list
      data.forEach((loan) => {
        const book = loan.buku; // Book details from the related buku object
        const user = loan.user; // User details from the related user object
        const status = loan.status; // Status from the peminjaman record
        const today = new Date();
        const returnDate = new Date(loan.tanggal_kembali);
        const diffTime = returnDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate days difference

        // Determine status message based on the remaining time or delay
        let statusMessage = "";
        if (diffDays > 0) {
          statusMessage = `${diffDays} Hari Tersisa`;
        } else {
          statusMessage = `Terlambat ${Math.abs(diffDays)} Hari`;
        }

        // Create the HTML structure for each loan item
        const loanItem = document.createElement("div");
        loanItem.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "border-b-2",
          "p-2"
        );

        loanItem.innerHTML = `
            <div class="book-item flex space-x-4 items-start">
              <div class="cover-container">
                <img
                  src="${book.cover || "https://via.placeholder.com/100x150"}"
                  alt="Cover Buku"
                  class="w-32 h-48 object-cover border rounded-md"
                />
              </div>
  
              <div>
                <p class="font-semibold">Judul Buku: <span>${
                  book.title
                }</span></p>
                <p class="text-gray-600">Peminjam: ${user.username}</p>
                <p class="text-gray-600">Tanggal Pinjam: ${
                  loan.tanggal_pinjam
                }</p>
                <p class="text-gray-600">Batas Pengembalian: ${
                  loan.tanggal_kembali
                }</p>
                <p class="text-gray-600">Status: <span class="${
                  status === "DIPINJAM" ? "text-green-500" : "text-red-500"
                }">${statusMessage}</span></p>
              </div>
            </div>
  
            <div class="flex space-x-2 items-center">
             <button class="menubtn extend-loan-btn" 
        data-id="${loan.id_peminjaman}" 
        title="Perpanjang Peminjaman" 
        data-tooltip="Perpanjang"
        onclick="extendLoan(${loan.id_peminjaman})">
  <i class="fas fa-redo-alt"></i>
</button>
  
              <button class="menubtn" title="Pinjam Buku" data-tooltip="Pinjam">
                <i class="fas fa-book"></i>
              </button>
  
              <button class="menubtn" title="Kembalikan Buku" data-tooltip="Kembalikan">
                <i class="fas fa-undo"></i>
              </button>
            </div>
          `;

        // Append the newly created loan item to the rental list
        rentalList.appendChild(loanItem);
      });
    } catch (error) {
      console.error("Error fetching loan data:", error);
      alert("Terjadi kesalahan saat mengambil data peminjaman.");
    }
  }

  // Call fetchLoanData to load the data on page load
  fetchLoanData();
});

async function extendLoan(id) {
  try {
    const today = new Date();
    const newReturnDate = new Date(today.setDate(today.getDate() + 3)); // Add 3 days to the current date

    const response = await fetch(`http://localhost:7000/api/peminjaman/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tanggal_dikembalikan: newReturnDate.toISOString().split("T")[0], // Format the date as YYYY-MM-DD
        status: "DIPINJAM", // Assuming the status remains the same
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to extend loan");
    }

    const data = await response.json();
    console.log("Loan extended:", data);

    // Update the return date in the UI
    const returnDateElement = document.getElementById(`returnDate-${id}`);
    if (returnDateElement) {
      returnDateElement.textContent = newReturnDate.toISOString().split("T")[0]; // Update the date in the DOM
    }
  } catch (error) {
    console.error("Error extending loan:", error);
    alert("Terjadi kesalahan saat memperpanjang peminjaman.");
  }
}
