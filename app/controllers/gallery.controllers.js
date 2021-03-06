const gallery = require('../models/gallery.models');
const common = require('../../common');
//create and save gallery info

exports.create = (req,res) =>{

	//validate request
	if(!req.body.title){
		return res.status(400).send({
			message : "title cannot be empty"
		});
	}

	//create gallery info

	const Gallery = new gallery({
		_id : req.body._id,
		title: req.body.title,
		image: req.body.image,
	});

//save gallery info in database

	Gallery.save()
	.then(data=>{
		res.send(data);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while creating the gallery info."
		});
	});
};

//retrive and return all the gallery from database

exports.findAll = (req,res) =>{

	gallery.find()
	.then(gallerys =>{
		res.send(gallerys);
	}).catch(err=>{
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving gallery."
		});
	});

};

//find gallery info with id
exports.findById = (req, res) => {

 	gallery.findById(req.params.galleryId)
    .then(gallerys => {
        if(!gallerys) {
            return res.status(404).send({
                message: "no gallerys found with ID " + req.params.galleryId
            });            
        }
        res.send(gallerys);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "no gallerys found with ID " + req.params.galleryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving gallery with ID " + req.params.galleryId
        });
    });

 };

 //find gallery info with title
exports.findtitle = (req, res) => {

 	gallery.findOne({title:req.params.title})
    .then(gallerys => {
        if(!gallerys) {
            return res.status(404).send({
                message: "no gallerys found with title " + req.params.title
            });            
        }
        res.send(gallerys);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "no gallerys found with title " + req.params.title
            });                
        }
        return res.status(500).send({
            message: "Error retrieving gallery with title " + req.params.title
        });
    });

 };

 // // Update a gallery info with id
 exports.updateId = (req, res) => {
 	 // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "title not be empty"
        });
    }

    // Find gallery info and update it with the request body
    gallery.findByIdAndUpdate(req.params.galleryId, {
        title: req.body.title,
		image: req.body.image,
    }, {new: true})
    .then(gallerys => {
        if(!gallerys) {
            return res.status(404).send({
                message: " gallery info not found with id " + req.params.galleryId
            });
        }
        res.send(gallerys);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "gallery info not found with id " + req.params.galleryId
            });                
        }
        return res.status(500).send({
            message: "Error updating gallery info with id " + req.params.galleryId
        });
    });

 };



// // Delete a gallery info with the specified id in the request
 exports.deleteById = (req, res) => {

 	gallery.findByIdAndRemove(req.params.galleryId)
    .then(gallerys => {
        if(!gallerys) {
            return res.status(404).send({
                message: "gallerys not found with id " + req.params.galleryId
            });
        }
        res.send({message: "gallery deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "gallerys not found with id " + req.params.galleryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete gallerys with id " + req.params.galleryId
        });
    });

 };



