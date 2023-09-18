const { queries } = require("../models");
const { Op } = require("sequelize");

const createQuery = async (query) => {
  try {
    const newQuery = await queries.create(query);
    return newQuery;
  } catch (err) {
    console.error("Error when creating Query", err);
    throw err;
  }
};

const getQueryByCriteria = async (options) => {
  try {
    if (options.all) {
      const allQueries = await queries.findAll();
      return allQueries;
    } else {
      const query = await queries.findAll({
        where: {
          [Op.or]: [{ id: options.id }, { reason: options.reason }],
        },
      });
      return query;
    }
  } catch (err) {
    console.error("Error when fetching Query", err);
    throw err;
  }
};

// Soft delete query
const deleteQuery = async (queryId) => {
  try {
    const query = await queries.findByPk(queryId);
    if (!query) {
      throw new Error("Query not found");
    }
    //Delete Query
    await query.destroy();
    return query;
  } catch (err) {
    console.error("Error when deleting Query", err);
    throw err;
  }
};

module.exports = { createQuery, getQueryByCriteria, deleteQuery };
