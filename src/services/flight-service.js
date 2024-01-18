const { FlightRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        // console.log(data);
        if(!compareTime(data.arrivalTime, data.departureTime)){
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        //Departure and arrival airport cannot be same
        else if(data.departureAirportId == data.arrivalAirportId){
            throw new AppError('Departure and arrival airport reference cannot be same', StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        else if(error.name == "SequelizeForeignKeyConstraintError" || error.name == "SequelizeDatabaseError" || error.statusCodes == StatusCodes.BAD_REQUEST){
            throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight Object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    const startingTripTime = " 00:00:00";

    // trips=MUM-DEL
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        [minPrice,maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between] : [minPrice, (maxPrice == undefined)?20000:maxPrice]
        }
    }
    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte] : query.travellers
        }
    }
    if(query.tripDate){
        console.log(query.tripDate + startingTripTime);
        console.log(query.tripDate + endingTripTime);
        customFilter.departureTime = {
            [Op.between] : [query.tripDate + startingTripTime, query.tripDate + endingTripTime]
        }
    }
    if(query.sort){
        const params = query.sort.split(",");
        const sortFliters = params.map((p)=> p.split("_"));
        sortFilter = sortFliters;

    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statusCodes == StatusCodes.NOT_FOUND){
            throw new AppError(" The flight you requested is not present ", error.statusCodes);
        }
        throw new AppError('Cannot fetch data of the requested flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    
}