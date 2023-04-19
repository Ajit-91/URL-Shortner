
const catchError = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    // console.log(error)
    // console.log({code : error.code, name : error.name, message : error.message})
    next(error);
  }
};

export default catchError;