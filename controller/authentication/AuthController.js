const _db = require("../../model/_db");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
let validator = require('validatorjs');

module.exports = {
  login: function(req, cb) {
    _db.query(
      `SELECT name, user, id, password FROM users WHERE user = '${req.user}' and status = 1 limit 1`,
      function(results) {
          if(results.status === 200){
              if (results.message.length === 0)
                  return cb({
                      message: "El usuario o contraseña ingresados son incorrectos", token: null, status: 422
                  });

              let passwordIsValid = bcrypt.compareSync(req.password, results.message[0].password);
              if (!passwordIsValid)
                  return cb({
                      message: "El usuario o contraseña ingresados son incorrectos",
                      token: null,
                      status: 401
                  });
              let token = jwt.sign(
                  {
                      id: results.message[0].id,
                      name: results.message[0].name,
                      user: results.message[0].user
                  },
                  "secret",
                  {
                      expiresIn: 86400
                  }
              );
              return cb({
                  message: `Bienvenido/a ${results.message[0].name}`,
                  token: token,
                  status: results.status
              });
          }else{
              return cb({
                  message: results.message,
                  token: null,
                  status: results.status
              });
          }
      }
    );
  },
    register: function (req, cb) {
        let rules = {
            name: 'required',
            user: 'required|email',
            password: 'required'
        }
        let result = new validator(req, rules);
        if (result.passes()) {
            _db.query(`SELECT id FROM users WHERE user = '${req.user}'`, function (response) {
                if(response.status === 200){
                    if (response.message.length > 0) {
                        return cb({
                            "message": "Ya hay un usuario registrado con estos datos.",
                            "status": 422
                        });
                    }
                    var salt = bcrypt.genSaltSync(8);
                    req.password = bcrypt.hashSync(req.password, salt);
                    _db.create('users', req, function (response) {
                        return cb({
                            'message': response.message,
                            'status': response.status
                        });
                    });
                }else{
                    return cb({
                        'message': response.message,
                        'status': response.status
                    });
                }
            });
        } else {
            return cb({
                'message': JSON.stringify(result.errors.errors),
                'status': 422
            });
        }
    },
};
