// Nome do modulo sem dependencia, na criação não pode omitir o []
angular.module('alurapic', ['minhasDiretivas', 'ngAnimate', 'ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        // Remove o # do link partials
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/fotos', {
                templateUrl: 'partials/principal.html',
                controller: 'FotosController'
            })
            .when('/fotos/new', {
                templateUrl: 'partials/foto.html'
            })
            .otherwise({redirectTo: '/fotos'});
    });
