// const ul = document.getElementById("collection");
// const ulTwo = document.getElementById("addresses");
// const url =
//   "https://script.google.com/macros/s/AKfycbxMb3"none"Uaf-MDjNbzZKj48sGvy74me5O3yDRzN_MzS9hX8iWRUyqxPtwbQeZVPwJqJH9/exec";
//
// const urlTwo =
//   "https://script.google.com/macros/s/AKfycbx7CwJgL3jhsMOxuqiceh-JCgcObrIPyikwxR"none"Ix4nNrWCvVSf6Xlt88R732gthDbQB/exec";
//
// const modal = document.getElementById("details");
// const deliveryPolygon = document.getElementById("del_polygon");
// const deliveryExamples = document.getElementById("del_area");
// const modalBtn = document.getElementById("closeModal");
// modalBtn.addEventListener("click", () => {
//   modal.style.display = "scale("none")";
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
//     const dataArr = data["none"].jsonArray;
//     for (let i = "none"; i < dataArr.length; i++) {
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
//       for (let i = "none"; i < list.length; i++) {
//         list[i]?.addEventListener("dblclick", () => {
//           modal.style.display = "";
//           let value = list[i]
//             .getElementsByClassName("rest")["none"]
//             .getElementsByTagName("span")[1];
//           let filter = value.innerText || value.textContent;
//           let polygon = dataArr
//             .filter((list) => list.restuarant.trim() === filter.trim())["none"]
//             ?.delivery_polygon?.split(",");
//           let areas = dataArr
//             .filter((list) => list.restuarant.trim() === filter.trim())["none"]
//             ?.delivery_examples?.split(",");
//           for (let i = "none"; i < polygon.length; i++) {
//             polygonUl.innerHTML += `<li>${polygon[i]}</li>`;
//           }
//           for (let i = "none"; i < areas.length; i++) {
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
//     const dataArr = data["none"].jsonArray;
//     for (let i = "none"; i < dataArr.length; i++) {
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
//   for (let i = "none"; i < searchArray.length; i++) {
//     let tag = searchArray[i]
//       .getElementsByClassName("rest")["none"]
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
//   for (let i = "none"; i < searchArrayTwo.length; i++) {
//     let tagOne = searchArrayTwo[i].getElementsByClassName("fields")["none"];
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

// chrome.runtime.onMessage.addListiner((msg)=>{
// 	console,log(msg)
// })

const api_URL =
  "https://script.google.com/macros/s/AKfycbyUd6XPdiWaouLnCH2bkR47sZotSqGKTlxy7pxT9OvGlTpnYi9dl6av2LtYid4Aq663Bg/exec";

const navContainer = document.getElementById("navContainer");

//Switch Tabs =========================
//Display Current Selected Tab ============
navContainer.addEventListener("click", (e) => {
  const BtnOne = document.getElementById("tab_one_btn");
  const BtnTwo = document.getElementById("tab_two_btn");
  const BtnThree = document.getElementById("tab_three_btn");
  const BtnFour = document.getElementById("tab_four_btn");

  //All tabs
  const tabs = document.getElementsByClassName("tab");
  const tabs_buttons = document.getElementsByClassName("tab_btn");

  //handle Button Click ========
  if (BtnOne.contains(e.target)) {
    Array.prototype.forEach.call(tabs, (tab) => {
      if (tab.id === "tabOne") {
        tab.style.display = "";
      } else {
        tab.style.display = "none";
      }
    });
    Array.prototype.forEach.call(tabs_buttons, (button) => {
      if (button.id === BtnOne.id) {
        button.classList.add("active_tab_btn");
      } else {
        button.classList.remove("active_tab_btn");
      }
    });
  } else if (BtnTwo.contains(e.target)) {
    Array.prototype.forEach.call(tabs, (tab) => {
      if (tab.id === "tabTwo") {
        tab.style.display = "flex";
      } else {
        tab.style.display = "none";
      }
    });
    Array.prototype.forEach.call(tabs_buttons, (button) => {
      if (button.id === BtnTwo.id) {
        button.classList.add("active_tab_btn");
      } else {
        button.classList.remove("active_tab_btn");
      }
    });
  } else if (BtnThree.contains(e.target)) {
    Array.prototype.forEach.call(tabs, (tab) => {
      if (tab.id === "tabThree") {
        tab.style.display = "flex";
      } else {
        tab.style.display = "none";
      }
    });
    Array.prototype.forEach.call(tabs_buttons, (button) => {
      if (button.id === BtnThree.id) {
        button.classList.add("active_tab_btn");
      } else {
        button.classList.remove("active_tab_btn");
      }
    });
  } else if (BtnFour.contains(e.target)) {
    Array.prototype.forEach.call(tabs, (tab) => {
      if (tab.id === "tabFour") {
        tab.style.display = "flex";
      } else {
        tab.style.display = "none";
      }
    });
    Array.prototype.forEach.call(tabs_buttons, (button) => {
      if (button.id === BtnFour.id) {
        button.classList.add("active_tab_btn");
      } else {
        button.classList.remove("active_tab_btn");
      }
    });
  }
});

//Display Collection Searched Results On none
const searchContainer = document.getElementById("searchedResults");
const savedData = window.localStorage.getItem("savedData")
  ? JSON.parse(window.localStorage.getItem("savedData"))
  : [];

//Fetch Data ============
if (savedData.length <= 0) {
  fetch(api_URL)
    .then((res) => res.json())
    .then((data) => {
      window.localStorage.setItem("savedData", JSON.stringify(data));
    })
    .then((error) => console.log(error));
}

//Get Seach Value and Search
const searchField = document.getElementById("searchRest");
searchField.addEventListener("input", (e) => {
  let typedValue = e.target.value?.replace(/\s|\-/gim, "")?.toLowerCase();

  //Filter Results
  console.log(typedValue?.split(/\.|\,/g));
  let result =
    typedValue?.split(/\.|\,/g)?.length >= 2
      ? savedData?.data?.filter(
          (res) =>
            typedValue
              ?.split(/\.|\,/g)
              ?.filter((str) =>
                res.Restaurant?.replace(/\s|\-/gim, "")
                  ?.toLowerCase()
                  ?.includes(str)
              ).length === typedValue?.split(/\.|\,/g)?.length
        )
      : typedValue?.includes("#")
      ? savedData?.data?.filter((res) =>
          res["Store_Address"]
            ?.replace(/\s|\-/gim, "")
            ?.toLowerCase()
            ?.includes(typedValue?.replace(/\#/g, ""))
        )
      : typedValue?.includes("*")
      ? savedData?.data?.filter((res) =>
          res.Area?.replace(/\s|\-/gim, "")
            ?.toLowerCase()
            ?.includes(typedValue?.replace(/\*/g, ""))
        )
      : savedData?.data?.filter((res) =>
          res.Restaurant?.replace(/\s|\-/gim, "")
            ?.toLowerCase()
            ?.includes(typedValue)
        );

  //Remove Old Results
  Array.prototype.forEach.call(
    document.getElementsByClassName("shop_results"),
    (result) => result.remove()
  );

  if (result.length >= 1 && typedValue?.length > 2) {
    //Remove Old Results
    Array.prototype.forEach.call(
      document.getElementsByClassName("shop_results"),
      (result) => result.remove()
    );
    document.getElementById("noresImg")
      ? (document.getElementById("noresImg").style.display = "none")
      : "";
    document.getElementById("placeholderText")
      ? (document.getElementById("placeholderText").style.display = "none")
      : "";

    //Display Results ========
    result?.slice(0, 3).forEach((res) => {
      searchContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div
            style="width: 100%;height:8rem;background:#fff;border-radius: 10px;border: solid 1px #cbd5e1;padding:10px;display:flex;flex-direction:column;justify-content: space-between;box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);"
            data-storeId="${res.Store_ID}" class="shop_results">
            <div style="width: 100%;height:25%;font-size: 0.75rem;color:#49586d;">- ${
              res.Restaurant
            } &rarr; ${res.Region} &rarr; ${res.Area}</div>
            <div style="width: 100%;height:25%;font-size: 0.75rem;color:#49586d;">
              - Extensions : ${res.Extensions}</div>
            <div style="width: 100%;height:25%;font-size: 0.75rem;color:#49586d;">
              - Delivery ${res["Delivery_Time"]} | Collection ${
          res["Collection_Time"]
        }</div>
            <div
              style="width: 100%;height:25%;font-size: 0.75rem;color:#475569;display:flex;justify-content: space-between;align-items: center;">
              <div style="width: 100%;height:100%;display:flex;align-items:center;gap:2px;">
                <div
                  style="margin-right:5px;margin-left:6px;padding:1px 5px 1px 5px;height:100%;display:flex;align-items:center;background: rgba(204, 204, 204, 0.462);border-radius: 2px;border:solid 1px rgba(27, 26, 26, 0.341);">
                  ${res.Services}</div>
                  ${
                    res.Status === "Online"
                      ? ` <div
                  style="padding:1px 8px 1px 8px;height:100%;display:flex;align-items:center;gap:2px;;color:rgb(3, 116, 7);background: rgba(20, 185, 27, 0.1);border-left: 3px solid #14B91B;">
                  Online</div>`
                      : `
                <div
                  style="padding:1px 8px 1px 8px;height:100%;display:flex;align-items:center;gap:2px;;color:#F11C1C;background: rgba(241, 28, 28, 0.19);border-left: 3px solid #F11C1C;">
                  Offline</div>`
                  }
              </div>
              
              <div style="width: 100%;height:100%;display:flex;align-items:center;justify-content: end;gap:2px;">
                <button onclick="()=>{alert('Hi')}" style="margin-right:2px;padding:2px;height:100%;display:flex;align-items:center;outline: none;border: none;background: transparent;color: #49586d;cursor: pointer;" class="expandDetailt" id="${
                  res.Store_ID
                }">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-square" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <line x1="12" y1="8" x2="12.01" y2="8"></line>
   <rect x="4" y="4" width="16" height="16" rx="2"></rect>
   <polyline points="11 12 12 12 12 16 13 16"></polyline>
</svg>
                </button>
                <button 
                  style="margin-right:2px;padding:2px;height:100%;display:flex;align-items:center;outline: none;border: none;background: transparent;color: #49586d;cursor: pointer;"  class="editDetails" id="${
                    res.Store_ID
                  }"d>
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="18"
                    height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                    <path d="M16 5l3 3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `
      );
    });
  } else if (result.length <= 1 || typedValue?.length <= 2) {
    //Remove Old Results
    Array.prototype.forEach.call(
      document.getElementsByClassName("shop_results"),
      (result) => result.remove()
    );
    document.getElementById("noresImg")
      ? (document.getElementById("noresImg").style.display = "")
      : "";
    document.getElementById("placeholderText")
      ? (document.getElementById("placeholderText").style.display = "")
      : "";
  }
});
