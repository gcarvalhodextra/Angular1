angular
    .module('minhasDiretivas', [])
    .directive('meuPainel', function () {
        //Escreve assim: meuPainel
        //Chama assim:   <meu-painel></meu-painel>

        //DDO = Direction definition object
        var ddo = {};
        //Restrição de uso - Pode ser usada como atributo ou elemento
        ddo.restrict = "AE";

        //Criar um scope privado para reutilizar o compomente
        //Recebe o titulo
        //Se o nome for diferente tem que colocar assim: titulo: '@titulo'
        ddo.scope = {
            titulo: '@'
        };

        //Manter o elemento filho
        ddo.transclude = true;
        //<div class="panel-body" ng-transclude> - Recebe os filhos

        /*
        ddo.template =
            '<div class=\"panel panel-default\">'
            + '   <div class="panel-heading">'
            + '        <h3 class="panel-title text-center">{{titulo}}</h3> '
            + '   </div>'
            + '   <div class="panel-body" ng-transclude>'
            + '   </div>'
            + '</div>';
        */

        ddo.templateUrl = 'js/directives/meu-painel.html';

        return ddo;
    })
    .directive('validateMessage', function () {
        var ddo = {};
        ddo.templateUrl = 'js/directives/validade-msg.html';
        return ddo;
    })
    .directive('minhaFoto', function () {
        var ddo = {};
        ddo.scope = {
            url: '@',
            titulo: '@'
        };
        ddo.templateUrl = 'js/directives/minha-foto.html';
        return ddo;
    })
    .directive('meuFocus', function () {
        var ddo = {};
        ddo.restrict = "A";
        // Se mudar no controller muda na diretiva
        /*
        ddo.scope = {
            focado: '='
        };
        */

        /*
        // Fica escutando
        ddo.link = function (scope, element) {
            scope.$watch('focado', function () {
                // Executado toda vez que o valor mudar,
                if (scope.focado) {
                    // Se mudou e é verdadeiro, o elemento deve ganhar o foco
                    element[0].focus();
                    scope.focado = false;
                }
            });
        };
        */

        // Fica escutando
        ddo.link = function (scope, element) {
            scope.$on('fotoCadastrada', function () {
                element[0].focus();
            });
        };

        return ddo;
    })
    .directive('meusTitulos', function () {
        // Preenche uma lista de titulos, legal para utilizar em filters
        var ddo = {};
        ddo.restrict = 'E';
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
        ddo.controller = function ($scope, recursoFoto) {
            recursoFoto.query(function (fotos) {
                $scope.titulos = fotos.map(function (foto) {
                    return foto.titulo;
                });
            });
        };
        return ddo;
    });