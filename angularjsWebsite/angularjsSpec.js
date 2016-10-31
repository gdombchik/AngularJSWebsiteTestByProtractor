describe('Test AngularJS Website',function(){
    beforeEach(function(){
        browser.get('http://angularjs.org');
    });

    var homePage = require('./pageObjects/homePage.js');
    var downloadAngularJSOnePage = require('./pageObjects/downloadAngularJSOnePage.js');
    var theBasics = require('./pageObjects/theBasics.js');
    var addSomeControl = require('./pageObjects/addSomeControl.js');
    var wireUpABackend = require('./pageObjects/wireUpABackend.js');
    var createComponents = require('./pageObjects/createComponents.js');

    it('Test basic components on the AngularJS home page',function(){
        //different jasmine matchers(toMatch,toBe,toEqual,toContain)
        expect(homePage.downLoadAngularJSOneButton.getText()).toMatch('AngularJS 1');
        expect(homePage.downLoadAngularJSOneButton.getText()).toBe('Download AngularJS 1\n\n(1.5.8 / 1.2.30)');
        expect(homePage.downLoadAngularJSOneButton.getText()).toEqual('Download AngularJS 1\n\n(1.5.8 / 1.2.30)');
        expect(homePage.downLoadAngularJSOneButton.getText()).toContain('Download AngularJS 1\n\n(1.5.8 / 1.2.30)');

        //click the downLoadAngularJSOneButton and return the DownloadAngularJSOnePage page object
        downloadAngularJSOnePage = homePage.clickDownloadAngularJSOnePage();

        //check the properties of the DownloadAngularJSOnePage
        browser.wait(downloadAngularJSOnePage.titleLabel.getText()).isPresent;
        expect(downloadAngularJSOnePage.titleLabel.getText()).toBe('Download AngularJS');
        expect(downloadAngularJSOnePage.branch.getText()).toBe('1.5.x (stable)');
        expect(downloadAngularJSOnePage.buildMinified.getText()).toBe('Minified');
        expect(downloadAngularJSOnePage.buildUncompressed.getText()).toBe('Uncompressed');
        expect(downloadAngularJSOnePage.buildZip.getText()).toBe('Zip');
        expect(downloadAngularJSOnePage.cdn.getAttribute('value')).toContain('angular.min.js');

        //which build button has been selected
        expect(downloadAngularJSOnePage.buildMinified.getAttribute('class')).toContain('active'); //selected
        expect(downloadAngularJSOnePage.buildUncompressed.getAttribute('class')).not.toContain('active'); //not selected
        expect(downloadAngularJSOnePage.buildZip.getAttribute('class')).not.toContain('active'); //not selected

        expect(downloadAngularJSOnePage.getBower()).toContain('bower');
        expect(downloadAngularJSOnePage.getNpm()).toContain('npm');
        expect(downloadAngularJSOnePage.extras.getText()).toEqual('Browse additional modules');
        expect(downloadAngularJSOnePage.previousVersions.getText()).toEqual('Previous Versions');
        expect(downloadAngularJSOnePage.getDownloadButton()).toContain('angular.min.js');

        //Close Button
        var closeButton = downloadAngularJSOnePage.getCloseButton();
        expect(closeButton.getText()).toBe('×');
        closeButton.click();

        expect(homePage.tryTheNewAngularTwoButton.getText()).toBe('Design Docs & Notes');

        //browser.sleep(5 * 1000, 'Server should start within 5 seconds');
    });

    it('Test The Basics',function(){
        theBasics = homePage.getTheBasics();
        theBasics.setName("Greg");
        expect(theBasics.getName()).toBe('Hello Greg!');
    });

    it('Test Add Some Control',function(){
        addSomeControl = homePage.getAddSomeControl();

        //initial todo count
        expect(addSomeControl.todoList.count()).toBe(2);

        //the initial todo values
        var values = ['learn angular','build an angular app'];

        //current todo values
        addSomeControl.todoList.each(function (element, index) {
            element.getText().then(function (text) {
                expect(values[index]).toBe(text);
            });
        });

        //------not currently being used (below)----
        //this works for map
        /*var values = [ { text: 'learn angular' }, { text: 'build an angular app' } ];
        addSomeControl.getToListAllValues().then(function(text){
            expect(values).toEqual(text);
        });*/

        //this works for reduce
        /*var values = 'learn angular build an angular app ';
        addSomeControl.getToListAllValues().then(function(text){
            expect(values).toEqual(text);
        });*/

        //expect(JSON.stringify(values)==JSON.stringify(addSomeControl.getToListAllValues())).toBe(true);
        //------not currently being used (above)----

        //todos checkbox selected
        addSomeControl.todoListChecked.each(function (element, index) {
            element.getText().then(function (text) {
                expect(values[0]).toBe(text); //learn angular
            });
        });

        //todos checkbox not selected
        addSomeControl.todoListNotChecked.each(function (element, index) {
            element.getText().then(function (text) {
                expect(values[1]).toBe(text); //build an angular app
            });
        });

        //add new todo
        var newTodo = 'Go to the dentist';
        addSomeControl.addNewTodo(newTodo);
        addSomeControl.addButton().click(); //click the add button to add the new todo value

        expect(addSomeControl.todoList.count()).toBe(3);  //todo count has increased to three

        var newTodoValues = [values[1],newTodo];  //'build an angular app' and 'Go to the dentist'
        addSomeControl.todoListNotChecked.each(function (element, index) { //recheck the checkbox not selected values
            element.getText().then(function (text) {
                expect(newTodoValues[index]).toBe(text); //'build an angular app' and 'Go to the dentist'
            });
        });

        addSomeControl.todoList.each(function (element, index) { //recheck the checkbox not selected values
            element.getText().then(function (text) {
                if(text == newTodo){
                    addSomeControl.checkBoxes.get(index).click(); //check the 'Go to the dentist' checkbox
                }
            });
        });

        addSomeControl.todoListNotChecked.each(function (element, index) { //recheck the checkbox not selected values
            element.getText().then(function (text) {
                expect(values[1]).toBe(text); //'build an angular app'
            });
        });

        var todoListCheckedValues = [values[0],newTodo];  //'build an angular app' and 'Go to the dentist'
        addSomeControl.todoListChecked.each(function (element, index) {
            element.getText().then(function (text) {
                expect(todoListCheckedValues[index]).toBe(text); //'learn angular' and 'Go to the dentist'
            });
        });


    });

    it('Test Wire Up A Backend',function(){
        //need to wait for element.all to become available
        browser.wait(presenceOfAll(wireUpABackend.getJavaScriptProjects()), 10000);

        var javaScriptProjectValues = ['Angular 2','AngularJS','Backbone','Cappucino','Ember','GWT','jQuery','Knockout','Polymer','React','Spine','SproutCore'];
        wireUpABackend.getJavaScriptProjects().each(function (element, index) {
            element.getText().then(function (text) {
                expect(javaScriptProjectValues[index]).toBe(text);
            });
        });

        var javaScriptProjectDescriptionsValues = ['One framework. Mobile and desktop.',
                                                 'HTML enhanced for web apps!',
                                                 'Models for your apps.',
                                                 'Objective-J.',
                                                 'Ambitious web apps.',
                                                 'JS in Java.',
                                                 'Write less, do more.',
                                                 'MVVM pattern.',
                                                 'Reusable components for the modern web.',
                                                 'A JavaScript library for building user interfaces.',
                                                 'Awesome MVC Apps.',
                                                 'A Framework for Innovative web-apps.'];
        wireUpABackend.javaScriptProjectDescriptions().each(function (element, index) {
            element.getText().then(function (text) {
                expect(javaScriptProjectDescriptionsValues[index]).toBe(text);
            });
        });

        var updateJavaScriptProjectsValues = ['GWT',
                                             'http://www.gwtproject.org/',
                                             'JS in Java.',
                                             'GWT_Updated',
                                             'http://www.gwtproject_updated.org/',
                                             'JS in Java._Updated'];

    });

    it('Test Create Components',function(){
        //Locales
        var localesValues = ['Locale: US','Locale: SK'];
        createComponents.getLocales().each(function (element, index) {
            element.getText().then(function (text) {
                expect(localesValues[index]).toBe(text);
            });
        });

        //United States Localization
        var unitedStatesLocalizationValues = ['Date: Sunday, April 1, 2012','Currency: $123,456.00','Number: 98,765.432'];
        createComponents.getUnitedStatesLocalization().each(function (element, index) {
            element.getText().then(function (text) {
                expect(unitedStatesLocalizationValues[index]).toBe(text);
            });
        });

        //United States Pluralization
        var unitedStatesPluralizationValues = ['no beers','1 beer','2 beers','3 beers','4 beers','5 beers','6 beers'];
        createComponents.getUnitedStatesPluralization().each(function (element, index) {
            element.getAttribute('innerHTML').then(function (text) {
                expect(unitedStatesPluralizationValues[index]).toBe(text);
            });
        });

        //Slovakia Localization
        var slovakiaLocalizationValues = ['Date: nedeľa, 1. apríla 2012','Currency: 123 456,00 €','Number: 98 765,432'];
        createComponents.getSlovakiaLocalization().each(function (element, index) {
            element.getText().then(function (text) {
                expect(slovakiaLocalizationValues[index]).toBe(text);
            });
        });

        //Slovakia Pluralization
        var slovakiaPluralizationValues = ['žiadne pivo','1 pivo','2 pivá','3 pivá','4 pivá','5 pív','6 pív'];
        createComponents.getSlovakiaPluralization().each(function (element, index) {
            element.getAttribute('innerHTML').then(function (text) {
                expect(slovakiaPluralizationValues[index]).toBe(text);
            });
        });
    });

    //http://stackoverflow.com/questions/34289029/protractor-wait-doesnt-work-with-element-all
    function presenceOfAll(elementArrayFinder) {
        return function () {
            return elementArrayFinder.count(function (count) {
                return count > 0;
            });
        };
    }
});



