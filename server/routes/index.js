module.exports = (app) => {
  const Flight = require('../models/Flight');

  app.get('/getPrice', async (req, res) => {
    const { depCity, arrCity, date } = req.query;

    const flight = await Flight.findOne({
      depCity,
      arrCity,
      goDate: date,
      fromTimestamp: { $gt: Date.now() }
    });

    if (flight) {
      res.send({
        code: 'ok',
        price: flight.price1.price
      });
    } else {
      res.send({
        code: 'no'
      });
    }

  });

  app.get('/getFlightlist', async (req, res) => {

    const { depCity, arrCity, goDate, sortord } = req.query;

    let sortObj = {};
    switch(sortord) {
      case "从早到晚":
        sortObj = { fromTimestamp: 1 };
        break;
      case "从晚到早":
        sortObj = { fromTimestamp: -1 };
        break;
      case "从低到高":
        sortObj = { 'price1.price': 1 };
        break;
      case "从高到低":
        sortObj = { 'price1.price': -1 };
        break;
      default:
        break;
    }

    flightlist = await Flight.find({
      depCity,
      arrCity,
      goDate,
      fromTimestamp: { $gt: Date.now() }
    }).sort(sortObj);

    res.send({
      code: 'ok',
      flightlist
    });
  });

  app.post('/addFlightlist', async (req, res) => {
    const flight = req.body;
    const { goDate, fromTime } = flight;

    flight.fromTimestamp = new Date(goDate+'T'+fromTime).getTime();

    const result = await Flight.create(flight);

    if (result) {
      res.send({
        code: 'ok'
      });
    } else {
      res.send({
        code: 'no'
      });
    }
    
  });

}