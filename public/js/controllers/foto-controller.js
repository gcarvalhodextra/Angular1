// $scope - Deixa o controller visivel para a view
angular.module('alurapic')
    .controller('FotoController', function ($scope, $http) {
        $scope.mensagem = '';
        $scope.foto = {};
        $scope.submeter = function () {
            $http.post('/v1/fotos', $scope.foto)
                .success(function () {
                    $scope.foto = {};
                    $scope.mensagem = 'Foto adicionada com sucesso!';
                    console.log('Foto adicionada com sucesso');
                })
                .error(function (erro) {
                    $scope.mensagem = 'Não foi possível cadastrar a foto, ' + erro;
                    console.log('Não foi possível cadastrar a foto');
                })
        };
    });