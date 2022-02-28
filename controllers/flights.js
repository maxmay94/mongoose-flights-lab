import res from 'express/lib/response.js'
import mongoose from "mongoose"
import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  req.body.flightNo = parseInt(req.body.flightNo)
  // if(!req.body.flightNo >= 10 && !req.body.flightNo <= 9999) req.body.flightNo = ''

  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }

  const flight = new Flight(req.body)
 
  flight.save(function(err) {
    if(err) return res.redirect('/flights/new')

    res.redirect('/flights')
  })
}

function index(req, res){
  Flight.find({}, function(error, flights) {
    res.render('flights/index', {
      flights,
      title: 'All Flights'
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(error, flight){
    res.redirect('/flights')
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete
}