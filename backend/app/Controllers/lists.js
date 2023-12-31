const Contact = require("../Models/contact");
const Person = require("../Models/person");
const sequelize = require("../utils/database");

exports.getOneByPk = async (req, res, next) => {
  try {
    const columns = '"people"."name", "people"."cpf", "contacts"."type", "contacts"."description"';
    const innerJoin = 'INNER JOIN "contacts" ON "people"."id" = "contacts"."idPerson"';
    const query = `SELECT ${columns} FROM "people" ${innerJoin} WHERE "contacts"."idPerson" = :id`;
    const one = await sequelize.query(query, {
      replacements: { id: parseInt(req.params.id) },
      type: sequelize.QueryTypes.SELECT
    });
    console.log(one);
    return res.status(200).json(one);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// exports.getOneByPk = async (req, res, next) => {
//   try {
//     const one = await Person.findByPk(req.body.id, {
//       include: [{ model: Contact }]
//     });
//     console.log(one);
//     return res.status(200).json(one);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

exports.getOneByName = async (req, res, next) => {
  try {
    const one = await Person.findOne({
      where: {
        name: req.query.name,
      }
    });
    return res.status(200).json(one);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    // :id do usuario
    console.log(req.params.id);
    const columns = '"people"."name", "people"."cpf", "contacts"."type", "contacts"."description"';
    const innerJoin = `INNER JOIN "contacts" ON "people"."id" = "contacts"."idPerson" AND "people"."idUser" = :id`;
    const query = `SELECT ${columns} FROM "people" ${innerJoin}`;
    const all = await sequelize.query(query, {
      replacements: { id: parseInt(req.params.id) },
      type: sequelize.QueryTypes.SELECT
    });
    console.log(all);
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// exports.getAll = async (req, res, next) => {
//   try {
//     // :id do usuario
//     console.log(req.params.id);
//     const all = await Person.findAll({
//       where: {
//         idUser: req.params.id,
//       },
//       include: [{ model: Contact }]
//     });
//     console.log(all);
//     return res.status(200).json(all);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

exports.insertOnePerson = async (req, res, next) => {
  try {
    console.log(
      req.query,
      req.body,
      req.params
    );
    const data = {
      name: req.body.name,
      cpf: req.body.cpf,
      idUser: req.params.id
    };
    try {
      const created = await Person.create(data);
      console.log("Person created", created);
      return res.status(200).json(created);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.insertOneContact = async (req, res, next) => {
  try {
    console.log(
      req.body.type,
      req.body.description,
      req.body.idPerson
    );
    const data = {
      type: req.body.type,
      description: req.body.description,
      idPerson: req.body.idPerson
    };
    try {
      const created = await Contact.create(data);
      console.log("Person created", created);
      return res.status(200).json(created);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updatePerson = async (req, res, next) => {
  try {
    // :id da pessoa
    const data = {
      name: req.body.name,
      cpf: req.body.cpf
    };
    try {
      const updated = await Person.update(data, {
        where: {
          id: req.body.id,
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

exports.updateContact = async (req, res, next) => {
  try {
    // :id do contato
    const data = {
      name: req.body.type,
      cpf: req.body.description
    };
    try {
      const updated = await Contact.update(data, {
        where: {
          id: req.body.id,
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

exports.deletePerson = async (req, res, next) => {
  try {
    // :id da pessoa
    const deleted = await Person.destroy({
      where: {
        id: req.body.id,
      }
    });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteOneContact = async (req, res, next) => {
  try {
    // :id do contato
    const deleted = await Contact.destroy({
      where: {
        id: req.body.id,
      }
    });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteAllContact = async (req, res, next) => {
  try {
    // :id da pessoa
    const deleted = await Contact.destroy({
      where: {
        idPerson: req.body.id,
      }
    });
    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500).json(error);
  }
};