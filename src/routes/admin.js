const photographer = require('../controllers').photographerController;
const organization = require('../controllers').organizationController;
const photos = require('../controllers').photosController;
const project = require('../controllers').projectController;
const adm = require('../controllers').specialController;
const loginController = require('../controllers').loginController;

module.exports = (app, passport) => {

  app.post('/adm/login', passport.authenticate('local', { session: false }), loginController.admlogin);
    // get routes
  app.get('/adm/:ad/photographer/all', passport.authenticate('jwtad', { session: false }), adm.getAllPhotographers)
  app.get('/adm/:ad/organization/all', passport.authenticate('jwtad', { session: false }),  adm.getAllOrganizations)
  app.get('/adm/:ad/project/all', passport.authenticate('jwt', { session: false }), adm.getAllProjects);

  // photographer profile route with jwt check
  app.route('/adm/:ad/photographer/:id')
    .all(passport.authenticate('jwtad', { session: false }))
    .put(adm.updatePhotographer)
    .delete(adm.deletePhotographer);


  app.route('/adm/:ad/organization/:id')
    .all(passport.authenticate('jwtad', { session: false }))
    .put(adm.updateOrganization)
    .delete(adm.deleteOrganization);

//photos routes

//projects routes
  app.route('/adm/:ad/project/:id')
    .all(passport.authenticate('jwtad', { session: false }))
    .put(adm.updateProject)
    .delete(adm.deleteProject)
}