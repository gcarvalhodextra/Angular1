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
    });

