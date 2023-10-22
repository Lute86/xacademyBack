const  queryService  = require("../services/query.services");

const createQuery = async (req, res) => {
  try {
    const newQuery = await queryService.createQuery(req.body);
    res.json(newQuery);
  } catch (err) {
    res.status(500).json({ action: "createQuery", error: err.message });
  }
};

const updateQuery = async(req, res) => {
  try {
    const query = await queryService.updateQuery(req.params.queryId, req.body);
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ action: "updateQuery", error: error.message });
  }
}

const getQueryByCriteria = async (req, res) => {
  try {
    const options = {
      id: req.params.param,
      reason: req.params.param,
      all: req.params.param == 'all',
    };

    const query = await queryService.getQueryByCriteria(options);
    if (!query) {
      res.status(404).json({ action: "getQuery", error: "Query Not Found" });
    }else if(query.status === 400){
      res.status(400).json(query)
    } 
    else {
      res.status(200).json(query);
    }
  } catch (err) {
    res.status(500).json({ action: "getQuery", error: err.message });
  }
};

const deleteQuery = async (req, res) => {
  try {
    const query = await queryService.deleteQuery(req.params.queryId);
    if(query.status===404) 
      return res.status(404).json({action: "deleteQuery", message: `Query with id:${req.params.queryId} not found`}) 
    return res.status(200).json(query);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = { createQuery, getQueryByCriteria, deleteQuery, updateQuery };
