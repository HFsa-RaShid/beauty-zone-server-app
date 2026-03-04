
const sendSuccess = (res, data = null, message = "Success") => {
  const response = { status: "success", message };
  if (data !== null) response.data = data;
  res.status(200).send(response);
};

const sendError = (res, error, statusCode = 500) => {
    console.log(error)
  const response = {
    status: "error",
    message: error.message || error || "Something went wrong",
  };
  
  res.status(statusCode).send(response);
};

module.exports = { sendSuccess, sendError };