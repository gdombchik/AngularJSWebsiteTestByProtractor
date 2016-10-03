describe('Test AngularJS Website',function(){
    beforeEach(function(){
        browser.get('http://angularjs.org');
    });

    var homePage = require('./pageObjects/homePage.js');
    var downloadAngularJSOnePage = require('./pageObjects/downloadAngularJSOnePage.js');
    var theBasics = require('./pageObjects/theBasics.js');
    var addSomeControl = require('./pageObjects/addSomeControl.js');

    it('Test basic components on the AngularJS home page',function(){
        //different jasmine matchers(toMatch,toBe,toEqual,toContain)
        expect(homePage.downLoadAngularJSOneButton.getText()).toMatch('AngularJS 1');
        expect(homePage.downLoadAngularJSOneButton.getText()).toBe('Download AngularJS 1\n\n(1.5.8 / 1.2.30)');
        expect(homePage.downLoadAngularJSOneButton.getText()).toEqual('Download AngularJS 1\n\n(1.5.8 / 1.2.30)');
        expect(homePage.downLoadAngularJSOneButton.getText()).toContain('Download AngularJS 1\n\n(1.5.8 / 1.2.30)');

        //click the downLoadAngularJSOneButton and return the DownloadAngularJSOnePage page object
        downloadAngularJSOnePage = homePage.clickDownloadAngularJSOnePage();

        //check the properties of the DownloadAngularJSOnePage
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

        //current todo values
        var values = ['learn angular','build an angular app'];
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
        

        //todos checkbox not selected

        //add new todo


        //todo count


        //todo values


    });
});



