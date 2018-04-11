'use strict';

module.exports = {

  create: function (context) {

    var regex = RegExp((context.options[0] || {}).regex);

    function reportError(node) {
      context.report(node, 'method or identifier name must match regex ' + regex, { identifier: node.name });
    }

    function checkName(node) {
      if (!regex.test(node.key.name)) {
        reportError(node);
      }
    }

    function isFunctionExpressionOrIdentifier(node) {
      return node && (node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression' || node.type === 'Identifier');
    }

    function checkClassProperty(node) {
      if (isFunctionExpressionOrIdentifier(node.value)) {
        checkName(node);
      }
    }

    return {
      MethodDefinition: checkName,
      ClassProperty: checkClassProperty
    };

  }

};
