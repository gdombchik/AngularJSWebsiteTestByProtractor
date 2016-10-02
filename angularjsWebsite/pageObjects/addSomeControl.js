var AddSomeControl = function () {
    this.todoList = element.all(by.repeater('todo in todoList.todos'));
    /*this.getToListAllValues = function () {
        var values = [];
        element.all(by.repeater('todo in todoList.todos')).each(function (element, index) {
            element.getText().then(function (text) {
                //console.log(text);
                values.push('test');
            });
        });
        //var values = ['learn angular','build an angular app'];
        return values;
    }*/
    /*this.getToListAllValues = function () {
        return element.all(by.repeater('todo in todoList.todos')).map(function(elm, index) {
                    return {
                        text: elm.getText()
                    };
                });
    }*/
    this.getToListAllValues = function () {
        return getToListReduce();
    }
};

/*getToListMap = function(){
    var list =  element.all(by.repeater('todo in todoList.todos')).map(function(elm, index) {
        return {
            text: elm.getText()
        };
    });
    browser.sleep(5 * 1000, 'Server should start within 5 seconds');
    return list;
};*/

getToListReduce = function(){
    var list =  element.all(by.repeater('todo in todoList.todos')).reduce(function(acc, elem) { return elem.getText().then(function(text) { return acc + text + ' '; }); }, '').first();
    return list;
};

//element.all(by.repeater('todo in todoList.todos')).reduce(function(acc, elem) { return elem.getText().then(function(text) { return acc + text + ' '; }); }, '');

module.exports = new AddSomeControl();
