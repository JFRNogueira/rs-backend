const express = require ('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');


const app = express();

app.use(cors());
app.use(express.json()) // Adcionar algum tipo de função para todas as rotas 

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do backend (retornar infos para o usuário)
 * POST: Criar uma informação no backend
 * PUT/PATCH: Alterar uma informação no backend
 *    PUT: Altera todos os dados de um recurso
 *    PATCH: Altera um dado específico
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação (principalmente)
 * Route Params: Identificar recursos (atualizar/Deletar)
 * Request Body: Conteúdo da requisição na hora de criar ou editar um recurso (JSON)
 */

 /**
  * Middleware: Funciona como um telefone sem fio
  * 
  * Interceptador de requisições que pode:
  * - Interromper a requisição
  * - Alterar dados da requisição
  */

/**
 * git pull LINK
 * git status
 * git add
 * git commit -m 'MESSAGE'
 * git push
 */

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next();

  // Se houver mais código aqui, 
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json(({ error: 'Invalid project ID'}));
  }

  return next();
}

//app.use(logRequests);
app.use('/projects/:id', validateProjectId);

//app.get('/projects', middleware1, middleware2, middleware3, (request, response) => {
app.get('/projects', (request, response) => {

  //const {title, owner} = request.query; 
  //console.log(title);
  //console.log(owner);

  //const query = request.query;
  //console.log(query);

  return response.json(projects)
})

app.post('/projects', (request, response) => {
  
  //const params = request.body;
  //console.log(params);
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner };
  projects.push(project);

  //console.log(title);
  //console.log(owner);
  
  return response.json(project)
})

app.put('/projects/:id', (request, response) => {

  //const params = request.params;
  //console.log(params);
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  //console.log(id);

  if( projectIndex < 0) {
    return response.status(400).json({ error: "Project not found."} )
  };

  const project = {
    id, 
    title, 
    owner,
  };
  
  projects[projectIndex] = project

  return response.json(project)
});

app.delete('/projects/:id', (request, response) => {

  const { id } = request.params

  const projectIndex = projects.findIndex(project => project.id === id);

  if( projectIndex < 0) {
    return response.status(400).json({ error: "Project not found."} )
  };

  projects.splice(projectIndex, 1);

  
  return response.status(204).send();
})

app.listen(3333, () => {
  console.log('Back-end started!')
})