const User = require("../Models/users");
const { verifyHash } = require('./bcrypt');

exports.getOneByEmail = async (req, res, next) => {
  try {
    const one = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    console.log(one);
    if (one === null) {
      return res.status(500).json({ error: "Not found" });
    }
    res.status(200).json(one);
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getExistUser = async (req, res, next) => {
  try {
    console.log(req.body, req.query, req.params);
    const one = await User.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (one !== null) {
      return res.status(500).json({ error: "Not found" });
    }
    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.verifyPassword = async (req, res, next) => {
  try {
    console.log('verify', 'body', req.body, 'query', req.query, 'params', req.params);
    const data = {
      email: req.query.email,
      password: req.query.password,
    };
    try {
      const user = await User.findOne({
        where: {
          email: data.email,
        }
      });
      const ver = await verifyHash(data.password, user.password);
      if (!ver) {
        console.error(ver);
        throw Error;
      }
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
