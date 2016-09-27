var DownloadAngularJSOnePage = function(){
    this.titleLabel = element(by.id('downloadLabel'));

    //branch
    this.branch = element(by.buttonText('1.5.x (stable)'));
    //build
    this.build;
    //cdn
    this.cdn;
    //bower
    this.bower;
    //npm
    this.npm;
    //extras
    this.extras;
    //previous versions
    this.previousVersions;
    //download button
    this.downloadButton;

}

module.exports = new DownloadAngularJSOnePage;
