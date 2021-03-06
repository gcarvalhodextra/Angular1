// Nome do modulo sem dependencia, na criação não pode omitir o []
angular.module(
    'alurapic', [
        'minhasDiretivas',
        'ngAnimate',
        'ngRoute',
        'ngResource',
        'servicos'
    ])
    .config(function ($routeProvider, $locationProvider) {
        // Remove o # do link partials
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/fotos', {
                templateUrl: 'partials/principal.html',
                controller: 'FotosController'
            })
            .when('/fotos/new', {
                templateUrl: 'partials/foto.html',
                controller: 'FotoController'
            })
            .when('/fotos/edit/:fotoId', {
                templateUrl: 'partials/foto.html',
                controller: 'FotoController'
            })
            .otherwise({redirectTo: '/fotos'});
    });
