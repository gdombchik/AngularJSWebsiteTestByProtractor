var CreateComponents = function () {
    this.getLocales = function(){
        return element.all(by.tagName("h4"));
    }

    this.getUnitedStatesLocalization = function(){
        return element.all(by.xpath("//div[@module='app-us']/div/div/div[1]/span"));
    }

    this.getUnitedStatesPluralization = function(){
        return element.all(by.xpath("//div[@module='app-us']/div/div/div[2]/div/div[*]/ng-pluralize"));
    }

    this.getSlovakiaLocalization = function(){
        return element.all(by.xpath("//div[@module='app-sk']/div/div/div[1]/span"));
    }

    this.getSlovakiaPluralization = function(){
        return element.all(by.xpath("//div[@module='app-sk']/div/div/div[2]/div/div[*]/ng-pluralize"));
    }
};

module.exports = new CreateComponents();
