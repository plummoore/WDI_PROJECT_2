const Face = require('../models/face');

function faceIndex(req, res, next) {
  Face
    .find()
    .populate('createdBy')
    .exec()
    .then((faces) => res.render('faces/index', { faces }))
    .catch(next);
}


function faceNew(req, res) {
  return res.render('faces/new');
}

// function faceCreate(req, res, next) {
//   Face
//     .create(req.body)
//     .then(() => res.redirect('faces/index'))
//     .catch(next);
// }

function faceCreate(req, res, next) {

  req.body.createdBy = req.user;

  Face
    .create(req.body)
    .then(() => res.redirect('/faces'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/faces/${req.params.id}/edit`, err.toString());
      next(err);
    });
}


function faceShow(req, res, next) {
  Face
    .findById(req.params.id)
    .exec()
    .then((face) => {
      if(!face) return res.notFound();
      return res.render('faces/show', { face });
    })
    .catch(next);
}

function faceEdit(req, res, next) {
  Face
    .findById(req.params.id)
    .exec()
    .then((face) => {
      return res.render('faces/edit', { face });
    })
    .catch(next);
}


function faceUpdate(req, res, next) {
  Face
    .findById(req.params.id)
    .exec()
    .then((face) => {
      if(!face) return res.notFound();

      for(const field in req.body) {
        face[field] = req.body[field];
      }

      return face.save();
    })
    .then(() => res.redirect(`/faces/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/faces/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function faceDelete(req, res, next) {
  Face
    .findById(req.params.id)
    .exec()
    .then((face) => {
      if(!face) return res.notFound();
      return face.remove();
    })
    .then(() => res.redirect('/faces'))
    .catch(next);
}


module.exports = {
  index: faceIndex,
  new: faceNew,
  create: faceCreate,
  show: faceShow,
  edit: faceEdit,
  update: faceUpdate,
  delete: faceDelete
};
