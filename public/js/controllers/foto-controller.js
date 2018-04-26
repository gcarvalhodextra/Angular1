// $scope - Deixa o controller visivel para a view
angular.module('alurapic')
    .controller('FotoController', function ($scope, $http, $routeParams) {
        $scope.mensagem = '';
        $scope.foto = {};

        if ($routeParams.fotoId) {
            $http.get('/v1/fotos/' + $routeParams.fotoId)
                .success(function (foto) {
                    $scope.foto = foto;
                })
                .error(function (erro) {
                    console.log(erro);
                    $scope.mensagem = 'Não foi possível obter a foto'
                });
        }

        $scope.submeter = function () {
            if ($routeParams.fotoId) {
                // Update
                $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                    .success(function () {
                        $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' alterada com sucesso!';

                    })
                    .error(function (erro) {
                        $scope.mensagem = 'Não foi possível alterar, ' + erro;
                    });
            } else {
                // Insert
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
            }
        };
    });