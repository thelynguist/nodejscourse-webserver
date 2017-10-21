const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to the Home Page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMsg: 'Welcome to the About Page!'
    });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
    welcomeMsg: 'Welcome to the Projects Page!'
  });
});

app.get('/photos', (req, res) => {
  res.render('photos.hbs', {
    pageTitle: 'Photos Page'
  });
});

app.get('/bibliography', (req, res) => {
  res.render('bibliography', {
    pageTitle: "Publications"
  });
});

app.get('/links', (req, res) => {
  res.render('links.hbs', {
    pageTitle: 'Links Page',
    welcomeMsg: 'Welcome to the links page.'
  });
});

app.get('/bad', (req, res) => {
    res.send({
        messageType: 'error',
        message: 'Oops! Something went wrong. There was an error.'
    });
});



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
