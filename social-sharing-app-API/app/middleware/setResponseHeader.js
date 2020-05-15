setHeader = (req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
};

const setResponseHeader = {
  setHeader: setHeader,
};

module.exports = setResponseHeader;
