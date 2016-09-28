//angularjs.org home page
var downloadAngularJSOnePage = require('./downloadAngularJSOnePage.js');
var theBasics = require('./theBasics.js');

var HomePage = function(){
    //Download AngularJS 1
    this.downLoadAngularJSOneButton = element(by.css('.btn.btn-large.btn-primary.download-btn'));

    //Try the new Angular 2
    this.tryTheNewAngularTwoButton = element(by.linkText('Design Docs & Notes'));

    //this.centerStageButtons
    //this.viewOnGitHubButton
    //this.designDocsButton

    //click the Download Angular 1 button and return the page object
    this.clickDownloadAngularJSOnePage = function(){
        this.downLoadAngularJSOneButton.click();
        return downloadAngularJSOnePage;
    }
    //The Basics page object
    this.theBasics = function(){
        return theBasics;
    }

};

module.exports = new HomePage();