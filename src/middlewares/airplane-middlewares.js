const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError([ "Model Number not found in the incoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    if(!req.body.capacity){
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError([ "Capacity not found in the incoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(isNaN(req.body.capacity)){
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = new AppError([ "Capaity is not Integer in the oncoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.capacity){
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = new AppError([ "Capaity is not found in the oncoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
};