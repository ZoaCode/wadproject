
$(async function () {

    try {
        let response = await fetch("/api/menu");
        console.log(response);
        if (response.ok) {
            let data = await response.json();
            data.forEach(function (menuitem) {
                $(".menuitem").append(`
            <article>
                <h2>${menuitem.name}</h2>
                <div>
                    ${menuitem.description}<br>
                    Price: ${menuitem.price}<br>
                     Category:${menuitem.category}
                </div><br>
                <div>
                            
                        </div>
                        <!--<button class = "${"add-to-order"}">Add to order</button>-->
                        <!-- <button onclick = "addToOrder">Add to order</button>-->
                          <a href="/menuitem?id=${menuitem._id.toString()}">Add to cart</a> 
                <!-- <a href="/editmenuitem?id=${menuitem._id}">Edit</a> -->
            </article>  
            `);

            }
            );
        
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


    // $("#searchForm").submit(searchEvent);
})


// function decreaseQuantity(number) {
//     let name = ".quantity"+number;
    
//     console.log("click deacrease" + name);
//     let quantityElement = $(this).siblings(name);
//     let quantity = parseInt(quantityElement.text(), 10);
//     if (quantity > 0) {
//         quantity -= 1;
//         quantityElement.text(quantity);
//     }
// }

// function increaseQuantity(number) {
//     let name = ".quantity"+number;
//     console.log("click increasea"+name);
//     let quantityElement = $(this).siblings(name);
//     let quantity = parseInt(quantityElement.text(), 10);
//     quantity += 1;
//     quantityElement.text(quantity);
// }

// function addToOrder(i) {
//     // let menuid = menu.menuid;
//     // let price = menu.price;
//     console.log('adding to order');
//     var currentDate = new Date();
//     var date = currentDate.getDay() + "/"+(currentDate.getMonth()+1)+"/"+currentDate.getFullYear();
//     var time = currentDate.getHours()+":"+currentDate.getMinutes();
//     addOrder(date,time,i,);
// }


// async function addOrder(date,time,i){
//     let accountEntries = {totalprice: 0,paid:false,delivered:false,date: date,time:time};
//     let response = await fetch("/api/order/addorder?token="+sessionStorage.token, {
//         method: "post",
//         body: JSON.stringify(accountEntries),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     if (response.ok) {
//         let data = await response.json();
//         console.log(data);
//         console.log("we added order");
//         let orderbody = {date:date,time:time};
//         let getorderid = await fetch("/api/order/getorder?token="+sessionStorage.token,{
//             method:"post",
//             body: JSON.stringify(orderbody),
//             headers: {
//                 'Content-Type':'application/json'
//             }
//         })

//         if (getorderid.ok){
//             console.log("trying to get orderid");
//             let orderid = await getorderid.json();
//             console.log(orderid);
//             // let quantity = document.getElementById('quantity').text();
//             // let tprice = parseInt(quantity) * price;
//             // let idorder = orderid._id;
//             // let orderitementry = {orderid : idorder,itemID : menuid,quantity:quantity,price:tprice}

//             // let addorderitem  =await fetch("/api/orderitem/addorderitem?token="+sessionStorage.token,{
//             //     method:"post",
//             // body: JSON.stringify(orderitementry),
//             // headers: {
//             //     'Content-Type':'application/json'
//             // }})

//             // if (addorderitem.ok){
//             //     let data = await addorderitem.json();
//             //     console.log(data);
//             //     console.log("we added order item");
//             // }
//             // else {
//             //     console.log("couldn't add order item");
//             //     let err = await addorderitem.json();
//             //     console.log(err.message);
//             // }
//         }
//         else {
//             console.log("couldnt get orderid");
//             let err = await response.json();
//             console.log(err.message);
//         }
//     } else {
//         let err = await response.json();
//         console.log(err.message);
//     }
// }