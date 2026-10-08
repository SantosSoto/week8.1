/**
 * Express router demonstrating HTML forms and request data.
 *
 * GET routes read values from URL path parameters or query strings.
 * POST routes read submitted form fields from the request body.
 * The home page uses an EJS template; other routes send responses directly.
 * This example does not connect to or save data in MongoDB.
 */

// Load Express and create a router to group this file's request handlers.
var express = require('express');
var router = express.Router();

// Load the middleware that parses JSON and URL-encoded request bodies.
var bodyParser = require('body-parser');
var path = require ('path'); // File path utilities; unused in this example.

var querystring = require('querystring'); // Query string utilities; unused here.
// Express already makes URL query values available through req.query.

// Parse application/json request bodies and put the data in req.body.
router.use(bodyParser.json());

// Parse application/x-www-form-urlencoded bodies, as sent by the POST forms.
// extended: true allows nested objects in the submitted data.
// Register these parsers before the routes that read req.body.
router.use(bodyParser.urlencoded({ extended: true }));

// GET /: Render the home page containing the example forms.
// req is the incoming request; res sends the response. next is unused here.
router.get('/', function(req, res, next) {
  // Render views/index.ejs with a title variable, then send the resulting HTML.
  // The title is only display text; it does not enable a database connection.
  res.render('index', { title: 'ReadFormDataSaveMongoDB' });
});

// GET /read/:name: Read name from the URL path.
// Example: /read/Lynne gives req.params.name the value "Lynne".
router.get('/read/:name', function(req, res, next) {
  // Express captures path parameters; body-parser is not involved.
  var body = JSON.stringify(req.body);  // Unused example of converting a value to JSON text.
  var params = JSON.stringify(req.params); // Unused JSON text of the captured path parameters.
  var value_name = req.params.name; // Read the captured name.
  // Send the greeting directly without rendering an EJS template.
  res.send("hello " + value_name);
})

// GET /readNameAndRespond: Read name from the URL query string.
// Example: /readNameAndRespond?name=Lynne gives req.query.name "Lynne".
router.get('/readNameAndRespond', function(req, res, next) {
  // Express supplies query values; body-parser is not involved.
  var body = JSON.stringify(req.body);  // Unused example of converting a value to JSON text.
  var params = JSON.stringify(req.params); // Unused JSON text of the path parameters.
  var query = req.query; // Unused reference to all query string values.
  var value_name = req.query.name; // Read name from the query string.
  // Send the greeting directly without rendering an EJS template.
  res.send("hello " + value_name);
});


// POST /readNameAndRespond: Read the submitted name from req.body.
router.post('/readNameAndRespond', function(req, res, next) {

  // The body-parser middleware has already parsed the submitted form fields.
  var body = JSON.stringify(req.body); // Unused JSON text of the parsed body.
  var params = JSON.stringify(req.params); // Unused JSON text of the path parameters.
  var value_name = req.body.name; // Read the submitted name.
  res.send("hello now " + value_name);
});






// POST /readCustomerInfoAndRespond: Read name and email from req.body.
// Return a welcome message displaying the submitted values.
router.post('/readCustomerInfoAndRespond', function(req, res, next) {

  // The body-parser middleware has already parsed the submitted form fields.
  var body = JSON.stringify(req.body); // Unused JSON text of the parsed body.
  var params = JSON.stringify(req.params); // Unused JSON text of the path parameters.
  var value_name = req.body.name; // Read the submitted name.
  var value_email = req.body.email; // Read the submitted email.
  res.send("Welcome,  " + value_name + "</br> We will reach you at: " + value_email);


});

// POST /api/customer: Read customer data and return JSON for the frontend.
// The JSON middleware above makes the submitted fields available in req.body.
router.post('/api/customer', function(req, res) {
  const { name, email } = req.body;

  res.json({
    message: `Welcome ${name}`,
    email: email
  });
});

// Export this router so app.js can attach its routes to the main Express app.
module.exports = router;
