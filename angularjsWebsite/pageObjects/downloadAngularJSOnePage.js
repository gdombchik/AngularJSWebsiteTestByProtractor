//return ElementFinder of the properties of the DownloadAngularJSOnePage function constructor
var DownloadAngularJSOnePage = function(){
    this.titleLabel = element(by.id('downloadLabel'));
    //branch
    this.branch = element(by.buttonText('1.5.x (stable)'));
    //build
    this.buildMinified = element(by.buttonText('Minified'));
    this.buildZip = element(by.partialButtonText('Zip'));                   //button text has extra spaces
    this.buildUncompressed = element(by.partialButtonText('Uncompressed')); //button text has extra spaces
    //cdn
    this.cdn = element(by.id('cdnURL'));
    //bower
    this.getBower = function(){
        return getInputBoxByAttributeValue('bower');
    };
    //npm
    this.getNpm = function(){
        return getInputBoxByAttributeValue('npm');
    };
    //extras
    //this.extras = browser.findElement(by.xpath('//dd/span/a')).getText();
    this.extras = element(by.linkText('Browse additional modules'));
    //previous versions
    this.previousVersions = element(by.linkText('Previous Versions'));
    //download button
    this.getDownloadButton = function(){
        return getDownloadBoxByAttributeHref('angular.min.js');
    };
    //close button
    this.getCloseButton = function(){
        return getCloseButton();
    };
}

//private functions - protractor throws errors if I try to assign these functions directly to the property value
getInputBoxByAttributeValue = function(value){
    return element.all(by.tagName('input')).filter(function(elem, index) { return elem.getAttribute('value').then(function(text) { return text.indexOf(value) != -1; }); }).first().getAttribute('value');
};
getDownloadBoxByAttributeHref = function(value){
    return element.all(by.css('.btn.btn-primary.btn-large')).filter(function(elem, index) { return elem.getAttribute('href').then(function(text) { return text.indexOf('angular.min.js') != -1; }); }).first().getAttribute('href');
};
getCloseButton = function(){
    return element.all(by.tagName('button')).filter(function(elem, index) { return elem.getAttribute('class').then(function(text) { return text.indexOf('close') != -1; }); }).first().getAttribute('value');
};



module.exports = new DownloadAngularJSOnePage;
