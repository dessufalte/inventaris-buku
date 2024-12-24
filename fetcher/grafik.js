var $ctx = $("#grafik");
var $slb = $("#selectbox");

const ranArray = (max, total) => {
  const array = [];
  for (let i = 0; i < total; i++) {
    array.push(Math.floor(Math.random() * max + 1));
  }
  return array;
};

console.log(ranArray(15, 5));
const crt = new Chart($ctx, {
  type: "line", // Tipe chart line
  data: {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"], // Label di sumbu X
    datasets: [
      {
        data: ranArray(12,7),
        backgroundColor:"rgba(75, 90, 192, 0.8)",
        fill: true, // Tidak mengisi area di bawah garis
        borderColor: "rgba(75, 90, 192, 1)", // Warna garis
        tension: 0.2, // Tingkat kelengkungan garis
        pointRadius: 0, // Ukuran titik
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Warna titik
        pointBorderColor: "#fff", // Warna border titik
        pointBorderWidth: 2, // Lebar border titik
      },
    ],
  },
  options: {
    responsive: true, // Responsif terhadap ukuran layar
    maintainAspectRatio: true, // Tidak memaksakan rasio aspek
    scales: {
      y: {
        beginAtZero: true, // Memastikan sumbu Y dimulai dari nol
      },
      x: {
        display: false,
      }
    },
    plugins: {
      legend: {
        display: false, // Menampilkan legenda
      },
      tooltip: {
        enabled: true, // Menampilkan tooltip saat hover
      },
    },
  },
});
