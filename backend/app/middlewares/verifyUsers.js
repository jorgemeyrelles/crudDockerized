const User = require("../Models/users");

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
