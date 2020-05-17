# numbers-backend

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## 作成方法

テンプレート作成
```
typeorm init --name numbers-backend --database mysql
```

mysql2 を使う
```shell script
npm install --save mysql2
npm uninstall --save mysql
```

Express インストール
```
npm install --save express body-parser
```

ESLint と Prettier インストール
```shell script
npm install -D eslint prettier eslint-plugin-prettier eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

.eslintrc.json 作成
```shell script
vim .eslintrc.json
```

## https 対応

https://git.coolaj86.com/coolaj86/greenlock-express.js

