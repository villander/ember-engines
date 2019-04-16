import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';

/*
  Creates an aliased form of a method that properly resolves external routes.
*/
function routerAlias(methodName) {
  return function _routerAliasMethod(routeName, ...args) {
    const router = getOwner(this).lookup('service:router');
    return router[methodName](routeName, ...args);
  };
}

Route.reopen({
  transitionToExternal: routerAlias('transitionToExternal'),
  replaceWithExternal: routerAlias('replaceWithExternal'),
});