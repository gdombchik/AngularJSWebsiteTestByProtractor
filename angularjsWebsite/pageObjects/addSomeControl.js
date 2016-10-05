var AddSomeControl = function () {
    this.todoList = element.all(by.repeater('todo in todoList.todos'));
    this.todoListChecked = element.all(by.css('.done-true'));
    this.todoListNotChecked = element.all(by.css('.done-false'));
    this.addNewTodo = function(value){
        return element(by.model('todoList.todoText')).sendKeys(value);
    }
    this.addButton = function(){
        return element(by.buttonText('add'));
    }

    this.checkBoxes = element.all(by.css('input[type=checkbox]'));

    //does not work
    /*this.clickCheckBox = function(value){
        this.todoList.each(function (element, index) {
            element.getText().then(function (text) {
                if(text == value){
                    //console.log(text);
                    this.checkBoxes.get(index).click(); //check the 'Go to the dentist' checkbox
                    //this.checkBoxValues.get(index).click();
                }
            });
        });
    }*/

    /*this.getToListAllValues = function () {
        var values = [];
        element.all(by.repeater('todo in todoList.todos')).each(function (element, index) {
            element.getText().then(function (text) {
                console.log(text);
                //values.push('test');
            });
        });
        //var values = ['learn angular','build an angular app'];
        return values;
    }*/
    /*this.getToListAllValues = function () {
        return getToListMap();
    }*/
};

getToListMap = function(){
    var list =  element.all(by.repeater('todo in todoList.todos')).map(function(elm, index) {
        return {
            text: elm.getText()
        };
    });
    return list;
};

getToListReduce = function(){
    var list =  element.all(by.repeater('todo in todoList.todos')).reduce(function(acc, elem) { return elem.getText().then(function(text) { return acc + text + ' '; }); }, '');
    return list;
};

module.exports = new AddSomeControl();
