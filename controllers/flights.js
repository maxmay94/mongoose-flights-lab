import res from 'express/lib/response.js'
import mongoose from "mongoose"
import { Flight } from '../models/flight.js'

function newFlight(req, res) {
  res.render('flights/new')
}

function create(req, res) {
  req.body.flightNo = parseInt(req.body.flightNo)
  if(!(req.body.flightNo >= 10 && req.body.flightNo <= 9999)) req.body.flightNo = ''

  for(let key in req.body) {
    if(req.body[key] === '') delete req.body[key]
  }

  const flight = new Flight(req.body)
  console.log('SANITY CHECK!')
  console.log(flight)
}

export {
  newFlight as new,
  create
}