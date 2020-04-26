# umi-react-native

[umi](https://umijs.org/) preset plugins for react-native.

> 👷 正在施工...

- [x] umi-react-native-cli：删减版命令行工具（`umi-rn`)，相比 [umi](https://umijs.org/) 移除了强依赖 DOM 的内建（built in）插件，**必需**；
- [x] umi-preset-react-native：umi-react-native 插件集，**必需**；
- [ ] umi-plugin-react-native-bundler-metro：RN 官方 [metro](https://facebook.github.io/metro/) 打包器，与 haul 只能**二选一**；
- [ ] umi-plugin-react-native-bundler-haul：第三方 [haul](https://github.com/callstack/haul) 打包器，与 metro 只能**二选一**。

## 目录

- [必备](#%E5%BF%85%E5%A4%87)
- [安装](#%E5%AE%89%E8%A3%85)
- [配置](#%E9%85%8D%E7%BD%AE)
- [使用](#%E4%BD%BF%E7%94%A8)
  - [开发](#%E5%BC%80%E5%8F%91)
  - [构建离线包（offline bundle）](#%E6%9E%84%E5%BB%BA%E7%A6%BB%E7%BA%BF%E5%8C%85offline-bundle)

## 必备

- umi 3.0 及以上版本；
- RN 工程（已有，或使用`react-native init`新建）；

## 安装

### 安装`umi-rn`命令行工具

在 RN 工程内部安装：

```npm
yarn add umi-react-native-cli --dev
```

或者全局安装：

```npm
yarn global add umi-react-native-cli
```

### 安装 react-native 预设插件集

在 RN 工程内部安装：

```npm
yarn add umi-preset-react-native --dev
```

### 安装 react-native 打包器

**二选一，同时安装会导致 umi 报错（`dev-rn`和`build-rn`命令行工具冲突）。**

选用官方[metro](https://facebook.github.io/metro/)打包：

```npm
yarn add umi-plugin-react-native-bundler-metro  --dev
```

**注意：**

```json
{
  "name": "umi-plugin-react-native-bundler-metro",
  "engines": {
    "node": ">=8.3"
  },
  "peerDependencies": {
    "metro": "^0.58.0",
    "react": "^16.11.0",
    "react-native": ">=0.62.0-rc.0 <1.0.x"
  }
}
```

选用第三方[haul](https://github.com/callstack/haul)打包：

```npm
yarn add umi-plugin-react-native-bundler-haul  --dev
```

**注意：**

```json
{
  "name": "umi-plugin-react-native-bundler-haul",
  "engines": {
    "node": ">=10.x"
  },
  "peerDependencies": {
    "react": "^16.8.3",
    "react-native": ">=0.59.0 <1.0.x"
  }
}
```

## 使用

### 开发

修改`package.json`文件，使用`umi-rn`取代`react-native`：

```diff
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
-   "start": "react-native start",
+   "start": "umi-rn dev",
  },
}
```

执行`yarn start`之后，再使用 `yarn android` 或者 `yarn ios`。

### 构建离线包（offline bundle）

```shell
umi-rn build --platform <ios|android>
```
