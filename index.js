require('./index.less');

var dataTmpl = require('./data.vash');
var Pouch = require('pouchdb');
var db = new Pouch('some_db2');
var $ = require('jquery');

function replicateFrom(){
db.replicate.from($('#url').val(), {live: false})
	.on('complete', function(info){
		db.allDocs({include_docs: true, descending: true})
			.then(function(res){
				var docs = res.rows.map(function(item){return item.doc;});
				var $div = $('<div class="results"></div');
				$div.append(dataTmpl({docs: docs}));
				$('body').append($div);
			});
	})
	.on('error', function(err){
		console.error('Download errror: ' + err.message);
		console.error(err);
	});
}

$(function(){

	$('button').click(function(){
		$('.results').fadeOut('fast');
		replicateFrom();
	});
});

