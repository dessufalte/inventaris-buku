document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch all loan data
    async function fetchStatusData() {
      try {
        const response = await fetch("http://localhost:7000/api/peminjaman");
        if (!response.ok) {
          throw new Error("Failed to fetch loan data");
        }
        const data = await response.json(); // Parse the JSON response
  
        console.log("Fetched loan data:", data); // Add logging to check if data is fetched correctly
  
        const statusList = document.getElementById("statusList");
        statusList.innerHTML = ""; // Clear current content
  
        // Loop through the fetched data and display all loans
        data.forEach((loan) => {
          const book = loan.buku; // Book details from the related buku object
          const status = loan.status; // Status from the peminjaman record
          const returnDate = new Date(loan.tanggal_kembali); // Convert return date to Date object
  
          console.log("Processing loan:", loan); // Log each loan to check its data
  
          // Create the HTML structure for each loan status item
          const statusItem = document.createElement("div");
          statusItem.classList.add("flex", "justify-between", "items-center", "border-b-2", "p-2");
  
          statusItem.innerHTML = `
              <div>
                <p class="font-semibold">Judul Buku: <span>${book.title}</span></p>
                <p class="text-gray-600">
                  Status:
                  <span class="text-yellow-500">${status}</span>
                </p>
                <p class="text-gray-600">
                  Tanggal Pengembalian: ${returnDate.toISOString().split("T")[0]}
                </p>
              </div>
              <div class="flex items-center">
                <i class="fas fa-clock text-yellow-500 text-2xl"></i>
              </div>
            `;
  
          // Append the newly created status item to the status list
          statusList.appendChild(statusItem);
        });
  
        // If no loans found, show a message (optional)
        if (statusList.children.length === 0) {
          const noDataMessage = document.createElement("div");
          noDataMessage.textContent = "Tidak ada data peminjaman.";
          statusList.appendChild(noDataMessage);
        }
      } catch (error) {
        console.error("Error fetching loan status data:", error);
        alert("Terjadi kesalahan saat mengambil data peminjaman.");
      }
    }
  
    // Call fetchStatusData to load the data on page load
    fetchStatusData();
  });
  