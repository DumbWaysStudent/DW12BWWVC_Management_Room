const models = require("../models");
const Users = models.users;
const Rooms = models.rooms;
const Customers = models.customers;
const Orders = models.orders;

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

exports.showCheckIn = (req, res) => {
  Rooms.findAll({
    include: {
      model: Customers,
      as: "customer",
      attributes: {
        exclude: ["updatedAt", "createdAt"]
      },
      through: {
        model: Orders,
        as: "order",
        attributes: {
          exclude: ["updatedAt", "createdAt"]
        }
      }
    },
    attributes: ["id", "room"]
  }).then(data => {
    res.send(data);
  });
};

exports.addCheckIn = (req, res) => {
  Orders.create({
    id_room: req.body.id_room,
    id_customer: req.body.id_customer,
    check_in: new Date(),
    time: req.body.time,
    end_time: req.body.end_time,
    is_done: false,
    is_booked: true
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err);
    });
};
