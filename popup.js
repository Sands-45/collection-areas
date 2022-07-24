// const ul = document.getElementById("collection");
// const ulTwo = document.getElementById("addresses");
// const url =
//   "https://script.google.com/macros/s/AKfycbxMb30Uaf-MDjNbzZKj48sGvy74me5O3yDRzN_MzS9hX8iWRUyqxPtwbQeZVPwJqJH9/exec";
// 
// const urlTwo =
//   "https://script.google.com/macros/s/AKfycbx7CwJgL3jhsMOxuqiceh-JCgcObrIPyikwxR0Ix4nNrWCvVSf6Xlt88R732gthDbQB/exec";
// 
// const modal = document.getElementById("details");
// const deliveryPolygon = document.getElementById("del_polygon");
// const deliveryExamples = document.getElementById("del_area");
// const modalBtn = document.getElementById("closeModal");
// modalBtn.addEventListener("click", () => {
//   modal.style.transform = "scale(0)";
//   while (deliveryPolygon.hasChildNodes()) {
//     deliveryPolygon.removeChild(deliveryPolygon.firstChild);
//   }
//   while (deliveryExamples.hasChildNodes()) {
//     deliveryExamples.removeChild(deliveryExamples.firstChild);
//   }
// });
// const loader = document.getElementById("loader");
// 
// //Collection Areas List ====================================================
// fetch(url)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     if (data.length >= 1) {
//       loader.style.display = "none";
//     }
//     const dataArr = data[0].jsonArray;
//     for (let i = 0; i < dataArr.length; i++) {
//       const element = `
//           <li >
//           <div class="rest"><span> Restaurant :</span><span> ${dataArr[i].restuarant}</span></div>
//           <div class="ext"><span> Extension : </span>${dataArr[i].extension}</div>
//           <div class="region"><span> Region : </span>${dataArr[i].region}</div>
//           <div class="area"><span> Area : </span>${dataArr[i].area}</div>
//         </li>`;
//       ul.innerHTML += element;
//       const list = ul.getElementsByTagName("li");
//       const polygonUl = document.getElementById("del_polygon");
//       const areaUl = document.getElementById("del_area");
//       for (let i = 0; i < list.length; i++) {
//         list[i]?.addEventListener("dblclick", () => {
//           modal.style.transform = "scale(1)";
//           let value = list[i]
//             .getElementsByClassName("rest")[0]
//             .getElementsByTagName("span")[1];
//           let filter = value.innerText || value.textContent;
//           let polygon = dataArr
//             .filter((list) => list.restuarant.trim() === filter.trim())[0]
//             ?.delivery_polygon?.split(",");
//           let areas = dataArr
//             .filter((list) => list.restuarant.trim() === filter.trim())[0]
//             ?.delivery_examples?.split(",");
//           for (let i = 0; i < polygon.length; i++) {
//             polygonUl.innerHTML += `<li>${polygon[i]}</li>`;
//           }
//           for (let i = 0; i < areas.length; i++) {
//             areaUl.innerHTML += `<li>${areas[i]}</li>`;
//           }
//         });
//       }
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// 
// //Addresses List ====================================================
// fetch(urlTwo)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     const dataArr = data[0].jsonArray;
//     for (let i = 0; i < dataArr.length; i++) {
//       const element = `
//         <li>
//           <p>Restaurant:</p>
//           <div class="fields">${dataArr[i].Store_Name}</div>
//           <p>Address:</p>
//           <div class="fields">${dataArr[i].Address}</div>
//           <p>Complex Name (Optional):</p>
//           <div class="fields">${dataArr[i].Complex_Name}</div>
//           <p>Type:</p>
//           <div class="fields">${dataArr[i].Type}</div>
//         </li>`;
//       ulTwo.innerHTML += element;
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// 
// //SearchBar =======================================================
// const searchBar = document.getElementById("search");
// searchBar.addEventListener("keyup", (e) => {
//   // Collections Areas Search Array ===============================
//   let searchArray = document
//     .getElementById("collection")
//     .getElementsByTagName("li");
//   for (let i = 0; i < searchArray.length; i++) {
//     let tag = searchArray[i]
//       .getElementsByClassName("rest")[0]
//       .getElementsByTagName("span")[1];
//     let value = tag.innerText || tag.textContent;
//     if (
//       value
//         ?.toLowerCase()
//         ?.replace(/\s/g, "")
//         .includes(e.target.value?.toLowerCase()?.replace(/\s/g, "")) === true
//     ) {
//       searchArray[i].style.display = "";
//     } else {
//       searchArray[i].style.display = "none";
//     }
//   }
// 
//   // Delivery Addresses Search Array ===============================
//   let searchArrayTwo = document
//     .getElementById("addresses")
//     .getElementsByTagName("li");
//   for (let i = 0; i < searchArrayTwo.length; i++) {
//     let tagOne = searchArrayTwo[i].getElementsByClassName("fields")[0];
//     let tagTwo = searchArrayTwo[i].getElementsByClassName("fields")[1];
//     let tagThree = searchArrayTwo[i].getElementsByClassName("fields")[2];
//     let valueOne = tagOne.innerText || tagOne.textContent;
//     let valueTwo = tagTwo.innerText || tagTwo.textContent;
//     let valueThree = tagThree.innerText || tagThree.textContent;
//     if (
//       valueOne
//         ?.toLowerCase()
//         ?.replace(/\s/g, "")
//         .includes(e.target.value?.toLowerCase()?.replace(/\s/g, "")) === true ||
//       valueTwo
//         ?.toLowerCase()
//         ?.replace(/\s/g, "")
//         .includes(e.target.value?.toLowerCase()?.replace(/\s/g, "")) === true ||
//       valueThree
//         ?.toLowerCase()
//         ?.replace(/\s/g, "")
//         .includes(e.target.value?.toLowerCase()?.replace(/\s/g, "")) === true
//     ) {
//       searchArrayTwo[i].style.display = "";
//     } else {
//       searchArrayTwo[i].style.display = "none";
//     }
//   }
// });
