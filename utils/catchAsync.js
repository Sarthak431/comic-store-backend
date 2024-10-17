const catchAsync = (fn) => (req, res, next) => {
  // Execute the async function and catch any errors, passing them to next()
  fn(req, res, next).catch(next);
};

export default catchAsync;
