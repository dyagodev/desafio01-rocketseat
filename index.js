const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
var request = 0;

//Middlewares
function checkProjectExists(req, res, next){
  const project = projects.find(project => project.id == req.params.id);
  if (!project){
    return res.status(400).json('Project does not exists');
  }

  return next();
}

// Request count
server.use((req, res, next) => {
  console.log('Requests: '+ ++request);
  return next();
})

// routes
server.post('/projects', (req, res) => {
  const data = {
    id: req.body.id,
    title: req.body.title,
    tasks: []
  }
  projects.push(data);
  
  return res.send(`Project was successfully added`);
})

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const project = projects.find(project => project.id == req.params.id);
  project.title = req.body.title;
  return res.json(project);
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const projectIndex = projects.findIndex(project => project.id == req.params.id);
  projects.splice(projectIndex, 1);
  return res.send('Projeto removido');
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const project = projects.find(project => project.id == req.params.id);
  project.tasks.push(req.body.title);
  return res.send('Tasks added!');
})

server.listen(3000);