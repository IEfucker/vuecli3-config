# front

## Project setup

```bash
npm install
```

## 调试线上 API

```bash
npm run debug:api
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Run your unit tests

```bash
npm run test:unit
```

## 新版的用户中心对应的目录说明

1. store 功能为了避免与现有的文件冲突，存放在了 src/modules 下
2. views、components 下单独目录存储
3. request 对象和接口地址保持在 api 目录
4. 新增 src/constants 目录存放原有的常量定义
