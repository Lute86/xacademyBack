const  queryService  = require("../services/query.services");

const createQuery = async (req, res) => {
  try {
    const newQuery = await queryService.createQuery(req.body);
    res.json(newQuery);
  } catch (err) {
    res.status(500).json({ action: "createQuery", error: err.message });
  }
};

const getQueryByCriteria = async (req, res) => {
  try {
    const options = {
      id: req.params.param,
      reason: req.params.param,
    };

    const query = await queryService.getQueryByCriteria(options);
    if (!query) {
      res.status(404).json({ action: "getQuery", error: "Query Not Found" });
    } else {
      res.json(query);
    }
  } catch (err) {
    res.status(500).json({ action: "getQuery", error: err.message });
  }
};


module.exports = { createQuery, getQueryByCriteria };