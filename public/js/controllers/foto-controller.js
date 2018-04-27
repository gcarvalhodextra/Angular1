// $scope - Deixa o controller visivel para a view
angular.module('alurapic')
    .controller('FotoController', function ($scope, urlFoto, $routeParams, fotosService) {
        //.controller('FotoController', function ($scope, $http, $routeParams) {
        $scope.mensagem = '';
        $scope.foto = {};

        /*
        if ($routeParams.fotoId) {
            $http.get('/v1/fotos/' + $routeParams.fotoId)
                .success(function (foto) {
                    $scope.foto = foto;
                })
                .error(function (erro) {
                    $scope.mensagem = 'Não foi possível obter a foto'
                });
        }
        */

        // Get
        if ($routeParams.fotoId) {
            fotosService.get($routeParams.fotoId)
                .then(function (dados) {
                    $scope.foto = dados.foto;
                })
                .catch(function (erro) {
                    $scope.mensagem = erro.mensagem;
                });
        }

        /*
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
        */

        $scope.submeter = function () {
            // Verifica se o formulário é valido
            if (!$scope.formulario.$valid) {
                return;
            }
            fotosService.cadastrar($scope.foto)
                .then(function (dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao) $scope.foto = {};
                })
                .catch(function (erro) {
                    $scope.mensagem = erro.mensagem;
                });
        };
    });