const express = require('express');
const path = require('path');
const router = express.Router();
const crypto = require('crypto');

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


// const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYTc5OWJhM2VmYzVlN2Q5ODY3MTM4MzJmNDBhNGM1NCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjkwODk5MzUwLCJleHAiOjE2OTExNTg1NTAsIm5iZiI6MTY5MDg5OTM1MCwianRpIjoiZVplOTZaNTl3Um0wVEUwWCIsInVzZXJfaWQiOjIyOCwiZm9yZXZlciI6ZmFsc2V9.llXauT_AHbQG-rMj3GTcGq5qAvQI2HBFrc6VCfUJ0h4"; // Your API key here

// app.get('/api/onemap', async (req, res) => {
//   const { searchVal, returnGeom, getAddrDetails, pageNum } = req.query;
//   const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${searchVal}&returnGeom=${returnGeom}&getAddrDetails=${getAddrDetails}&pageNum=${pageNum}`;

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Authorization: apiKey,
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

router.get('/api/menu',authenticationCheck);
router.post('/api/menu/addmenu',authenticationCheck);




// router.get('/',function(req,res){
// db.connect().then(function(response){
//     console.log(response);
// }).catch(function(error){
//     console.log(error.message);
// })
// });

router.get('/',function(req,res){
    res.sendFile(__dirname+"/pages/index.html");
})

//menu
router.get('/api/menu',function(req,res){
    db.menuitem()
    .then(function(response){
        res.status(500).json(response);
    })
    .catch(function(error){
        res.status(500).json({"error":error.message});
    });
});

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
})
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
    let accountid = res.locals.userID;
    db.addorder(accountid,data.totalPrice,data.paid,data.delivered,data.date,data.time)
    .then(function(response){
        console.log({"message":response});
        res.status(200).json({"message":response});
    })
    .catch(function(error){
        console.log(error);
        res.status(500).json({"error" : error.message});
    })
});


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

    db.addorderitem(data.accountNumber,data.orderID,data.itemID,data.quantity,data.price)
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
            res.status(203).json({"message":"alls gd"});
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