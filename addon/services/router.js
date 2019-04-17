import Ember from 'ember';
import RouterService from '@ember/routing/router-service';
import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

// @HACK: since `getEngineParent` is not exported
function getEngineParent(engine) {
  const symbolPrefix = `__ENGINE_PARENT${Ember.GUID_KEY}`;
  const symbol = Object.keys(engine).find(k => k.startsWith(symbolPrefix));
  if (!symbol) {
    return null;
  }
  return engine[symbol];
}

const EngineRouteService = RouterService.reopen({
  engine: computed(function () {
    return getOwner(this);
  }),

  externalRoutes: reads('engine._externalRoutes'),

  mountPoint: reads('engine.mountPoint'),

  rootApplication: computed(function () {
    let parent = getEngineParent(getOwner(this));
    while (getEngineParent(parent)) {
      parent = getEngineParent(parent);
    }
    return parent;
  }),

  externalRouter: computed(function () {
    return this.rootApplication.lookup('service:router');
  }),

  getInternalRouteName(internalRouteName) {
    // https://github.com/ember-engines/ember-engines/blob/ec4d1ae7a413a7e5d9e57a4e3b2e0f0d19a0afcd/addon/components/link-to-component.js#L52-L57
    if (internalRouteName === 'application') {
      return this.mountPoint;
    }
    return `${this.mountPoint}.${internalRouteName}`;
  },

  getExternalRouteName(externalRouteName) {
    assert(
      `External route '${externalRouteName}' is unknown.`,
      externalRouteName in this.externalRoutes
    );
    return this.externalRoutes[externalRouteName];
  },

  transitionToExternal(routeName, ...args) {
    return this.externalRouter.transitionTo(
      this.getExternalRouteName(routeName),
      ...args
    );
  },

  replaceWithExternal(routeName, ...args) {
    return this.externalRouter.replaceWith(
      this.getExternalRouteName(routeName),
      ...args
    );
  }
});

export default Service.extend(EngineRouteService);