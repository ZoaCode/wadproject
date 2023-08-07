let id;
$(async function(){
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    try{
         let response = await fetch("/api/menu/item/"+id);
    if(response.ok) {
        let data = await response.json();
        // let menuarray = data.results;
        console.log("huh");
        console.log(data);
        console.log(data[0]);
        $(".menuitem").append(`
        <article>
            <h2>${data[0].name}</h2>
            <div>
                ${data[0].description}<br>
                Price: ${data[0].price}<br>
                 Category:${data[0].category}
            </div><br>
            <div>
                        <button class="decrease-quantity">-</button>
                        <span class="quantity">0</span>
                        <button class="increase-quantity">+</button>
                    </div>
                    <!--<button class = "add-to-order">Add to order</button>-->
                    <!-- <button onclick = "addToOrder">Add to order</button>-->
        </article>  
         <button onclick = "addToOrder">Add to order</button>

        `);
           $('.decrease-quantity').click(decreaseQuantity);
    $('.increase-quantity').click(increaseQuantity);
    $('.addToOrder').click(addToOrder());

        
    } else {
        let err = await response.json();
        alert(err.message);
        history.back();
    }
    }
    catch(error){
        console.log("Error:",error);
    }
   


    // $("#editEventForm").submit(editEvent);
    // $("#deleteEventBtn").click(deleteEvent);
})

function decreaseQuantity() {
        let name = ".quantity";
        
        console.log("click deacrease");
        let quantityElement = $(this).siblings(name);
        let quantity = parseInt(quantityElement.text(), 10);
        if (quantity > 0) {
            quantity -= 1;
            quantityElement.text(quantity);
        }
    }
    
    function increaseQuantity() {
        let name = ".quantity";
        console.log("click increasea");
        let quantityElement = $(this).siblings(name);
        let quantity = parseInt(quantityElement.text(), 10);
        quantity += 1;
        quantityElement.text(quantity);
    }
    
    function addToOrder() {
        // let menuid = menu.menuid;
        // let price = menu.price;
        console.log('adding to order');
        var currentDate = new Date();
        var date = currentDate.getDay() + "/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear();
        var time = currentDate.getHours()+":"+currentDate.getMinutes();
        addOrder(date,time);
    }
    
    
    async function addOrder(date,time){
        let accountEntries = {totalprice: 0,paid:false,delivered:false,date: date,time:time};
        let response = await fetch("/api/order/addorder?token="+sessionStorage.token, {
            method: "post",
            body: JSON.stringify(accountEntries),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            let data = await response.json();
            console.log(data);
            console.log("we added order");
            let orderbody = {date:date,time:time};
            let getorderid = await fetch("/api/order/getorder?token="+sessionStorage.token,{
                method:"post",
                body: JSON.stringify(orderbody),
                headers: {
                    'Content-Type':'application/json'
                }
            })
    
            if (getorderid.ok){
                console.log("trying to get orderid");
                let orderid = await getorderid.json();
                console.log(orderid);
                // let orderarray = orderid.message.results;
                let orderarray = orderid.message.results;
                console.log(orderarray[0]);
                // let quantity = document.getElementById('quantity').text();
                // let tprice = parseInt(quantity) * price;
                // let idorder = orderid._id;
                // let orderitementry = {orderid : idorder,itemID : menuid,quantity:quantity,price:tprice}
    
                // let addorderitem  =await fetch("/api/orderitem/addorderitem?token="+sessionStorage.token,{
                //     method:"post",
                // body: JSON.stringify(orderitementry),
                // headers: {
                //     'Content-Type':'application/json'
                // }})
    
                // if (addorderitem.ok){
                //     let data = await addorderitem.json();
                //     console.log(data);
                //     console.log("we added order item");
                // }
                // else {
                //     console.log("couldn't add order item");
                //     let err = await addorderitem.json();
                //     console.log(err.message);
                // }
            }
            else {
                console.log("couldnt get orderid");
                let err = await response.json();
                console.log(err.message);
            }
        } else {
            let err = await response.json();
            console.log(err.message);
        }
    }