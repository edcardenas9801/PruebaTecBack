const API_BASE = "/api/tics";
const ctrl_tics = require("../../controller/TicsController");

module.exports = function(app) {

  app.get(`${API_BASE}/listTask/:id`, (req, res) => {
    ctrl_tics.listTask(req, function(data) {
      res.json(data);
    });
  });
  app.get(`${API_BASE}/validateTask/:id`, (req, res) => {
    ctrl_tics.validateTask(req, function(data) {
      res.json(data);
    });
  });
  app.post(`${API_BASE}/createTask`, (req, res) => {
    ctrl_tics.createTask(req.body, function(data) {
      res.json(data);
    });
  });
  app.post(`${API_BASE}/createPending`, (req, res) => {
    ctrl_tics.createPending(req.body, function(data) {
      res.json(data);
    });
  });
  app.patch(`${API_BASE}/statusTask`, (req, res) => {
    ctrl_tics.statusTask(req.body, function(data) {
      res.json(data);
    });
  });
  app.post(`${API_BASE}/deletePending`, (req, res) => {
    ctrl_tics.deletePending(req.body, function(data) {
      res.json(data);
    });
  });
  app.post(`${API_BASE}/listPending`, (req, res) => {
    ctrl_tics.listPending(req.body, function(data) {
      res.json(data);
    });
  });
};
