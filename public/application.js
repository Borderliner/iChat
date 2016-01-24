var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName, []);

angular.element(document).ready(function(){
	angular.bootstrap(document, [mainApplicationModuleName]);
});