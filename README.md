# SiteWalker.js

Simple web crawler with basic capability to crawl next page based on callback

## How to install

`$ npm install site-walker`

## Usage

```javascript
var SiteWalker = require("site-walker")
var instance = new SiteWalker("http://someawesome.site.com",function(pageStr){
    //callback is fired when page is successfully crawled
    //pageStr contains crawled page, in string
    //do some scrapping here and there
    var nextUrl = "http://someawesome.site.com/page/2" //assume that page/2 is scrapped from current pageStr
    this.next(nextUrl)
})
instance
.then(function(){
    //fired when no nextUrl is supplied from callback
})
.catch(function(reason){
    //fired when error on retrieving page.
})
instance.crawl() //invoke crawling
```

You can call `this.next(nextUrl)` several times during callback. If so, the next url that will be crawled the first supplied nextUrl, and so on. For example : 
```javascript
    //supplied callback
    function(pageStr){
        //scrap scrap
        this.next(url1);
        this.next(url2);
        if(someConditionIsMet){
            this.next(url3)
        }
    }
```
the crawled page order will be : 
```
url1 -> url2 -> url1 -> url2
```
If during callback, `someConditionisMet` evaluate to `true`, the order of execution will be : 
```
url1 -> url2 -> url3 -> url1 -> url2
```

## Notes

 - Currently, if during crawling a URL is failed to be crawled, SiteWalker will break the execution and throw `reject`
 - No `stop()` method is available. So, if you keep supplying `nextUrl` on callback, SiteWalker will run forever (theoretically)

## GitHub

https://github.com/aerios/site-walker
