const router = require("express").Router();
let Customer = require("../models/Customer");

http://localhost:8070/customer/add

router.route("/add").post((req, res) => {
  const age = Number(req.body.age);
  const name = req.body.name;
  const type = req.body.type;
  const Address = req.body.Address;
  const Password=req.body.Password;
  const drivingExperiance = req.body.drivingExperiance;
  const liscenceYear = req.body.liscenceYear;

  const newCustomer = new Customer({
    name,
    age,
    type,
    Address,
    Password,
    drivingExperiance,
    liscenceYear
  });

  newCustomer
    .save()
    .then(() => {
      res.json("Customer Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req,res)=>{

    let userId=req.params.id;
    const { name,age,type,Address,Password,drivingExperiance,liscenceYear}=req.body;

    const updateCustomer={
        name,
        age,
       type,
        Address,
        Password,
        drivingExperiance,
        liscenceYear

    }
    const update = await Customer.findByIdAndUpdate(userId, updateCustomer)
    .then(()=>{
        res.status(200).send({status: "User updated"})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with updating data",error:err.message});

})

})

router.route("/delete/:id").delete(async (req,res) => {

    let userId = req.params.id;
    
    await Customer.findByIdAndDelete(userId).then(()=>{
       res.status(200).send({STATUS: "User deleted"}); 
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data",error:err.message}); 

})

})

router.route("/get/:id").get( async(req,res)=>{
    let userId = req.params.id;
    await Customer.findById(userId)
    .then(()=>{
        res.status(200).send({status: "User fetched",Customer})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get data",error:err.message}); 

})

})

module.exports = router;
