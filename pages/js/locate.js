(async function(){
    var request = require("request");

    var options = 
    { 
      method: 'POST',
      url: 'https://developers.onemap.sg/privateapi/auth/post/getToken',
      headers: 
       { 
         'cache-control': 'no-cache, max-age=0',
         'content-type': 'application/json'
       },
      json: { email: 'youremail@onemap.sg', password: 'yourpassword' } 
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
})