const API_BASE = "/api/auth";
const ctrl_auth = require("../../controller/authentication/AuthController");

module.exports = function(app) {
  app.post(`${API_BASE}/login`, (req, res) => {
    ctrl_auth.login(req.body, function(data) {
      res.json(data);
    });
  });

  app.post(`${API_BASE}/register-user`, (req, res) => {
    ctrl_auth.register(req.body, function(data) {
      res.json(data);
    });
  });

  app.post(`${API_BASE}/logout`, (req, res) => {
    res.status(200).send({
      auth: false,
      token: null
    });
  });
};
