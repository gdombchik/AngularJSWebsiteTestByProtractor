//Make The Basics its own page object even though technically it is on the angularjs home page
var TheBasics = function(){
    this.setName = function(value){
        this.name = element(by.model('yourName')).sendKeys(value);
    }
    this.getName = function(){
        return element(by.binding('yourName')).getText();
    }
};

module.exports = new TheBasics();