const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const PORT = 7000;

// Menggunakan CORS
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Routes untuk Buku
app.get("/api/buku", async (req, res) => {
  try {
    const books = await prisma.buku.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/buku/count", async (req, res) => {
  try {
    // Menghitung jumlah total buku
    const totalBooks = await prisma.buku.count();
    res.json({ totalBooks }); // Mengirimkan total buku
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes untuk mengambil buku berdasarkan ID
app.get("/api/buku/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Mengambil buku berdasarkan ID dari database
    const book = await prisma.buku.findUnique({
      where: { buku_id: parseInt(id) }, // Menggunakan ID buku yang diterima dari URL
    });

    // Jika buku ditemukan, kirimkan data buku
    if (book) {
      res.json(book);
    } else {
      // Jika buku tidak ditemukan, kirimkan error
      res.status(404).json({ error: "Buku tidak ditemukan" });
    }
  } catch (error) {
    // Menangani error jika terjadi kesalahan
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/buku/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const books = await prisma.buku.findMany({
      where: {
        category: {
          equals: category, // Filter berdasarkan kategori
          mode: "insensitive", // Case-insensitive
        },
      },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error("Error saat mencari buku berdasarkan kategori:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan saat mencari buku." });
  }
});

app.post("/api/buku", async (req, res) => {
  const {
    title,
    rating,
    publisher,
    author,
    category,
    description,
    stock,
    ISBN,
    publication_date,
  } = req.body;
  try {
    const book = await prisma.buku.create({
      data: {
        title,
        rating,
        publisher,
        author,
        category,
        description,
        stock,
        ISBN,
        publication_date: new Date(publication_date),
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/buku/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    rating,
    publisher,
    author,
    category,
    description,
    stock,
    ISBN,
    publication_date,
  } = req.body;
  try {
    const book = await prisma.buku.update({
      where: { buku_id: parseInt(id) },
      data: {
        title,
        rating,
        publisher,
        author,
        category,
        description,
        stock,
        ISBN,
        publication_date: publication_date
          ? new Date(publication_date)
          : undefined,
      },
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/buku/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.buku.delete({
      where: { buku_id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes untuk Peminjaman
app.get("/api/peminjaman", async (req, res) => {
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      include: {
        user: true,
        buku: true,
      },
    });
    res.json(peminjaman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/peminjaman/user/:id", async (req, res) => {
  const { id } = req.params; // Retrieve userId from URL parameter
  
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      where: {
        user_id: parseInt(id),  // Use the user_id from URL parameter
      },
      include: {
        buku: true, // Include related book data
      },
    });

    res.json(peminjaman); // Return the filtered peminjaman records
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post("/api/peminjaman", async (req, res) => {
  const { user_id, buku_id, tanggal_kembali, status } = req.body;

  // Validate that required fields are provided
  if (!user_id || !buku_id || !tanggal_kembali || !status) {
    return res.status(400).json({ error: "Semua data harus disertakan" });
  }

  // Validate the date format of 'tanggal_kembali'
  const returnDate = new Date(tanggal_kembali);
  if (isNaN(returnDate)) {
    return res.status(400).json({ error: "Tanggal pengembalian tidak valid" });
  }

  try {
    // Create a new peminjaman record in the database
    const peminjaman = await prisma.peminjaman.create({
      data: {
        user_id,
        buku_id,
        tanggal_kembali: returnDate,
        status, // Status can be something like 'DIPINJAM', 'DIKEMBALIKAN', etc.
      },
    });

    // Return the created peminjaman record as a response
    res.status(201).json(peminjaman);
  } catch (error) {
    console.error("Error creating peminjaman:", error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat memproses peminjaman" });
  }
});

app.put("/api/peminjaman/:id", async (req, res) => {
  const { id } = req.params;
  const { tanggal_dikembalikan, status } = req.body;
  try {
    const peminjaman = await prisma.peminjaman.update({
      where: { id_peminjaman: parseInt(id) },
      data: {
        tanggal_dikembalikan: tanggal_dikembalikan
          ? new Date(tanggal_dikembalikan)
          : undefined,
        status,
      },
    });
    res.json(peminjaman);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/peminjaman/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.peminjaman.delete({
      where: { id_peminjaman: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Gagal mengambil data pengguna." });
  }
});
// Routes untuk User
app.post("/api/user", async (req, res) => {
  const { username, password, peran, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        peran,
        email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/books/search/:title?", async (req, res) => {
  const { title } = req.params;

  try {
    let books;

    if (!title || title.trim() === "") {
      // Jika title kosong, ambil semua data
      books = await prisma.buku.findMany();
    } else {
      // Jika title ada, lakukan pencarian
      books = await prisma.buku.findMany({
        where: {
          title: {
            contains: title, // Menggunakan kolom title
            mode: "insensitive", // Case-insensitive
          },
        },
      });
    }

    console.log("Query Result:", books); // Log hasil pencarian
    res.status(200).json(books);
  } catch (error) {
    console.error("Error saat mencari buku:", error.message); // Log error
    res.status(500).json({ error: "Terjadi kesalahan saat mencari buku." });
  }
});



app.put("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, password, peran, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: { user_id: parseInt(id) },
      data: {
        username,
        password,
        peran,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { user_id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/user/:id", async (req, res) => {
  const userId = parseInt(req.params.id); // Ambil ID dari parameter URL dan ubah menjadi integer

  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID pengguna tidak valid" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId }, // Cari pengguna berdasarkan ID
    });

    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan" });
    }

    res.status(200).json(user); // Kirimkan data pengguna
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Gagal mengambil data pengguna." });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username dan password harus diisi" });
  }

  try {
    // Pastikan username adalah properti unik
    const user = await prisma.user.findUnique({
      where: { username }, // Gunakan findFirst jika username tidak unik
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    res.status(200).json({
      message: "Login berhasil",
      peran: user.peran,
      id: user.user_id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server. Silakan coba lagi." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
