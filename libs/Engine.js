var Request = require("multi-request")
var Promise = require("bluebird")
var underscore = require("underscore")

function SiteCrawler(url,callback,extraData){
	var that = this;
	this.next_page = []
	this.callback = callback;
	this.extraData = extraData
	this.next(url)
	var pr = new Promise(function(resolve,reject){
		that.resolver = resolve;
		that.rejecter = reject;
	})
	this.pr = pr;	
}

var siteCrawlerPrototype = {
	next:function(url){
		this.next_page.push(url)
	},
	crawl:function(){
		var that = this;
		var url = false;
		var callback = this.callback
		if(this.next_page.length){
			url = this.next_page.shift();
		}
		if(url){
			Request(url).then(function(response){
				var body = response.body;
				callback.apply(that,[body])
				that.crawl();
			}).catch(this.rejecter)
		}else{
			console.log("Done")
			this.resolver();
		}
	},
	getExtraData:function(){
		return this.extraData;
	},
	then:function(fn1,fn2){
		return this.pr.then(fn1,fn2)
	},
	catch:function(fn){
		return this.pr.catch(fn);
	}
}

underscore.extend(SiteCrawler.prototype,siteCrawlerPrototype)
module.exports = SiteCrawler