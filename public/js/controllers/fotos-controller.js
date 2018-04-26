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

    $scope.mensagem = '';
    $scope.filtro = '';
    $scope.fotos = [];
    $http.get('/v1/fotos')
        .success(function (response) {
            $scope.fotos = response;
        })
        .error(function (erro) {
            console.log(erro);
        });

    $scope.remover = function (foto) {
        $http.delete('/v1/fotos/' + foto._id)
            .success(function () {
                // Remove a foto do array
                var indiceDaFoto = $scope.fotos.indexOf(foto);
                $scope.fotos.splice(indiceDaFoto, 1);

                console.log('Foto ' + foto.titulo + ' removida com sucesso!');
                $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
            })
            .error(function (erro) {
                console.log('Não foi possível apagar a foto ' + foto.titulo);
                $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
            });
    };
});
