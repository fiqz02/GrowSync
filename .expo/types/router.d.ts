/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/firebase.config`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/authentication` | `/authentication`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/graph` | `/graph`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/irrigationControl` | `/irrigationControl`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/setting` | `/setting`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/firebase.config`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/authentication` | `/authentication`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/graph` | `/graph`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/irrigationControl` | `/irrigationControl`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/setting` | `/setting`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/firebase.config${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/authentication${`?${string}` | `#${string}` | ''}` | `/authentication${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}${'/(tabs)'}/graph${`?${string}` | `#${string}` | ''}` | `/graph${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}${'/(tabs)'}/irrigationControl${`?${string}` | `#${string}` | ''}` | `/irrigationControl${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}${'/(tabs)'}/setting${`?${string}` | `#${string}` | ''}` | `/setting${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/firebase.config`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/authentication` | `/authentication`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/graph` | `/graph`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/irrigationControl` | `/irrigationControl`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}${'/(tabs)'}/setting` | `/setting`; params?: Router.UnknownInputParams; };
    }
  }
}