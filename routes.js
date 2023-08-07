const express = require('express');
const path = require('path');
const router = express.Router();
const crypto = require('crypto');
const cors = require('cors');


router.use(express.urlencoded({extended:true}));

const db = require('./services/dbservice.js');
db.connect()
.then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error.message);
});

function authenticationCheck(req,res,next) {
    //check if query token is in the url
    let token = req.query.token;
    if(!token) {
        res.status(401).json({"message":"No tokens are provided."});
    } else {
        db.checkToken(token)
        .then(function(response){
            //Matched token in the db, proceed with the request
            if(response) {
                //response = organizer who is logged in.
                // store the organizer's id in local memory to be used in the route handler
                res.locals.userID = response._id;
                next();
            } else {
                res.status(401).json({"message":"Invalid token provided."});
            }
        })
        .catch(function(error){
            res.status(500).json({"message":error.message});
        });
    }
};



// router.get('/api/menu',authenticationCheck);

router.use(express.json());
router.use(cors());

// router.get('/',function(req,res){
// db.connect().then(function(response){
//     console.log(response);
// }).catch(function(error){
//     console.log(error.message);
// })
// });

router.get("/logout",authenticationCheck);
router.get('/',function(req,res){
    res.sendFile(__dirname+"/pages/index.html");
})
router.get('/menu',function(req,res){
    res.sendFile(__dirname+"/pages/menu.html");
})
router.get('/menuitem/',function(req,res){
    res.sendFile(__dirname+"/pages/menudetail.html");
})
router.get('/locate',function(req,res){
    res.sendFile(__dirname+"/pages/locate.html");
})
router.get('/cart',function(req,res){
    res.sendFile(__dirname+"/pages/cart.html");
})

router.get('/nutrition',function(req,res){
    res.sendFile(__dirname+"/pages/nutrition.html");
})
//menu
router.get('/api/menu',function(req,res){
    db.menuitem()
    .then(function(response){
        console.log(response);
        res.status(200).json(response);
    })
    .catch(function(error){
        console.log(response);
        res.status(500).json({"error":error.message});
    });
});

router.get('/login', function(req,res) {
    res.sendFile(__dirname+"/pages/login.html");
})

router.post('/api/menu/addmenu',function(req,res){
    let data = req.body;
    db.addMenu(data.name,data.description,data.price,data.category)
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});

router.get('/api/menu/filter/:category',function(req,res){
    let category = req.params.category;
    db.findmenu({category:category})
    .then(function(response){
        console.log({"menu":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});


router.get('/api/menu/item/:id',function(req,res){
    let id = req.params.id;
    db.findmenu({_id:id})
    .then(function(response){
        console.log(response);
        res.status(200).json(response);
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});
router.put('/api/menu/update/:id',function(req,res){
    let id = req.params.id;
    let data = req.body;
    db.updatemenu(id,{name:data.name,description:data.description,price: data.price,category: data.category})
    .then(function(response){
        console.log({"menu":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
})

router.delete('/api/menu/delete/:id',function(req,res){
    let id = req.params.id;
    // db.deletemenu({id:id})
    db.deletemenu(id)
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
})

//order
router.post('/api/order/addorder',authenticationCheck);
router.post('/api/order/getorder',authenticationCheck);
router.get('/api/order',function(req,res){
    db.allorders()
    .then(function(response){
        res.status(500).json(response);
    })
    .catch(function(error){
        res.status(500).json({"error":error.message});
    });
});

router.post('/api/order/addorder',function(req,res){
    let data = req.body;
    console.log("adding order this is data" );
    console.log(data);
    let accountid = res.locals.userID;
    console.log("add order" + accountid);
    db.addorder({accountId : accountid.toString(),totalPrice : data.totalprice,paid: data.paid,Delievered : data.delivered,date : data.date,time: data.time})
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});
router.post('/api/order/getorder',function(req,res){
    let data = req.body;
    let accountid = res.locals.userID;
    let date = data.date;
    let time = data.time;
    console.log("get order" + accountid);
    db.getorders({accountID:accountid.toString(),date:date,time:time})
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
})

router.put('/api/order/update/:id',function(req,res){
    let id = req.params.id;
    let data = req.body;
    db.updateOrder(id,{accountNumber:data.accountNumber,totalPrice:data.totalPrice,paid: data.paid,delivered: data.delivered,date:data.date,time:data.time})
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
})

router.delete('/api/order/delete/:id',function(req,res){
    let id = req.params.id;
    db.cancelorder(id)
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
})

//order item
router.get('/api/orderitem',function(req,res){
    db.orderitems()
    .then(function(response){
        res.status(500).json(response);
    })
    .catch(function(error){
        res.status(500).json({"error":error.message});
    });
});

router.post('/api/orderitem/addorderitem',function(req,res){
    let data = req.body;
    let accountNumber = res.locals.userID;
    db.addorderitem(accountNumber,data.orderID,data.itemID,data.quantity,data.price)
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});

router.get('/api/orderitem/filter/:orderid',function(req,res){
    let orderid = req.params.orderid;
    db.findorderitem({orderID:orderid})
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
})
router.put('/api/orderitem/update/:id',function(req,res){
    let id = req.params.id;
    let data = req.body;
    db.updateOrderItem(id,{
        accountNumber : data.accountNumber,
        orderID : data.orderID,
        itemID: data.itemID,
        quantity: data.quantity,
        price: data.price,})
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
})

router.delete('/api/orderitem/delete/:id',function(req,res){
    let id = req.params.id;
    db.removeorderitems(id)
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});


router.post('/api/login',function(req,res){
    let data = req.body;
    console.log(data.username);
    console.log(data.password);
    db.login(data.username,data.password)
    .then(function(response){
        if(!response)
        {
            res.status(401).json({"message":"Login unsuccessful.Please try again alter"});
        }
        else{
            let strToHash = response.username + Date.now();
            let token = crypto.createHash('md5').update(strToHash).digest('hex');
            db.updateToken(response._id,token)
            .then(function(response){
                // console.log('yep');
                res.status(200).json({'message':'login successful','token':token});
            })
            .catch(function(error){
                // console.log('hutao');
                res.status(500).json({"message":error.message});
            })
            // res.status(203).json({"message":"alls gd"});
        }
    })
    .catch(function(error){
        // console.log('ayaka');
        res.status(500).json({"message":error.message});
    })
})

router.post('/api/signin',function(req,res){
    let data = req.body;

    db.signin(data.firstname,data.lastName,data.email,data.password)
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});

router.get('/api/logout',function(req,res){
    //retrieve the id that was stored earlier in the middleware.
    let id = res.locals.userID;
    db.removeToken(id)
    .then(function(response){
        res.status(200).json({'message':'Logout successful'});
    })
    .catch(function(error){
        res.status(500).json({"message":error.message});
    })
})



module.exports = router;