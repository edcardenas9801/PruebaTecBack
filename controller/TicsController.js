const _db = require("../model/_db");
let validator = require("validatorjs");

module.exports = {
  listTask: function (req, cb) {
      _db.query(`SELECT * FROM tasks WHERE id_user = '${req.params.id}' ORDER BY priority ASC, due_date DESC`, function (response) {
          return cb({
            'message': response.message,
            'status': response.status
          });
      });
  },
    validateTask: function (req, cb) {
        _db.query(`SELECT name FROM tasks WHERE status = 1 and id_user = '${req.params.id}' AND (UNIX_TIMESTAMP(due_date) = UNIX_TIMESTAMP(CONVERT(NOW(), DATE)) OR UNIX_TIMESTAMP(due_date) = UNIX_TIMESTAMP(CONVERT(DATE_ADD(NOW(),INTERVAL 1 DAY), DATE)))`, function (response) {
            return cb({
                'message': response.message,
                'status': response.status
            });
        });
    },
  createTask: function (req, cb) {
    let rules = {
      id_user: 'required|numeric',
      name: 'required',
      priority: 'required|numeric',
      due_date: 'required',
    }
    let result = new validator(req, rules);
    if (result.passes()) {
          let body = {
            id_user: req.id_user,
            name: req.name,
            priority: req.priority,
            due_date: req.due_date
          }
          _db.create('tasks', body,  function (response)  {
              return cb({
                'message': response.message,
                'status': response.status
              });
          });
    } else {
      return cb({
        'message': JSON.stringify(result.errors.errors),
        'status': 422
      });
    }
  },
  statusTask: function (req, cb) {
      _db.query(`UPDATE tasks SET status = '${req.status}' WHERE id = '${req.id}'`, function (response) {
          return cb({
            'message': response.message,
            'status': response.status
          });
      });
  },
  createPending: function (req, cb) {
    let rules = {
      id_task: 'required|numeric',
      name: 'required'
    }
    let result = new validator(req, rules);
    if (result.passes()) {
      let body = {
        id_task: req.id_task,
        name: req.name,
      }
      _db.create('pendings', body,  function (response)  {
        return cb({
          'message': response.message,
          'status': response.status
        });
      });
    } else {
      return cb({
        'message': JSON.stringify(result.errors.errors),
        'status': 422
      });
    }
  },
  deletePending: function (req, cb) {
      _db.query(`DELETE FROM pendings WHERE id = '${req.id}'`,  function (response)  {
        return cb({
          'message': response.message,
          'status': response.status
        });
      });

  },
    listPending: function (req, cb) {
        _db.query(`SELECT * FROM pendings WHERE id_task = '${req.id}' ORDER BY created_at DESC`, function (response) {
            return cb({
                'message': response.message,
                'status': response.status
            });
        });
    },
};
