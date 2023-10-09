const { queryProvider } = require("../providers/index.providers");

const createQuery = async (query) => {
  const newQuery = await queryProvider.createQuery(query);
  return newQuery;
};

const getQueryByCriteria = async (options) => {
  const allQueries = await queryProvider.getQueryByCriteria(options);
  if (allQueries.length < 1)
    return {
      status: 400,
      action: "Get Query by Criteria",
      message: "No queries with that criteria",
    };
  return allQueries;
};

// Soft delete query
const deleteQuery = async (queryId) => {
  try {
    const query = await queryProvider.deleteQuery(queryId);
    if (query.status === 404) return {status: 404};
    //Delete Query
    await query.destroy();
    return query
  } catch (error) {
    throw new Error(`Couldn't delete query, deleteQuery Service error: ${error.message}`)
  }
};

module.exports = { createQuery, getQueryByCriteria, deleteQuery };
