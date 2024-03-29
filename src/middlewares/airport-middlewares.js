const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError([ "Name not found in the incoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    if(!req.body.code){
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError([ "Code not found in the incoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    if(!req.body.cityId){
        ErrorResponse.message = "Something went wrong while creating airport";
        ErrorResponse.error = new AppError([ "CityId not found in the incoming request in the correct form" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);

    }
    next();
}

function validateUpdateRequest(req,res,next){
    if(!req.body.name  && !req.body.code && !req.body.cityId){
        ErrorResponse.message = "Something went wrong while updating airport";
        ErrorResponse.error = new AppError([ "Empty data sent in the incoming request" ],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(req.body.cityId && isNaN(req.body.cityId)){
        ErrorResponse.message = "Something went wrong while updating airport";
        ErrorResponse.error = new AppError([ "CityId is not Integer in the incoming request" ],StatusCodes.BAD_REQUEST);
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