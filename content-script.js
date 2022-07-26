if (typeof init === "undefined") {
  //Fetch Data From Backend =======
  const api_URL =
    "https://script.google.com/macros/s/AKfycbyLIdGDTHE1vZlCHkKhU5G7eT4WhpqMM6tnFgObuPDDXZja_h946mwWpI9kpgIGz1XsLA/exec";
  const api_URL2 =
    "https://script.google.com/macros/s/AKfycbyUFShVzlQCASCF36XmGDAX2kuABTGlJn0p9P7F8z2TclnXi1iX2YstwY9EKm0eFyN_kA/exec";
  var yumbi_active_listener_data = window.localStorage.getItem(
    "yumbi_active_listener_data"
  )
    ? JSON.parse(window.localStorage.getItem("yumbi_active_listener_data"))
    : [];
  var restricted_areas_data = window.localStorage.getItem(
    "restricted_areas_data"
  )
    ? JSON.parse(window.localStorage.getItem("restricted_areas_data"))
    : [];

  //Fetch Data ============
  if (
    new Date().getTime() -
      Number(
        window.localStorage.getItem("yumbi_active_listener_data_exp_date")
      ) >
      60000 ||
    !window.localStorage.getItem("yumbi_active_listener_data_exp_date")
  ) {
    fetch(api_URL)
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem(
          "yumbi_active_listener_data",
          JSON.stringify(data)
        );
        chrome.runtime.sendMessage(yumbi_active_listener_data);
        window.localStorage.setItem(
          "yumbi_active_listener_data_exp_date",
          new Date().getTime()
        );
      });
  }
  //Areas Data
  if (
    new Date().getTime() -
      Number(window.localStorage.getItem("restricted_areas_data_exp_date")) >
      3600000 ||
    !window.localStorage.getItem("restricted_areas_data_exp_date")
  ) {
    fetch(api_URL2)
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem(
          "restricted_areas_data",
          JSON.stringify(data)
        );
        window.localStorage.setItem(
          "restricted_areas_data_exp_date",
          new Date().getTime()
        );
      });
  }
  const init = () => {
    //Get The Store Id
    var storeID = window.location.href?.match(
      /(?<=crmStoreId=\s*).*?(?=\s*&)/gs
    )
      ? window.location.href?.match(/(?<=crmStoreId=\s*).*?(?=\s*&)/gs)[0]
      : window.location.href?.split("/")[3]?.includes("restaurant")
      ? window.location.href?.split("/")[4]
      : window.location.href?.match(/(?<=crmStoreId=\s*).{4}/gs)
      ? window.location.href?.match(/(?<=crmStoreId=\s*).{4}/gs)[0]
      : "";

    //Filter Data Based On Store Id or Name
    const storeData = () => {
      if (
        (storeID?.length > 3 &&
          document
            .getElementById("Stores_chosen")
            ?.firstChild?.textContent?.toLowerCase()
            ?.split("(")[0]
            ?.replace(/\s|#/gi, "") == "selectanoption") ||
        !document
          .getElementById("Stores_chosen")
          ?.firstChild?.textContent?.toLowerCase()
          ?.split("(")[0]
          ?.replace(/\s|#/gi, "")
      ) {
        return yumbi_active_listener_data?.data?.filter(
          (data) => data["Store_ID"] == storeID
        );
      } else if (
        document
          .getElementById("Stores_chosen")
          ?.firstChild?.textContent?.toLowerCase()
          ?.split("(")[0]
          ?.replace(/\s|#/gi, "") != "selectanoption"
      ) {
        return yumbi_active_listener_data?.data?.filter(
          (data) =>
            data["Restaurant"]?.replace(/\s/gi, "")?.toLowerCase() ==
            document
              .getElementById("Stores_chosen")
              ?.firstChild?.textContent?.toLowerCase()
              ?.split("(")[0]
              ?.replace(/\s|#/gi, "")
        );
      }
    };

    document.addEventListener("input", (e) => {
      if (
        e.target.id == "poiAutoCompleteControl" ||
        e.target.id == "streetAutoCompleteControl"
      ) {
        // let notify = document.getElementById("Yumbi_active_Listener_summary");
        // notify.innerText = e.target.value;
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
      if (container) {
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
        } else if (!container?.contains(e.target)) {
          container.style.height = "2rem";
          container.style.width = "fit-content";
          container.style.padding = "2px 5px 2px 10px";
          moreDetails.style.display = "none";
          containerSummary.style.display = "flex";
          lessDetailsBtn.style.display = "none";
          detailsBtn.style.display = "flex";
        }
      }
    });

    var offlineStatus = "Online";
    if (
      document.getElementById("offline-label")?.style.display == "" ||
      document.getElementById("offline-label")?.style.display == "block"
    ) {
      offlineStatus = "Offline";
    }

    //Add Event Listener for change in Address And Restricted Based on Selected Store
    var areasRestricted = restricted_areas_data?.data?.filter(
      (area) => area.Restaurant == storeData()[0]?.Restaurant
    );

    let newOrder_Btn = document.getElementById("new-order-btn");
    if (newOrder_Btn) {
      if (
        areasRestricted?.some(
          (area) =>
            document
              .getElementById("UserAddresses_chosen")
              ?.firstChild?.textContent?.toLowerCase()
              ?.replace(/\s/gi, "")
              ?.toLowerCase()
              ?.replace(/\s/gi, "")
              ?.includes(area.Area?.toLowerCase()?.replace(/\s/gi, "")) &&
            Number(area["Time (24 Hours)"]) < Number(new Date().getHours() + 1)
        ) &&
        document.getElementById("IsDelivery")?.checked
      ) {
        newOrder_Btn.disabled = true;
        newOrder_Btn.innerHTML = `<abbr title="${
          areasRestricted?.filter(
            (area) =>
              document
                .getElementById("UserAddresses_chosen")
                ?.firstChild?.textContent?.toLowerCase()
                ?.replace(/\s/gi, "")
                ?.toLowerCase()
                ?.replace(/\s/gi, "")
                ?.includes(area.Area?.toLowerCase()?.replace(/\s/gi, "")) &&
              Number(area["Time (24 Hours)"]) <
                Number(new Date().getHours() + 1)
          )[0]["Notes"]
        }">Not Allowed</abbr>`;
      } else {
        newOrder_Btn.disabled = false;
        newOrder_Btn.innerHTML = "New Order";
      }
    }

    if (storeData()?.length >= 1) {
      const injectElement = `
	  <div id="yumbi_container"
          style="position: fixed !important;z-index:1150;top: 10px !important;height:fit-content;width:100vw;display:flex;justify-content:center;pointer-events:none;">
          <div style="height: 2rem;width:5rem;background-color: ${
            offlineStatus?.toLowerCase() == "online" ? "#16a34a" : "#dc2626"
          };font-size:.8rem !important;letter-spacing:.1rem !important;color:#fff;border-radius: 2rem;margin-right:.5rem;display:flex;justify-content:center;align-items: center;">${offlineStatus}</div>
          <div id="Yumbi_active_Listener"
            style="height: 2rem !important;width:fit-content !important;padding:2px 5px 2px 10px !important;border-radius:1rem !important;background:#b91409 !important;color:#fff !important;display: flex !important;justify-content: space-between !important;align-items: center !important;box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1) !important;font-size:.8rem !important;pointer-events: auto !important;transition: all .2s ease-in-out;position: relative;">
            <span id="Yumbi_active_Listener_summary" style="color:#fff !important;">${
              storeData()[0]["Restaurant"]
            } &nbsp;(${storeData()[0]["Halaal_Generic"]})  &nbsp; &rarr; ${
        storeData()[0]["Region"]
      } &nbsp; &rarr;  &nbsp;${storeData()[0]["Area"]} &nbsp; &nbsp; Ext : ${
        storeData()[0]?.Extensions
      }</span>
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
              style="height: 1.5rem;width:1.5rem;margin-left: .5rem;border-radius: 1rem;border: solid 1px #ccc;color:#b91409 !important;background:#fff !important;display: none;justify-content: center;align-items: center;cursor: pointer;position: absolute;top:-5px;right:-5px;">
              <svg style="pointer-events: none;"  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-caret-up" width="20"
                height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 15l-6 -6l-6 6h12"></path>
              </svg>
            </button>

            <div
            id="Yumbi_active_Listener_Full"
              style="width:100%;height:100%;background:#ccc;border-radius: 10px;display:none;grid-template-columns: repeat(2, minmax(0, 1fr));grid-template-rows: repeat(10, minmax(0, 1fr));grid-gap:8px;padding: 10px;overflow: hidden;">
              <!---=========== Store Details Hours ============-->
               <div class="detailsCards"
              style="grid-column: span 1 / span 1;grid-row: 1/5;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden">
              <h1 style="font-size: .8rem !important;font-weight: 500;color: #219ebc;">Store Details</h1>
              <div 
                style="margin: 8px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:1rem;display:grid;width: 96%;height:1.35rem;border:none;border-left:solid 2px #ccc;text-align:start;	resize: none;"
                class="no-scrollbar::-webkit-scrollbar no-scrollbar">Extension : ${
                  storeData()[0]["Extensions"]
                }
            </div>
              <div 
                style="margin: 2px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:1rem;display:grid;width: 96%;height:1.35rem;border:none;border-left:solid 2px #ccc;text-align:start;	resize: none;"
                class="no-scrollbar::-webkit-scrollbar no-scrollbar">Collection - ${
                  storeData()[0]["Collection_Time"]
                }
            </div>
              <div 
                style="margin: 2px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:1rem;display:grid;width: 96%;height:1.35rem;border:none;border-left:solid 2px #ccc;text-align:start;	resize: none;"
                class="no-scrollbar::-webkit-scrollbar no-scrollbar">Delivery - ${
                  storeData()[0]["Delivery_Time"]
                }
            </div>
              <div 
                style="margin: 2px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:1rem;display:grid;width: 96%;height:1.35rem;border:none;border-left:solid 2px #ccc;text-align:start;	resize: none;"
                class="no-scrollbar::-webkit-scrollbar no-scrollbar">${
                  storeData()[0]["Status"]
                }
            </div>
            </div>
              <!---=========== Store Address ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 1/5;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;height:1.2rem;">Store Address & Trading Hours</h1>
                <div
                  style="margin: 5px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:4.5rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar"> ${
                    storeData()[0]["Store_Address"]
                  }
                  <br/>
                  <br/>
                  ${storeData()[0]["Operating_Hours"]?.replace(
                    /\,/gim,
                    "<br/>"
                  )}
                  </div>
              </div>
              <!---===========  General Notes ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 5/9;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">General Notes</h1>
                <div
                  style="margin: 10px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:7.25rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar">${
                    storeData()[0]["General_Notes"]
                  }
                                        </div>
              </div>
              <!---===========  Public address ============-->
              <div class="detailsCards"
                style="grid-column: span 1 / span 1;grid-row: 5/7;background:#f8fafc;border-radius: 5px;padding: 8px;overflow:hidden;">
                <h1 style="font-size: .8rem;font-weight: 500;color: #219ebc;">Public address</h1>
                <div
                  style="margin: 10px 5px 10px 5px;background:inherit;padding:5px;color:#1e293b;font-size:0.75rem !important;line-height:.9rem;display:grid;width: 96%;height:4.5rem;border:none;text-align:start;	resize: none;"
                  class="no-scrollbar::-webkit-scrollbar no-scrollbar">${
                    storeData()[0]["Public_Address"]
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
                    storeData()[0]["Stock"]
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
                    storeData()[0]["Delivery_Polygons"]
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

  setTimeout(() => {
    init();
  }, 1000);

  //Listen For Store Change and Update Offline Status
  document.body.addEventListener("click", (e) => {
    if (
      document.getElementById("Stores_chosen")?.contains(e.target) ||
      document.getElementById("UserAddresses")?.contains(e.target) ||
      document.getElementById("IsCollect")?.contains(e.target) ||
      document.getElementById("IsDelivery")?.contains(e.target)
    ) {
      setTimeout(() => {
        document.getElementById("yumbi_container")?.remove();
        init();
      }, 1000);
    }

    Array.prototype.forEach.call(
      document.getElementsByClassName("active-result"),
      (elem) => {
        if (elem?.contains(e.target)) {
          setTimeout(() => {
            document.getElementById("yumbi_container")?.remove();
            init();
          }, 1000);
        }
      }
    );
  });

  if (
    window.location.href?.toLowerCase()?.includes("/callcenter-landing?token=")
  ) {
    setTimeout(() => {
      document.getElementById("yumbi_container")?.remove();
      init();
    }, 10000);
  }
}
