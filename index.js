require('./index.less');

var dataTmpl = require('./data.vash');
var Pouch = require('pouchdb');
var db = new Pouch('some_db');
var $ = require('jquery');

$(function(){
	db.replicate.from($('#url').val(), {live: false})
		.on('complete', function(info){
			db.allDocs({include_docs: true, descending: true})
				.then(function(res){
					var docs = res.rows.map(function(item){return item.doc;});
					$('body').append(dataTmpl({docs: docs}));
				});
		})
		.on('error', function(err){
			console.error('Download errror: ' + err.message);
			console.error(err);
		});

});

