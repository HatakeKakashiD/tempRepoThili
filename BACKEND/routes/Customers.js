const router = require("express").Router();
let Customer = require("../models/Customer");

//localhost:8070/customer/add

http: router.route("/add").post((req, res) => {
  const age = Number(req.body.age);
  const name = req.body.name;
  const type = req.body.type;
  const address = req.body.address;
  const Password = req.body.Password; // Updated variable name
  const drivingExperiance = req.body.drivingExperiance; // Updated variable name
  const liscenceYear = req.body.liscenceYear; // Updated variable name

  const newCustomer = new Customer({
    name,
    age,
    type,
    address,
    Password,
    drivingExperiance,
    liscenceYear,
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

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const {
    name,
    age,
    type,
    address,
    Password, // Assuming this is not updated here
    drivingExperience,
    licenseYear,
  } = req.body;

  const updateCustomer = {
    name,
    age,
    type,
    address,
    Password, // Assuming this is not updated here
    drivingExperience,
    licenseYear,
  };

  try {
    const updatedUser = await Customer.findByIdAndUpdate(userId, updateCustomer, { new: true });
    res.status(200).send({ status: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating user details:", err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});


router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Customer.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({ STATUS: "User deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let userId = req.params.id;
  await Customer.findById(userId)
    .then((user) => {
      res.status(200).send({ status: "User fetched", user });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get data", error: err.message });
    });
});

router.route("/login").post(async (req, res) => {
  const { address, password } = req.body;

  try {
    const customer = await Customer.findOne({ address });

    if (!customer) {
      return res.status(400).json({ status: "error", message: "Invalid email or password" });
    }

    if (customer.Password !== password) {
      return res.status(400).json({ status: "error", message: "Invalid email or password" });
    }

    // Include the userId in the response
    res.json({ status: "success", message: "Login successful", userId: customer._id });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send({ status: "Error with login", error: err.message });
  }
});




module.exports = router;