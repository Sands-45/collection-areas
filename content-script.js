if (typeof init === "undefined") {
  const init = (storeID) => {
    //Fetch Data From Backend =======
    const api_URL =
      "https://script.google.com/macros/s/AKfycbyLIdGDTHE1vZlCHkKhU5G7eT4WhpqMM6tnFgObuPDDXZja_h946mwWpI9kpgIGz1XsLA/exec";
    var yumbi_active_listener_data = window.localStorage.getItem(
      "yumbi_active_listener_data"
    )
      ? JSON.parse(window.localStorage.getItem("yumbi_active_listener_data"))
      : [];

    //Fetch Data ============
    if (yumbi_active_listener_data.length <= 0) {
      fetch(api_URL)
        .then((res) => res.json())
        .then((data) => {
          window.localStorage.setItem(
            "yumbi_active_listener_data",
            JSON.stringify(data)
          );
        });
    }

    //Fetch Data Every Minute
    // setInterval(() => {
    //   fetch(api_URL)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       window.localStorage.setItem(
    //         "yumbi_active_listener_data",
    //         JSON.stringify(data)
    //       );
    //     });
    // }, 1200000);

    //Get The Store Id
    var storeID = window.location.search?.split("&")[0]?.includes("crmStoreId")
      ? window.location.search?.split("&")[0]?.split("=")[1]
      : window.location.href?.split("/")[3]?.includes("restaurant")
      ? window.location.href?.split("/")[4]
      : "";

    window.addEventListener("load", (event) => {
      console.log("kkkkk");
      if (!storeID) {
        storeID = window.location.search?.split("&")[0]?.includes("crmStoreId")
          ? window.location.search?.split("&")[0]?.split("=")[1]
          : window.location.href?.split("/")[3]?.includes("restaurant")
          ? window.location.href?.split("/")[4]
          : "";
      }
    });

    //Filter Data Based On Store Id
    const storeData = yumbi_active_listener_data?.data?.filter(
      (data) => data["Store_ID"] == storeID
    );

    document.addEventListener("input", (e) => {
      if (
        e.target.id == "poiAutoCompleteControl" ||
        e.target.id == "streetAutoCompleteControl"
      ) {
        let notify = document.getElementById("Yumbi_active_Listener_summary");
        notify.innerText = e.target.value;
      }
    });

    document.addEventListener("click", (e) => {
      let detailsBtn = document.getElementById("yumbiObserver_more_details");
      let lessDetailsBtn = document.getElementById(
        "yumbiObserver_less_details"
      );
      let container = document.getElementById("Yumbi_active_Listener");
      let moreDetails = document.getElementById("Yumbi_active_Listener_Full");
      let containerSummary = document.getElementById(
        "Yumbi_active_Listener_summary"
      );
      if (e.target.id == "yumbiObserver_more_details") {
        container.style.height = "35rem";
        container.style.width = "45rem";
        container.style.padding = "5px";
        moreDetails.style.display = "grid";
        containerSummary.style.display = "none";
        detailsBtn.style.display = "none";
        lessDetailsBtn.style.display = "flex";
      } else if (e.target.id == "yumbiObserver_less_details") {
        container.style.height = "2rem";
        container.style.width = "fit-content";
        container.style.padding = "2px 5px 2px 10px";
        moreDetails.style.display = "none";
        containerSummary.style.display = "flex";
        lessDetailsBtn.style.display = "none";
        detailsBtn.style.display = "flex";
      }
    });

    if (storeData?.length >= 1) {
      const injectElement = `
	  <div id="yumbi_container"
          style="position: fixed !important;z-index:1150;top: 10px !important;height:fit-content;width:100vw;display:flex;justify-content:center;pointer-events:none;">
          <div id="Yumbi_active_Listener"
            style="height: 2rem !important;width:fit-content !important;padding:2px 5px 2px 10px !important;border-radius:1rem !important;background:#b91409 !important;color:#fff !important;display: flex !important;justify-content: space-between !important;align-items: center !important;box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;font-size:.8rem !important;pointer-events: auto !important;transition: all .2s ease-in-out;position: relative;">
            <span id="Yumbi_active_Listener_summary" style="color:#fff !important;">${
              storeData[0]["Restaurant"]
            } &rarr; ${storeData[0]["Region"]} &rarr; ${
        storeData[0]["Area"]
      } &nbsp; &nbsp; Ext : ${storeData[0]?.Extensions}</span>
            <button id="yumbiObserver_more_details" type="button"
              style="height: 1.5rem;width:1.5rem;margin-left: .5rem;border-radius: 1rem;border: solid 1px #ccc;color:#b91409 !important;background:#fff !important;display: flex;justify-content: center;align-items: center;padding-top: .25rem;cursor: pointer;">
              <svg style="pointer-events: none;" xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-caret-down" width="20" height="20" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 15l-6 -6l-6 6h12" transform="rotate(180 12 12)"></path>
              </svg>
            </button>
            <button id="yumbiObserver_less_details" type="button"
              style="height: 1.5rem;width:1.5rem;margin-left: .5rem;border-radius: 1rem;border: solid 1px #ccc;color:#b91409 !important;background:#fff !important;display: none;justify-content: center;align-items: center;cursor: pointer;position: absolute;top:3px;right:5px;">
              <svg style="pointer-events: none;"  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-caret-up" width="20"
                height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 15l-6 -6l-6 6h12"></path>
              </svg>
            </button>

            <div
            id="Yumbi_active_Listener_Full"
              style="width:100%;height:100%;background:#fff;border-radius: 10px;display:none;grid-template-columns: repeat(2, minmax(0, 1fr));grid-template-rows: repeat(10, minmax(0, 1fr));grid-gap:8px;padding: 10px;overflow: hidden;">
              <!---=========== Trading Hours ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 1/5;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">Trading Hours</h1>
                <div
                  style="margin: 2px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:1rem;display:grid;width: 96%;height:7.25rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar">${storeData[0][
                    "Operating_Hours"
                  ]
                    ?.split(", ")
                    ?.join("\r\n- ")}
                        </div>
              </div>
              <!---=========== Store Address ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 1/4;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">Store Address</h1>
                <div
                  style="margin: 10px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:4rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar"> ${
                    storeData[0]["Store_Address"]
                  }
                            </div>
              </div>
              <!---===========  General Notes ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 5/9;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">General Notes</h1>
                <div
                  style="margin: 10px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:7.25rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar">${
                    storeData[0]["General_Notes"]
                  }
                                        </div>
              </div>
              <!---===========  Public address ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 4/7;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">Public address</h1>
                <div
                  style="margin: 10px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:4.5rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar">${
                    storeData[0]["Public_Address"]
                  }
                                                    </div>
              </div>
              <!---===========  Out of Stock ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 9/12;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">Out Of Stock</h1>
                <div 
                  style="margin: 10px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:2.5rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar">${
                    storeData[0]["Stock"]
                  }
                                                                </div>
              </div>
              <!---===========  Delivery Polygon ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 7/12;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">Delivery Polygon</h1>
                <div 
                  style="margin: 10px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:7.25rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar">${
                    storeData[0]["Delivery_Polygons"]
                  }
                                                                            </div>
              </div>
            </div>
          </div>
        </div> `;
      injectElement.className = "testSands";
      injectElement.innerHTML = "Sands is esting here";
      document.body.insertAdjacentHTML("beforeend", injectElement);
    }
  };
  init();
}
