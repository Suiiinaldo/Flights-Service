const express = require("express");

const { InfoController } = require("../../controller");

const AirplaneRoutes = require("./airplane-routes");

const CityRoutes = require("./city-routes");

const AirportRoutes = require("./airport-routes");

const FlightRoutes = require("./flight-routes");

const router = express.Router();


router.use("/airplanes", AirplaneRoutes);

router.use("/cities", CityRoutes);

router.use("/airports",AirportRoutes);

router.use("/flights",FlightRoutes);

router.get("/info", InfoController.info);

module.exports = router;
