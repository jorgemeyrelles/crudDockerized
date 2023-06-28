const User = require("../Models/users");

exports.getAll = async (req, res, next) => {
  try {
    const all = await User.findAll();
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    console.log(req);
    const data = {
      email: req.query.email,
      password: req.query.password,
    };
    console.log(data);
    try {
      const user = await User.findOne({
          where: {
            email: req.query.email,
          }
        });
      return res.status(200).json(user);  
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createOne = async (req, res, next) => {
  try {
    const data = {
      username: req.body.username,
      email: req.body.email,
      // phone: req.body.phone,
      password: req.body.password,
    };
    try {
      const created = await User.create(data);
      console.log("User created");
      return res.status(201).json(created);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateOne = async (req, res, next) => {
  try {
    const data = {
      username: req.body.username,
      email: req.body.email,
      // phone: req.body.phone,
      password: req.body.password,
    };
    try {
      const updated = await User.update(data, {
        where: {
          id: req.params.id,
        }
      });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const deleted = await User.destroy({
      where: {
        id: req.params.id,
      }
    });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};
