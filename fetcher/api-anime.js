const $gridAnime = $("#gridAnime");

const panelAnime = (link, judul, studio, tahun, deskripsi) => {
  return `<div class="bg-white shadow-sm p-4 rounded-md w-full transition-all duration-300 ease-in-out mt-4">
          <div class="flex flex-row gap-2">
            <img
              class="shadow-md -translate-y-8 w-40"
              src="${link}"
              alt=""
              srcset=""
            />
            <div class="p-2 flex flex-col justify-between">
            <div class="">
              <h1 class="text-center font-bold mt-2">${judul}</h1>
              <div class="flex flex-row justify-between">
                <p class="text-xs text-gray-500">${studio}</p>
                <p class="text-xs text-gray-500">${tahun}</p>
              </div>
              <div class="flex flex-row text-yellow-300">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p>${deskripsi}</p>
            </div>
             <div class="menubtn-u text-green-400 flex flex-rows justify-center gap-2">
                <i class="fab fa-readme"></i>
                <p>Pinjam</p>
              </div>
            </div>
          </div>
          <p></p>
        </div>`;
};

const getAnime = async () => {
  try {
    const res = await $.ajax({
      url: "https://api.jikan.moe/v4/top/anime",
      method: "GET",
    });
    res.data.forEach((anime) => {
      console.log(anime.images.webp.image_url);
      const animepreProcessed = (sipnosis) => {
        if (sipnosis.length > 180) {
          return sipnosis.substring(0, 180) + "...";
        }
        return sipnosis;
      };
      $gridAnime.append(
        panelAnime(
          anime.images.webp.image_url,
          anime.title,
          anime.studios[0].name,
          anime.year,
          animepreProcessed(anime.synopsis)
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
};
// const getBook = async () => {
//     try {
//       const res = await $.ajax({
//         url: "https://stephen-king-api.onrender.com/api/books",
//         method: "GET",
//       });

//       $("#listOfBook").empty();
//       res.data.forEach((book) => {
//         $("#listOfBook").append(`
//               <li class="p-2 flex flex-row cursor-pointer justify-between hover:bg-blue-300 text-sm font-semibold">
//                 <div class="flex flex-row items-center">
//                   <i class="fa-solid fa-book mr-2"></i>
//                   <div>
//                     <p class="font-semibold">${book.Title}</p>
//                     <div class="text-xs font-normal text-gray-500">
//                       <span>${book.Year}</span> | <span>${book.ISBN}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="flex items-center border gap-1 border-blue-300 p-2 w-12 rounded-md text-center text-blue-600">
//                   <p>${Math.floor(Math.random() * 15)}</p>
//                   <i class="fa-solid fa-clock"></i>
//                 </div>
//               </li>
//               <hr />
//             `);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   $("#listOfBook").append("Fetching...");
//   getBook();

getAnime();
