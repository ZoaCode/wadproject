// const { urlencoded } = require("express");

$(async function () {
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYTc5OWJhM2VmYzVlN2Q5ODY3MTM4MzJmNDBhNGM1NCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjkwODk5MzUwLCJleHAiOjE2OTExNTg1NTAsIm5iZiI6MTY5MDg5OTM1MCwianRpIjoiZVplOTZaNTl3Um0wVEUwWCIsInVzZXJfaWQiOjIyOCwiZm9yZXZlciI6ZmFsc2V9.llXauT_AHbQG-rMj3GTcGq5qAvQI2HBFrc6VCfUJ0h4"; // Your API key here

  // const url = "https://www.onemap.gov.sg/api/common/elastic/search";
  // const searchVal = "200640";
  // const returnGeom = "Y";
  // const getAddrDetails = "Y";
  // const pageNum = 1;

  // try {
  //   const response = await fetch( `${url}?searchVal=${searchVal}&returnGeom=${returnGeom}&getAddrDetails=${getAddrDetails}&pageNum=${pageNum}`,
  //     {
  //       method: "GET",
  //       // params: {
  //       //   searchVal : searchVal,
  //       //   returnGeom: returnGeom,
  //       //   getAddrDetails: getAddrDetails,
  //       //   pageNum: pageNum
  //       // },
  //       headers: {
  //         Authorization: apiKey,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     const location = await response.json();
  //     const locationContainer = document.querySelector(".location");

  //     location.forEach(function (address) {
  //       const article = document.createElement("article");
  //       const h2 = document.createElement("h2");
  //       h2.textContent = address.SEARCHVAL;

  //       const div = document.createElement("div");
  //       div.innerHTML = `
  //         ${address.BLK_NO}<br>
  //         ${address.ROAD_NAME}<br>
  //         ${address.ADDRESS}<br>
  //       `;

  //       article.appendChild(h2);
  //       article.appendChild(div);
  //       article.appendChild(document.createElement("br"));

  //       locationContainer.appendChild(article);
  //     });
  //   } else {
  //     const locationContainer = document.querySelector(".location");
  //     locationContainer.innerHTML = "<p>No search results</p>";
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  //   const locationContainer = document.querySelector(".location");
  //   locationContainer.innerHTML = "<p>Something went wrong</p>";
  // }
//   var myHeaders = new Headers();
// myHeaders.append("searchVal", "200640");
// myHeaders.append("returnGeom", "y");
// myHeaders.append("getAddrDetails", "y");
// myHeaders.append("pageNum", "1");
// myHeaders.append("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYTc5OWJhM2VmYzVlN2Q5ODY3MTM4MzJmNDBhNGM1NCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjkwODk5MzUwLCJleHAiOjE2OTExNTg1NTAsIm5iZiI6MTY5MDg5OTM1MCwianRpIjoiZVplOTZaNTl3Um0wVEUwWCIsInVzZXJfaWQiOjIyOCwiZm9yZXZlciI6ZmFsc2V9.llXauT_AHbQG-rMj3GTcGq5qAvQI2HBFrc6VCfUJ0h4", "");
// myHeaders.append("Cookie", "_toffsuid=rB8E8GTJFNkJdX4+Bvg+Ag==");

// var urlencoded = new URLSearchParams();

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   // body: urlencoded,
//   redirect: 'follow'
// };
  try {
    let response =  await fetch("https://developers.onemap.sg/commonapi/search?searchVal=610113&returnGeom=Y&getAddrDetails=Y")
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      let addressarray = data.results;
      // console.log(data.results[0].results[0].searchval);
        addressarray.forEach(function (address) {
            $(".location").append(`
            <article>
                <h2>${address.SEARCHVAL}</h2>
                <div>
                    ${address.BLK_NO}<br>
                   
                </div><br>
                <!--<a href="/editaddress?id=${address._id}">Edit</a>-->
            </article>  
            `);
        });
    } else {
        let err = await response.json();
        console.log(err.message);
    }}
  catch (error) {
    console.error("Error:", error);
    const locationContainer = document.querySelector(".location");
    locationContainer.innerHTML = "<p>Something went wrong</p>";
  }

  // $(".findlink").onclick(findus);


})();

// async function findus(){

// }


// (async function(){
//   const data = JSON.stringify(false);
      
// const xhr = new XMLHttpRequest();
      
// xhr.withCredentials = true;
      
// xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === this.DONE) {
//           console.log(this.responseText);
//         }
//       });
      
// xhr.open("GET", "https://www.onemap.gov.sg/api/common/elastic/search?searchVal=200640&returnGeom=Y&getAddrDetails=Y&pageNum=1");
      
// xhr.setRequestHeader("Authorization", 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYTc5OWJhM2VmYzVlN2Q5ODY3MTM4MzJmNDBhNGM1NCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjkwODk5MzUwLCJleHAiOjE2OTExNTg1NTAsIm5iZiI6MTY5MDg5OTM1MCwianRpIjoiZVplOTZaNTl3Um0wVEUwWCIsInVzZXJfaWQiOjIyOCwiZm9yZXZlciI6ZmFsc2V9.llXauT_AHbQG-rMj3GTcGq5qAvQI2HBFrc6VCfUJ0h4');
      
// xhr.send(data);
// console.log(data);
// })