describe('Test AngularJS Website',function(){
    beforeEach(function(){
        browser.get('http://angularjs.org');
    });

    var homePage = require('./pageObjects/homePage.js');
    var downloadAngularJSOnePage = require('./pageObjects/downloadAngularJSOnePage.js');

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


        console.log('in the jasmine it');
    });
});



