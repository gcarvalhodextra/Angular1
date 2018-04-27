// Ele sabe se é insert ou update
angular.module('servicos', ['ngResource'])
    .factory('urlFoto', function ($resource) {
        return $resource('/v1/fotos/:fotoId', null, {
            'update': {
                method: 'PUT'
            }
        });
    })
    .factory("fotosService", function (urlFoto, $q, $rootScope) {
        var service = {};

        service.cadastrar = foto => {
            // Retorna resolve ou reject
            return $q(function (resolve, reject) {
                if (foto._id) {
                    urlFoto.update({fotoId: foto._id}, foto, function () {
                        // Focus no voltar
                        $rootScope.$broadcast('fotoCadastrada');
                        resolve({
                            /*Eu posso escolher os itens do retorno*/
                            mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso',
                            inclusao: false
                        });
                    }, function (erro) {
                        reject({
                            mensagem: 'Não foi possível atualizar a foto ' + foto.titulo
                        });
                    });
                } else {
                    urlFoto.save(foto, function () {
                        // Focus no voltar
                        $rootScope.$broadcast('fotoCadastrada');
                        resolve({
                            mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso',
                            inclusao: true
                        });
                    }, function (erro) {
                        reject({
                            mensagem: 'Não foi possível incluir a foto ' + foto.titulo
                        });
                    });
                }
            });
        };

        // Utilizando arrow function
        service.get = fotoId => $q(function (resolve, reject) {
            urlFoto.get({fotoId: fotoId}, function (foto) {
                resolve({
                    foto: foto
                });
            }, function (erro) {
                reject({
                    mensagem: 'Não foi possível obter a foto ' + foto.titulo
                });
            })
        });

        return service;
    });