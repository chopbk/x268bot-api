/**
 * @Description This function  use for response success to Client Request
 * @param {Object} res : info to response
 * @param (error) err: err message
 * @param (number) code: err code
 * @return {Object} res : response
 */
const ResSuccess = function (res, data, code) {
  // Success Web Response
  // let success = {
  //     result: "success"
  // };
  // if (typeof data === 'object') {
  //     data = Object.assign(data, success); //merge the objects
  // }
  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({
    result: 'success',
    data: data,
  });
};

module.exports.ResSuccess = ResSuccess;

/**
 * @description This function response error to Client Request
 * @param {Object} res : info to response
 * @param (error) err: err message
 * @param (number) code: err code
 * @return {Object} res : response
 */
const ResErr = function (res, err, err_code) {
  // Error Web Response
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }

  // Send
  return res.json({
    result: 'failure',
    error: err,
    code: err_code,
  });
};

const ResError = function (res, err) {
  // Set http code
  res.statusCode = err.http_code;
  // Response value
  return res.json({
    result: 'failure',
    error: err.message,
    code: err.err_code,
  });
};

module.exports.ResErr = ResErr;
module.exports.ResError = ResError;

/**
 * Return png image
 * @param {*} res
 * @param {*} image
 * @returns
 */
const ResPngImage = function (res, image) {
  res.set('Content-Type', 'image/png');

  return res.status(200).send(image);
};

module.exports.ResPngImage = ResPngImage;

/**
 * Return html
 * @param {*} res
 * @param {*} html
 * @returns
 */
const ResHtml = function (res, html) {
  res.set('Content-Type', 'text/html');
  return res.status(200).send(html);
};

module.exports.ResHtml = ResHtml;

const ResFile = function (res, file) {
  res.download(file.path);
};

module.exports.ResFile = ResFile;
