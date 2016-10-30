describe('Test AngularJS Website',function(){
    beforeEach(function(){
        browser.get('http://angularjs.org');
    });

    var homePage = require('./pageObjects/homePage.js');
    var downloadAngularJSOnePage = require('./pageObjects/downloadAngularJSOnePage.js');
    var theBasics = require('./pageObjects/theBasics.js');
    var addSomeControl = require('./pageObjects/addSomeControl.js');
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
        /*element.all(by.repeater('project in projectList.projects').column('project.name')).each(function (element, index) {
            console.log('inside element.all');
            element.getText().then(function (text) {
                console.log(text);
            });
        });*/
        //element.all(by.repeater('todo in todoList.todos')).each(function (element, index) {
        //browser.wait(element.all(by.repeater('project in projectList.projects'))).isPresent;




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
        var localesValues = ['Locale: US','Locale: SK'];


        //United States Pluralization

        //Slovakia Localization

        //United States Pluralization

    });
});



