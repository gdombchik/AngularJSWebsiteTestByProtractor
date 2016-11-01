var WireUpABackend = function () {
    this.getJavaScriptProjects = function(){
        return element.all(by.repeater('project in projectList.projects').column('project.name'));
    }
    this.getJavaScriptProjectDescriptions = function(){
        return element.all(by.repeater('project in projectList.projects').column('project.description'));
    }
    this.searchInput = element(by.model('projectList.search'));
    this.getJavaScriptProjectEditLinks = function() {
        return element.all(by.xpath("//tr[*]/td[3]/a"));
    }
    this.editJavaScriptProjectName = element(by.model('editProject.project.name'));
    this.editJavaScriptProjectWebsite = element(by.model('editProject.project.site'));
    this.editJavaScriptProjectDescription = element(by.model('editProject.project.description'));
    this.saveButton = element(by.partialButtonText('Save'));

};

module.exports = new WireUpABackend();