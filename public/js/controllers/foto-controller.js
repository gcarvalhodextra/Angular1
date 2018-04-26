// $scope - Deixa o controller visivel para a view
angular.module('alurapic')
    .controller('FotoController', function ($scope, urlFoto, $routeParams) {
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
            urlFoto.get({fotoId: $routeParams.fotoId}, function (foto) {
                $scope.foto = foto;
            }, function (erro) {
                $scope.mensagem = 'Não foi possível obter a foto' + erro;
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
            if (!$routeParams.fotoId) {
                // Insert (POST)
                urlFoto.save($scope.foto, function () {
                    $scope.foto = {};
                    $scope.mensagem = 'Foto cadastrada com sucesso';
                }, function (erro) {
                    $scope.mensagem = 'Não foi possível cadastrar a foto' + erro;
                });
            } else {
                // Update (PUT)
                urlFoto.update(
                    {fotoId: $scope.foto._id}, $scope.foto, function () {
                        $scope.mensagem = 'Foto alterada com sucesso';
                    }, function () {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível alterar' + erro;
                    });
            }
        };
    });