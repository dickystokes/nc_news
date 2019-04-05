exports.routeNotFound = (err, req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.handle404 = (err, req, res, next) => {
 if(err.status === 404) res.status(404).send({ msg: 'Invalid Request' })
 else next(err)
};

exports.handle405 = (err, req, res, next) => {
 if(err.status === 405) res.status(405).send({ msg: 'Invalid Request' })
 else next(err)
};

exports.methodNotAllowed = (err, req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};

exports.handle400 = (err, req, res, next) => {
  const badRequestCodes = ['22P02'];
  if (badRequestCodes.includes(err.code)) {
      res.status(400).send({ msg: err.message || 'Bad Request' });
  } else next(err);
};
