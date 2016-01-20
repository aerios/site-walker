var expect = require("chai").expect;
var assert = require('assert')
var sinon = require('sinon');
var Promise = require("bluebird")
var SiteWalker = require("../index");

describe("SiteWalker",function(){
	it("should be able to receive from page",function(done){
		var c = 0;
		var max = 2;
		var instance = new SiteWalker("http://google.com",function(pageStr){
			console.log("C ==",c)			
			if(c < max){
				this.next("http://google.com")
				c += 1
			}
		})
		instance.then(function(){
			console.log("Ha")
			expect(c).to.be.equal(max)
			done()
		}).catch(done)
		instance.crawl();
	})
	it("should be able to drop from page",function(done){
		var c = 0;
		var max = 10;
		var instance = new SiteWalker("http://google.com",function(pageStr){
			console.log("C ==",c)			
			if(c < max){
				this.next("http://google.com")
				c += 1
			}
			if(c == 7){
				this.next("sapiterbang")
			}
		})
		instance.then(function(){

		}).catch(function(err){
			expect(err).to.be.instanceOf(Error)
			done();
		})
		instance.crawl();
	})
})
