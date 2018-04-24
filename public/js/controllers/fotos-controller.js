// $scope - Deixa o controller visivel para a view
angular.module('alurapic').controller('FotosController', function ($scope, $http) {
    /*
    $scope.fotos = [
        {
            titulo: 'Leão',
            url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
        },
        {
            titulo: 'Leão2',
            url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
        },
        {
            titulo: 'Leão3',
            url : 'http://www.fundosanimais.com/Minis/leoes.jpg'
        }
    ];
    */

    $scope.filtro = '';

    $scope.fotos = [];
    $http.get('/v1/fotos')
        .success(function (response) {
            $scope.fotos = response;
        })
        .error(function (erro) {
            console.log(erro);
        });
});
