import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  req.body.flightNo = parseInt(req.body.flightNo)

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
      title: 'All Flights',
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function(error, flight){
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('meals')
  .exec(function(err, flight) {
    Meal.find({_id: {$nin: flight.meals}}, function(err, mealPlan) {
      res.render('flights/show', {
        flight,
        title: 'Flight Detail',
        mealPlan
      })
    })
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function(err,flight) {
    flight.tickets.push(req.body)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.tickets.remove({ _id: req.params.ticketId })
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function addMeal(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.meals.push(req.body.mealId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function removeMeal(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.meals.remove({ _id: req.params.mealId })
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  create,
  index,
  deleteFlight as delete,
  show,
  createTicket,
  deleteTicket,
  addMeal,
  removeMeal
}