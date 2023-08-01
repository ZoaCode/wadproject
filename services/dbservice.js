const mongoose = require('mongoose');
const account = require('../models/account');
const order = require('../models/order.js');
const menu = require('../models/menu.js');
const orderitem = require('../models/orderitems.js');
const { TopologyDescription } = require('mongodb');

let db = {
    async connect(){
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/project1');
            return "Connected to Mongo DB";

        }
        catch(e)
        {
            console.log(e.message);
            throw new Error("Error connecitn go Mongo DB");
        }
    },

    //authen
    async updateToken(id,token){
        try {
            await account.findByIdAndUpdate(id,{token:token});
            return;
        }
        catch(e){
            console.log(e.message);
            throw new error("Error at the server. Please try again later.");
        }
    },

    async checkToken(token){
        try{
            let result = await account.findOne({token:token});
            console.log(result);
            return result;
        } 
        catch(e)
        {
            console.log(e.message);
            throw new Error("Error at server. Please try again later.");
        }
    },

    async removeToken(id){
        try{
            await account.findByIdAndUpdate(id,{$unset: {token:1}});
            return;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error at the server.Please try again later");
        }
    },

    //menu
    async menuitem() {
        try {
            let result = await menu.find();
            return result;
        }
        catch (e) {
            console.log(e.message);
            throw new Error("Error retrieving menu items");
        }
    },
    async addMenu(name, description,price,category){
        try{
            await menu.create({
                name: name,
                description: description,
                price:price,
                category: category
            })
            return `Menu Item: ${name} has been added`;

        }
        catch(e){
            console.log(e.message);
            throw new Error("There was an error adding the menu item");
        }
    },
    async findmenu(conditions)
    {
        try{
            let results = await menu.find(conditions);
            return results;
        }
        catch(e){
            console.log(e.message);
            throw new Error("your item could not be found")
        }
    },
    async updatemenu(id,updates){
        try{ 
            let result = await menu.findByIdAndUpdate(id,updates);
            if (!result) return "Unable to find menu item to update.";
            else return "menu item is updated!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error updating item");
        }
    },

    async deletemenu(conditions)
    {
        try{
            let results = await menu.findByIdAndDelete(conditions);
            // let results = await menu.findOneAndDelete(conditions);
            if (!results) return "Unable to find an record to delete.";
            else return "Record is deleted!";
        }
        catch(e){
            console.log(e.message);
            throw new Error("Error deleting event");
        }
    },



    //account
    async signin(firstName, lastName,email,password){
        try{
            await account.create({
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password
            })
            return `Your account has been made`;

        }
        catch(e){
            console.log(e.message);
            throw new Error("There was an error signing in");
        }
    },
    async login(username,password)
    {
        try{
            console.log("gd time");
            // let results = await account.findOne({username: username,password: password});
            // if (!results) return "error loging in";
            // else return "login succesful";
            let result = await account.findOne({username:username,password:password});
            console.log(result);
            return result;
        }
        catch(e){
            console.log("talkkkk");
            console.log(e.message);
            throw new Error("There was an error login in");
        }
    },
    async getAllUser() {
        try {
            let results = await account.find().select("name");
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving users");
        }
    },

    async getUserByID(id) {
        try {
            let result = await account.findById(id).select("name");
            return result;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error retrieving user's information.");
        }
    },
    

    //order
    async addorder(saccountNumber,stotalPrice,spaid,sDelievered,sdate,stime){
        try{
            await order.create({
                accountNumber : saccountNumber,
                totalPrice : stotalPrice,
                paid : spaid,
                Delievered : sDelievered,
                date : sdate,
                time : stime
            });
            return `Your order has been added`;

        }
        catch(e){
            console.log(e.message);
            throw new Error("There was an error saving your order");
        }
    },
    async allorders(){
        try {
            let result = await order.find();
            return result;
        }
        catch (e) {
            console.log(e.message);
            throw new Error("Error retrieving orders");
        }
    },
    async cancelorder(id)
    {
        try{
            let results = await order.findByIdAndDelete(id);
            if(!results) return "error in deleting order"
            else return "order deleted";
        }
        catch(e){
            console.log(e.message);
            throw new Error('error deleting order');
        }
    },
    async updateOrder(id,updates){
        try{ 
            let result = await order.findByIdAndUpdate(id,updates);
            if (!result) return "Unable to update order item.";
            else return "order item is updated!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error updating item");
        }
    },

    //orderitem
    async orderitems(conditions){
        try{ 
            let results = await orderitem.find(conditions);
            return results;
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error finding order items");
        }
    },
    async addorderitem(accountNumber,orderID,itemID,quantity,price){
        try{
            await orderitem.create({
                accountNumber : accountNumber,
                orderID : orderID,
                itemID: itemID,
                quantity: quantity,
                price: price,
            });
            return `order item has been added`;

        }
        catch(e){
            console.log(e.message);
            throw new Error("There was an error saving your order");
        }
    },
    async findorderitem(conditions)
    {
        try{
            let results = await orderitem.find(conditions);
            return results;
        }
        catch(e){
            console.log(e.message);
            throw new Error("your item could not be found")
        }
    },
    async removeorderitems(id){
        try{ 
            let result = await orderitem.findByIdAndDelete(id);
            if(!result) return "error in deleting order item"
            else return "order item deleted";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error deleting order items");
        }
    },
    async updateOrderItem(id,updates){
        try{ 
            let result = await orderitem.findByIdAndUpdate(id,updates);
            if (!result) return "Unable to update order item quantity.";
            else return "order item is updated!";
        }
        catch(e) {
            console.log(e.message);
            throw new Error("Error updating item");
        }
    },




}

module.exports = db;