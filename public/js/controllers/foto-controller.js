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
                    //$scope.focado = true;
                })
                .catch(function (erro) {
                    $scope.mensagem = erro.mensagem;
                });
        };

        /*
        function utf8Encode(unicodeString) {
          if (typeof unicodeString != 'string') {
            throw new TypeError(
                'parameter ‘unicodeString’ is not a string');
          }
          const utf8String = unicodeString.replace(
              /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
              function (c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
              }
          ).replace(
              /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
              function (c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F,
                    0x80 | cc & 0x3f);
              }
          );
          return utf8String;
        }
        */

      /*function utf8Encode(unicodeString) {
        var re = /(?![\x00-\x7F]|[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3})./g;
        console.log(unicodeString.replace(re, ""));
      }*/

      /*
      function utf8Encode(unicodeString) {
        //console.log(unicodeString.replace(/[^a-zA-Z ]/g, ""));
        //console.log(unicodeString.replace(/[^a-zA-Z 0-9]+/g,''));
        console.log(unicodeString.replace(/[&\/\\#,+()$~%.'":*?<>{}!@_]/g,''));
        removerAcentos(unicodeString);
      }

      function removerAcentos(s) {
        console.log(s.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
      }
      */

      function utf8SimpleEncode(string) {
        // Remove special characters
        string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}!@_]/g,'');
        // Remove accentuation
        string = string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        // Replace ç
        string = string.replace(/[cÇ]/,'c');

        return string;
      }
    });