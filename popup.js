/*"content_scripts": [
    {
      "matches": ["http://example.com"],
      "js": ["./contentScript.js"]
    }
  ],*/
// chrome.runtime.onMessage.addListiner((msg)=>{
// 	console,log(msg)
// })

const api_URL =
  "https://script.google.com/macros/s/AKfycbyLIdGDTHE1vZlCHkKhU5G7eT4WhpqMM6tnFgObuPDDXZja_h946mwWpI9kpgIGz1XsLA/exec";

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
var savedData = window.localStorage.getItem("savedData")
  ? JSON.parse(window.localStorage.getItem("savedData"))
  : [];

//Fetch Data ============
chrome?.runtime?.onMessage?.addListener(function (request) {
  window.localStorage.setItem("savedData", JSON.stringify(request));
});

//Fetch Data ============
if (savedData.length <= 0) {
  fetch(api_URL)
    .then((res) => res.json())
    .then((data) => {
      window.localStorage.setItem("savedData", JSON.stringify(data));
    });
}

//Fetch Data Every Minute
setInterval(() => {fetch(api_URL)
  .then((res) => res.json())
  .then((data) => {
    window.localStorage.setItem("savedData", JSON.stringify(data));
  });
  chrome?.runtime?.onMessage?.addListener(function (request) {
    window.localStorage.setItem("savedData", JSON.stringify(request));
  });
}, 30000);

//Update Search Field Based On Local Value
var searchValue = window.localStorage.getItem("searchValue")
  ? JSON.parse(window.localStorage.getItem("searchValue"))
  : [];
document.getElementById("searchRest").value = searchValue;

//Get Seach Value and Search
const searchField = document.getElementById("searchRest");
["change", "keyup", "input", "focus", "blur", "keydown"].forEach((event) => {
  searchField.addEventListener(event, (e) => {
    let typedValue = e.target.value?.replace(/\s|\-/gim, "")?.toLowerCase();
    window.localStorage.setItem(
      "searchValue",
      JSON.stringify(e.target.value?.replace(/\s|\-/gim, "")?.toLowerCase())
    );

    //Filter Results
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

    if (result?.length >= 1 && typedValue?.length > 2) {
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
        <div style="width: 100%;height:8rem;background:#fff;border-radius: 5px;border: solid 1px #cbd5e1;padding:10px;display:flex;flex-direction:column;justify-content: space-between;box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);"
		data-storeId="${res.Store_ID}" class="shop_results">
		<div style="width: 100%;height:25%;font-size: 0.75rem;color:#49586d;">- <strong>${
      res.Restaurant
    }</strong> &rarr; ${res.Region} &rarr; ${res.Area}</div>
		<div style="width: 100%;height:25%;font-size: 0.75rem;color:#49586d;">
			- Extensions : ${res.Extensions}</div>
		<div style="width: 100%;height:25%;font-size: 0.75rem;color:#49586d;">
			- Delivery ${res["Delivery_Time"]} | Collection ${res["Collection_Time"]}</div>
		<div
			style="width: 100%;height:25%;font-size: 0.75rem;color:#475569;display:flex;justify-content: space-between;align-items: center;">
			<div style="width: 100%;height:100%;display:flex;align-items:center;gap:2px;">
				<div
					style="margin-right:5px;margin-left:6px;padding:1px 5px 1px 5px;height:100%;display:flex;align-items:center;background: #f8fafc;border-radius: 2px;border:solid 1px rgba(27, 26, 26, 0.341);">
					${res["Services"]}</div>
				${
          res.Status === "Online"
            ? ` <div
					style="margin-right:5px;padding:1px 8px 1px 8px;height:100%;display:flex;align-items:center;gap:2px;;color:rgb(3, 116, 7);background: rgba(20, 185, 27, 0.1);border-left: 2px solid #14B91B;">
					Online</div>`
            : `
				<div
					style="margin-right:5px;padding:1px 8px 1px 8px;height:100%;display:flex;align-items:center;gap:2px;;color:#F11C1C;background: rgba(241, 28, 28, 0.19);border-left: 2px solid #F11C1C;">
					Offline</div>`
        }
				${
          res["Halaal_Generic"] !== "Halaal"
            ? ` <div
					style="padding:1px 8px 1px 8px;height:100%;display:flex;align-items:center;gap:2px;;color:#2242E9;background:rgba(34, 66, 233, 0.1);border-left: 2px solid #2242E9;">
					Generic</div>`
            : `
				<div
					style="padding:1px 8px 1px 8px;height:100%;display:flex;align-items:center;gap:2px;;color:#F11C1C;background: rgba(241, 28, 28, 0.19);border-left: 2px solid #F11C1C;">
					Halaal</div>`
        }
			</div>
	
			<div style="width: 100%;height:100%;display:flex;align-items:center;justify-content: end;gap:2px;">
				<button onclick="()=>{alert('Hi')}"
					style="margin-right:2px;padding:2px;height:100%;display:flex;align-items:center;outline: none;border: none;background: transparent;color: #49586d;cursor: pointer;font-size:.75rem;text-decoration:underline;"
					class="expandDetails_Btn" data-store-id="${res.Store_ID}">
					<svg data-store-id="${
            res.Store_ID
          }" style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-app-window" width="20" height="20" viewBox="0 0 24 24"
						stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
						<rect x="3" y="5" width="18" height="14" rx="2"></rect>
						<path d="M6 8h.01"></path>
						<path d="M9 8h.01"></path>
					</svg>
				</button>
				<button
					style="margin-right:2px;padding:2px;height:100%;display:flex;align-items:center;outline: none;border: none;background: transparent;color: #49586d;cursor: pointer;"
					class="editDetails" data-store-id="${res.Store_ID}">
					<svg data-store-id="${
            res.Store_ID
          }" style="pointer-events:none;" xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24"
						stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
    } else if (result?.length <= 1 || typedValue?.length <= 2) {
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
});

//Expand Restaurant Details
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("expandDetails_Btn")) {
    let clickedBtn = e.target;
    let details_container = document.getElementById(
      "restaurant_more_details_overlay"
    );
    let closeModal_Btn = document.getElementById("close_details_overlay_btn");
    //Open Overlay
    details_container.style.transform = "scale(1)";
    document.getElementById("save_edits").style.display = "none";
    //Close Overlay
    closeModal_Btn.addEventListener("click", () => {
      details_container.style.transform = "scale(0)";
    });

    //Update Overlay Contents
    const storeRowData = savedData?.data.filter(
      (data) => data["Store_ID"] == clickedBtn.getAttribute("data-store-id")
    )[0];

    //Main Heading
    const heading = document.getElementById("store_name_heading");
    const storeAddress = document.getElementById("storeAddress");
    const generalNotes = document.getElementById("generalNotes");
    const publicAddress = document.getElementById("publicAddress");
    const out_of_stock = document.getElementById("out_of_stock");
    const delivery_polygon = document.getElementById("delivery_polygon");
    const extensions = document.getElementById("extensions");
    const delivery = document.getElementById("delivery");
    const collection = document.getElementById("collection");
    const online_status = document.getElementById("online_status");

    //Set Contents
    heading.innerText = storeRowData?.Restaurant;
    storeAddress.value = storeRowData["Store_Address"];
    generalNotes.value = storeRowData["General_Notes"];
    publicAddress.value = storeRowData["Public_Address"];
    out_of_stock.value = storeRowData["Stock"];
    delivery_polygon.value = storeRowData["Delivery_Polygons"];
    extensions.value = `Extension : ${storeRowData["Extensions"]}`;
    delivery.value = `Delivery - ${storeRowData["Delivery_Time"]}`;
    collection.value = `Collection - ${storeRowData["Collection_Time"]}`;
    online_status.value = storeRowData["Status"];
  }
});

//Expand and Edit Restaurant Details
var editedDetails = {};
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editDetails")) {
    let clickedBtn = e.target;
    let details_container = document.getElementById(
      "restaurant_more_details_overlay"
    );
    let auth_container = document.getElementById("auth_pass_overlay");
    let closeModal_Btn = document.getElementById("close_details_overlay_btn");
    //Open Overlay
    auth_container.style.transform = "scale(1)";
    closeModal_Btn.addEventListener("click", () => {
      details_container.style.transform = "scale(0)";
    });
    //Close Overlay
    closeModal_Btn.addEventListener("click", () => {
      details_container.style.transform = "scale(0)";
      Array.prototype.forEach.call(
        document.getElementsByTagName("textarea"),
        (editor) => {
          editor.readOnly = true;
        }
      );
    });

    //Update Overlay Contents
    const storeRowData = savedData?.data?.filter(
      (data) => data["Store_ID"] == clickedBtn.getAttribute("data-store-id")
    )[0];
    editedDetails = { ...storeRowData };

    //Main Heading
    const heading = document.getElementById("store_name_heading");
    const storeAddress = document.getElementById("storeAddress");
    const generalNotes = document.getElementById("generalNotes");
    const publicAddress = document.getElementById("publicAddress");
    const out_of_stock = document.getElementById("out_of_stock");
    const delivery_polygon = document.getElementById("delivery_polygon");
    const extensions = document.getElementById("extensions");
    const delivery = document.getElementById("delivery");
    const collection = document.getElementById("collection");
    const online_status = document.getElementById("online_status");

    //Set Contents
    heading.innerText = storeRowData?.Restaurant;
    if (storeRowData) {
      storeAddress.value = storeRowData["Store_Address"];
      generalNotes.value = storeRowData["General_Notes"];
      publicAddress.value = storeRowData["Public_Address"];
      out_of_stock.value = storeRowData["Stock"];
      delivery_polygon.value = storeRowData["Delivery_Polygons"];
      extensions.value = `Extension : ${storeRowData["Extensions"]}`;
      delivery.value = `Delivery - ${storeRowData["Delivery_Time"]}`;
      collection.value = `Collection - ${storeRowData["Collection_Time"]}`;
      online_status.value = storeRowData["Status"];
    }

    //Change Editor Editable and Set A new data Object
    Array.prototype.forEach.call(
      document.getElementsByTagName("textarea"),
      (editor) => {
        editor.addEventListener("input", () => {
          editor.id == "extensions"
            ? (editedDetails = {
                ...editedDetails,
                Extensions: editor.value,
              })
            : editor.id == "delivery"
            ? (editedDetails = {
                ...editedDetails,
                Delivery_Time: editor.value,
              })
            : editor.id == "collection"
            ? (editedDetails = {
                ...editedDetails,
                Collection_Time: editor.value,
              })
            : editor.id == "online_status"
            ? (editedDetails = {
                ...editedDetails,
                Status: editor.value,
              })
            : editor.id == "storeAddress"
            ? (editedDetails = {
                ...editedDetails,
                Store_Address: editor.value,
              })
            : editor.id == "generalNotes"
            ? (editedDetails = {
                ...editedDetails,
                General_Notes: editor.value,
              })
            : editor.id == "publicAddress"
            ? (editedDetails = {
                ...editedDetails,
                Public_Address: editor.value,
              })
            : editor.id == "out_of_stock"
            ? (editedDetails = { ...editedDetails, Stock: editor.value })
            : editor.id == "delivery_polygon"
            ? (editedDetails = {
                ...editedDetails,
                Delivery_Polygons: editor.value,
              })
            : "";
        });
      }
    );
  }
});

//Submit Edited Notes And Refresh data
const detailsForm = document.getElementById("restaurant_more_details_overlay");
detailsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //Show Loader
  document.getElementById("updateLoading").style.display = "";
  //Post Data Loader
  fetch(api_URL + "?action=addData", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editedDetails),
  })
    .then(() => "Success")
    .then(() => {
      //Fetch Data ============
      fetch(api_URL)
        .then((res) => res.json())
        .then((data) => {
          window.localStorage.setItem("savedData", JSON.stringify(data));
          savedData = window.localStorage.getItem("savedData")
            ? JSON.parse(window.localStorage.getItem("savedData"))
            : [];

          //Hide Loader
          document.getElementById("updateLoading").style.display = "none";
          document.getElementById(
            "restaurant_more_details_overlay"
          ).style.transform = "scale(0)";
          Array.prototype.forEach.call(
            document.getElementsByTagName("textarea"),
            (editor) => {
              editor.readOnly = true;
            }
          );
        })
        .then(() => {
          //Hide Loader
          document.getElementById("updateLoading").style.display = "none";
          document.getElementById(
            "restaurant_more_details_overlay"
          ).style.transform = "scale(0)";
          Array.prototype.forEach.call(
            document.getElementsByTagName("textarea"),
            (editor) => {
              editor.readOnly = true;
            }
          );
        });
    })
    .catch(() => {
      alert("Failed");

      //Hide Loader
      document.getElementById("updateLoading").style.display = "none";
      document.getElementById(
        "restaurant_more_details_overlay"
      ).style.transform = "scale(0)";
      Array.prototype.forEach.call(
        document.getElementsByTagName("textarea"),
        (editor) => {
          editor.readOnly = true;
        }
      );
    });
});

//Close password modal on btn On click
let auth_container = document.getElementById("auth_pass_overlay");
let close_password_overlay_btn = document.getElementById(
  "close_password_overlay_btn"
);
let details_container = document.getElementById(
  "restaurant_more_details_overlay"
);
close_password_overlay_btn.addEventListener("click", () => {
  auth_container.style.transform = "scale(0)";
  document.getElementById("auth_pass").value = "";
  document.getElementById("wrong_auth").style.display = "none";
  document.getElementById("auth_pass").style.border = "solid 1px #219ebc";
});
//Close And Auntheticate
document.getElementById("auth_edition").addEventListener("submit", (e) => {
  e.preventDefault();
  let pass = document.getElementById("auth_pass").value;
  if (pass == Number(savedData.auth) * 2) {
    document.getElementById("auth_pass").style.border = "solid 1px #219ebc";
    document.getElementById("wrong_auth").style.display = "none";
    auth_container.style.transform = "scale(0)";
    details_container.style.transform = "scale(1)";
    document.getElementById("save_edits").style.display = "";
    Array.prototype.forEach.call(
      document.getElementsByTagName("textarea"),
      (editor) => {
        editor.readOnly = false;
      }
    );
    document.getElementById("auth_pass").value = "";
  } else {
    document.getElementById("wrong_auth").style.display = "";
    document.getElementById("auth_pass").style.border = "solid 1px red";
  }
});
