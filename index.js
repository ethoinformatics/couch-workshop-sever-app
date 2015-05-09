require('./index.less');

var dataTmpl = require('./data.vash');
var Pouch = require('pouchdb');
var db = new Pouch('some_db3');
var $ = require('jquery');

function renderDocs(){
	db.allDocs({include_docs: true, descending: true})
		.then(function(res){
			var docs = res.rows.map(function(item){return item.doc;});
			var $div = $('<div class="results"></div');
			$div.append(dataTmpl({docs: docs}));
			$('body').append($div);
		});
}
function replicateFrom(){
	db.replicate.from($('#url').val(), {live: false})
		.on('complete', function(info){
			renderDocs();
		})
		.on('error', function(err){
			window.alert('Download errror: ' + err.message);
			console.error(err);
		});
}

$(function(){

	renderDocs();

	$('button').click(function(){
		$('.results').fadeOut('fast');
		replicateFrom();
	});
});

