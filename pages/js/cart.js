$(async function (){
    try {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams.get('id'));
        let id = urlParams.get('id');
        let response = await fetch("/api/menu/order/" + id);
        console.log(response);

        if (response.ok) {
            let data = await response.json();
             console.log(data);
             let menuitem = data.results;
            //   menuarray.forEach(function (menuitem) {
                $(".item").append(`
            <article>
                <h2>${menuitem[0].name}</h2>
                <div>
                    ${menuitem[0].description}<br>
                    Price: ${menuitem[0].price}<br>
                     Category:${menuitem[0].category}
                </div><br>
                <div>
                            <button class="decrease-quantity">-</button>
                            <span class="quantity${menuitem[0].id}">0</span>
                            <button class="increase-quantity">+</button>
                        </div>
                        <button class="add-to-order+" value="${menuitem[0]._id}">Add to order</button>
                         <a href="/editmenuitem?id=${menuitem[0]._id}">Edit</a> -->
                <!-- <a href="/editmenuitem?id=${menuitem[0]._id}">Edit</a> -->
            </article>
            `);
            // }
            // );
            // $(".decrease-quantity").click(decreaseQuantity);
            // $(".increase-quantity").click(increaseQuantity);
            // $(".add-to-order").click(addToOrder);
        } else {
            let err = await response.json();
            console.log(err.message);
            $(".menuitem").append(`
        <div>Error retrieving menu items<div>
        `);
        }

    }
    catch(e){
        console.log("Error: ", e);
    }
})