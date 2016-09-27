//angularjs.org home page

var HomePage = function(){
    this.downLoadAngularJSOneButton = element(by.css('.btn.btn-large.btn-primary.download-btn'));
    //this.downLoadAngularJSOnePageLabel
    //this.centerStageButtons
    //this.viewOnGitHubButton
    //this.designDocsButton

    this.clickDownloadAngularJSOnePage = function(){
        this.downLoadAngularJSOneButton.click();
        return require('./downloadAngularJSOnePage.js');
    }
};

module.exports = new HomePage();