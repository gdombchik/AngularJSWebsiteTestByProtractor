var WireUpABackend = function () {
    this.getJavaScriptProjects = function(){
        return element.all(by.repeater('project in projectList.projects').column('project.name'));
    }
    this.javaScriptProjectDescriptions = function(){
        return element.all(by.repeater('project in projectList.projects').column('project.description'));
    }


};

module.exports = new WireUpABackend();