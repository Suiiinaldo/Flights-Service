const { AirplaneService } = require("../services");
const { StatusCodes} = require("http-status-codes");

async function createAirplane(req,res){
    try {
        console.log("inside airplane controller");
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        return res
                .status(StatusCodes.CREATED)
                .json({
                    success: true,
                    message: "Successfully created an Airplane",
                    data: airplane,
                    error: {}
                });   
    } catch (error) {
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    message: "Something went wrong while creating Airplane",
                    data: {},
                    error: error
                })
    }
}

module.exports = {
    createAirplane,
}