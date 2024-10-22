const responseData = function (response, statusCode, values) {
    var data = {
        success: true,
        statusCode: statusCode,
        data: values,
    };
    response.status(statusCode).json(data);
    response.end();
};

const responseMessage = function (response, statusCode, message) {
    var data = {
        success: true,
        statusCode: statusCode,
        message: message,
    };
    response.status(statusCode).json(data);
    response.end();
};

module.exports = { responseData, responseMessage };