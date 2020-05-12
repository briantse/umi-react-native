import { IApi } from 'umi';
import { join } from 'path';

const runtimeTpl = `import {AppRegistry} from 'react-native';

export function render(clientRender: () => any, args: {hot?: boolean} = {}) {
  console.log('render registerComponent');
  AppRegistry.registerComponent('{{{ appKey }}}', () => clientRender);
}

`;

export default (api: IApi) => {
  api.addRuntimePlugin(() => [join(api.paths.absTmpPath!, 'react-native', 'runtime.ts')]);
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: 'react-native/runtime.ts',
      content: api.utils.Mustache.render(runtimeTpl, {
        appKey: api.config?.reactNative?.appKey,
      }),
    });
  });
};
