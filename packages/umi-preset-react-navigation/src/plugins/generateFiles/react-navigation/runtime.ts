import { IApi } from 'umi';
import { dirname, join } from 'path';
import runtimeTpl from './runtimeTpl';

export default (api: IApi) => {
  const {
    utils: { Mustache, winPath, resolve },
    paths: { absSrcPath },
  } = api;

  /**
   * 优先读取用户目录下依赖的绝对路径
   * @param library 比如：'react-native'（目录） 或者 'react-router/esm/index.js'（文件）
   * @param defaults library找不到时的缺省值
   * @param dir true-返回目录绝对路径，false-返回文件绝对路径
   * @param basedir 用户目录查找起始路径
   */
  function getUserLibDir(library: string, defaults: string, dir: boolean = false, basedir = absSrcPath): string {
    try {
      const path = resolve.sync(library, {
        basedir,
      });
      if (dir) {
        return dirname(path);
      } else {
        return path;
      }
    } catch (ignored) {}
    return defaults;
  }

  api.addEntryImportsAhead(() => [
    {
      source: 'react-native-gesture-handler',
    },
  ]);
  api.addEntryImports(() => [
    {
      specifier: '{enableScreens}',
      source: 'react-native-screens',
    },
  ]);
  api.addEntryCodeAhead(() => `enableScreens();`);

  api.addRuntimePluginKey(() => [
    'onReactNavigationStateChange',
    'getReactNavigationInitialState',
    'getReactNavigationInitialIndicator',
    'getReactNavigationDefaultScreenOptions',
    'getReactNavigationInitialRouteName',
  ]);

  api.addRuntimePlugin(() => [join(api.paths.absTmpPath || '', 'react-navigation', 'runtime')]);

  api.modifyRendererPath(() => 'umi-renderer-react-navigation');

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: 'react-navigation/runtime.ts',
      content: Mustache.render(runtimeTpl, {
        reactNavigationPath: winPath(
          getUserLibDir(
            '@react-navigation/native/package.json',
            dirname(require.resolve('@react-navigation/native/package.json')),
            true,
          ),
        ),
        theme: JSON.stringify(api.config?.reactNavigation?.theme || {}, null, 2),
      }),
    });
  });
};
