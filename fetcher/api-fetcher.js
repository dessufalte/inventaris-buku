const getMostBorrowedBook = async () => {
  try {
    // Fetching loan data from API
    const res = await fetch("http://localhost:7000/api/peminjaman"); // Replace with actual API endpoint
    const data = await res.json();

    // Create an object to count how many times each book has been borrowed
    const bookCounts = {};

    // Count the number of times each book is borrowed
    data.forEach((loan) => {
      const bookId = loan.buku.id; // Assuming `loan.buku.id` is the unique identifier for each book
      if (bookCounts[bookId]) {
        bookCounts[bookId]++;
      } else {
        bookCounts[bookId] = 1;
      }
    });

    // Find the book ID with the highest borrow count
    const mostBorrowedBookId = Object.keys(bookCounts).reduce((a, b) =>
      bookCounts[a] > bookCounts[b] ? a : b
    );

    // Fetch the book details using the most borrowed book's ID
    const bookRes = await fetch(`http://localhost:7000/api/buku/${mostBorrowedBookId}`); // Replace with the correct endpoint to fetch book details
    const book = await bookRes.json();

    // Get the list container
    const listOfBook = document.getElementById("listOfBook");
    listOfBook.innerHTML = ""; // Clear the existing content

    // Create and append the most borrowed book item
    const listItem = document.createElement("li");
    listItem.classList.add("p-2", "flex", "flex-row", "cursor-pointer", "justify-between", "hover:bg-blue-300", "text-sm", "font-semibold");

    listItem.innerHTML = `
      <div class="flex flex-row items-center">
        <i class="fa-solid fa-book mr-2"></i>
        <div>
          <p class="font-semibold">${book.title}</p>
          <div class="text-xs font-normal text-gray-500">
            <span>${book.tahun}</span> | <span>${book.isbn}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center border gap-1 border-blue-300 p-2 w-12 rounded-md text-center text-blue-600">
        <p>${bookCounts[mostBorrowedBookId]}</p>
        <i class="fa-solid fa-clock"></i>
      </div>
    `;

    listOfBook.appendChild(listItem);
    listOfBook.appendChild(document.createElement("hr"));

  } catch (error) {
    console.error("Error fetching loan data:", error);
  }
};

// Call the function to get the most borrowed book
getMostBorrowedBook();
