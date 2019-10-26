const models = require("../models");
const Users = models.users;
const Rooms = models.rooms;
const Customers = models.customers;

exports.showRooms = (req, res) => {
  Rooms.findAll().then(data => {
    res.send(data);
  });
};

exports.addRoom = (req, res) => {
  Rooms.create({
    room: req.body.room
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: true,
        Message: "Invalid Request"
      });
      console.log(err);
    });
};

exports.editRoom = (req, res) => {
  const userId = req.params.room_id;

  Rooms.update(
    {
      room: req.body.room
    },
    {
      where: { id: userId }
    }
  )
    .then(data => {
      res.send({
        error: false,
        data
      });
    })
    .catch(err => {
      res.send({
        error: true
      });
    });
};

exports.addCustomer = (req, res) => {
  Customers.create({
    identity: req.body.identity,
    name: req.body.name,
    phone: req.body.phone
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: true,
        Message: "Invalid Request !"
      });
      console.log(err);
    });
};

exports.showCustomers = (req, res) => {
  Customers.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({
        error: true
      });
    });
};

exports.editCustomer = (req, res) => {
  const custId = req.params.cust_id;
  Customers.update(
    {
      identity: req.body.identity,
      name: req.body.name,
      phone: req.body.phone
    },
    {
      where: { id: custId }
    }
  )
    .then(() => {
      res.send({
        error: false,
        Message: "Update Succesfull !"
      });
    })
    .catch(err => {
      res.send({
        error: true,
        Message: "Update Failed !"
      });
    });
};
