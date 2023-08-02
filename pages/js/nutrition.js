$(async function(){
    const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=1lb%20brisket%20with%20fries';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b61e9382e8mshcc1f3105730c2c0p127562jsn78ddef4905d1',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    try {
        console.log("try worked");
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            console.log('response is ok');
            // let data = await response.json();
            result.forEach(function (food) {
                $(".ok").append(`
                <article>
                    <h2>${food.name}</h2>
                    <div>
                    <div>yay</div><br>
                        
                    </div><br>
                </article>  
                `);
            });
        } else {
            console.log("response went wrong 1");
            let err = await response.json();
            console.log(err.message);
        }

        console.log(result);
    } catch (error) {
        console.log("error catch");
        console.error(error);
    }
})