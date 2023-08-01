(async function () {
    const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."; // Your API key here
  
    const url = "https://www.onemap.gov.sg/api/common/elastic/search";
    const searchVal = "200640";
    const returnGeom = "Y";
    const getAddrDetails = "Y";
    const pageNum = 1;
  
    try {
      const response = await fetch(
        `${url}?searchVal=${searchVal}&returnGeom=${returnGeom}&getAddrDetails=${getAddrDetails}&pageNum=${pageNum}`,
        {
          method: "GET",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const location = await response.json();
        const locationContainer = document.querySelector(".location");
  
        location.forEach(function (address) {
          const article = document.createElement("article");
          const h2 = document.createElement("h2");
          h2.textContent = address.SEARCHVAL;
  
          const div = document.createElement("div");
          div.innerHTML = `
            ${address.BLK_NO}<br>
            ${address.ROAD_NAME}<br>
            ${address.ADDRESS}<br>
          `;
  
          article.appendChild(h2);
          article.appendChild(div);
          article.appendChild(document.createElement("br"));
  
          locationContainer.appendChild(article);
        });
      } else {
        const locationContainer = document.querySelector(".location");
        locationContainer.innerHTML = "<p>No search results</p>";
      }
    } catch (error) {
      console.error("Error:", error);
      const locationContainer = document.querySelector(".location");
      locationContainer.innerHTML = "<p>Something went wrong</p>";
    }
  })();