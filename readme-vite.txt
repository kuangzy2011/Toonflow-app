[vite]
en - (https://vite.dev/guide/)
cn - (https://cn.vite.dev/guide/)

Vite是一种新型前端构建工具，主要由两部分组成：
#1. 一个开发服务器，它基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热替换（HMR）。
#2. 一套构建指令，它使用 Rolldown(https://rolldown.rs/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

##Rolldown: 速度极快的基于 Rust 的 JavaScript 打包工具.

=================================================================================
=================================================================================
=================================================================================
>>Web
[搭建第一个 Vite 项目]
[问答模式]
yarn create vite
yarn create vue@latest

[静默模式]
yarn create vite my-vue-app --template vue

======================================================================

##也直接创建一个目录，进入目录后安装vite,完成下述步骤，可以启动web服务。
[install]
yarn add -D vite

[create index.html]
<p>Hello Vite!</p>

[run]
yarn vite

之后就可以在 http://localhost:5173 上访问 index.html。

=======================================================================
>>App
要使用 Yarn 从头开始​​创建一个空白的 TypeScript 项目，您可以通过运行几个简单的终端命令来初始化 Node.js 仓库并配置 TypeScript 编译器。。

初始化 Yarn4 + TypeScript + nodemon + tsx Node 项目
mkdir app
cd app
yarn init -y

cat > .yarnrc.yml <<EOF
nodeLinker: node-modules
EOF

>>Update package.json to devDependencies
  "devDependencies": {
    "typescript": "^5.9.2"
  }

yarn install
yarn add -D ts-node @types/node nodemon tsc tsx
yarn tsc --init

cat > tsconfig.json <<EOF
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
EOF

mkdir src
echo "console.log('Hello from TypeScript and Yarn');" > src/index.ts

>>>Add following command to scripts in package.json
    "dev": "nodemon --inspect --exec tsx src/index.ts",
    "start": "cross-env NODE_ENV=prod node dist/index.js",
    "build": "cross-env NODE_ENV=prod tsx scripts/build.ts"

>>Run app
yarn dev

=======================================================================
合并app和web




=======================================================================
=======================================================================
=======================================================================

kuangzy@lite:$ ./node_modules/.bin/vite  --help
或者
kuangzy@lite:$ yarn vite --help
vite/8.2.1

Usage:
  $ vite [root]

Commands:
  [root]           start dev server
  build [root]     build for production
  optimize [root]  pre-bundle dependencies (deprecated, the pre-bundle process runs automatically and does not need to be called)
  preview [root]   locally preview production build: 此命令在构建目录（默认为 dist）中启动服务器。请提前运行 vite build 以确保构建目录是最新的。
                                                     vite preview --outDir ./data/web --port 8989 --host 0.0.0.0

For more info, run any command with the `--help` flag:
  $ vite --help
  $ vite build --help
  $ vite optimize --help
  $ vite preview --help

Options:
  --host [host]            [string] specify hostname 
  --port <port>            [number] specify port 
  --open [path]            [boolean | string] open browser on startup 
  --cors                   [boolean] enable CORS 
  --strictPort             [boolean] exit if specified port is already in use 
  --force                  [boolean] force the optimizer to ignore the cache and re-bundle 
  --experimentalBundle     [boolean] use experimental full bundle mode (this is highly experimental) 
  -c, --config <file>      [string] use specified config file 
  --base <path>            [string] public base path (default: /) 
  -l, --logLevel <level>   [string] info | warn | error | silent 
  --clearScreen            [boolean] allow/disable clear screen when logging 
  --configLoader <loader>  [string] use 'bundle' to bundle the config with Rolldown, or 'runner' (experimental) to process it on the fly, or 'native' (experimental) to load using the native runtime (default: bundle) 
  -d, --debug [feat]       [string | boolean] show debug logs 
  -f, --filter <filter>    [string] filter debug logs 
  -m, --mode <mode>        [string] set env mode 
  -h, --help               Display this message 
  -v, --version            Display version number 


------
选项	
--host [host]	指定主机名称 (string)
--port <port>	指定端口 (number)
--open [path]	启动时打开浏览器 (boolean | string)
--cors	启用 CORS (boolean)
--strictPort	如果指定的端口已在使用中，则退出 (boolean)
--force	强制优化器忽略缓存并重新构建 (boolean)
-c, --config <file>	使用指定的配置文件 (string)
--base <path>	公共基础路径（默认为：/）(string)
-l, --logLevel <level>	info | warn | error | silent (string)
--clearScreen	允许或禁用打印日志时清除屏幕 (boolean)
--configLoader <loader>	使用 bundle 来采用 Rolldown 打包配置，或是 runner（实验性）来在运行时处理，或是 native（实验性）来使用原生运行时加载，默认是 bundle
--profile	启动内置的 Node.js 调试器（查看 性能瓶颈）
-d, --debug [feat]	显示调试日志 (string | boolean)
-f, --filter <filter>	过滤调试日志 (string)
-m, --mode <mode>	设置环境模式 (string)
-h, --help	显示可用的 CLI 选项
-v, --version	显示版本号


------------------------

kuangzy@lite:$ ls
index.html1  model1  model2  node_modules  package.json  yarn.lock
kuangzy@lite:$ tree -I node_modules
.
├── index.html1
├── model1
│   └── index.html
├── model2
│   └── index.html
├── package.json
└── yarn.lock

2 directories, 5 files

可以指定root目录启动服务

./node_modules/.bin/vite ./model1

./node_modules/.bin/vite ./model2

-------------------------
默认规则：Vite 浏览器项目（SPA）确实以 index.html 作为项目入口。
1、为什么 index.html 是入口
Vite 的开发服务器会解析 index.html，找里面的html

<script type="module" src="/src/main.ts"></script>

从这个 script module 开始递归加载你的前端代码。
#1. src/main.ts 是JS 模块入口；
#2. index.html 是 Vite 构建系统的项目入口文件。二者不要混淆。

2、能不能不用 index.html？可以，多页面模式
多页面应用 multi‑page‑app
vite.config.ts 通过 build.rollupOptions.input 指定多个 html 作为入口。

// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        404: resolve(__dirname, 'src/pages/error/404.html'),
      }
    }
  }
})
此时构建产物输出多个 html。

-----------------------------------
[支持外部访问，自定义端口]
./node_modules/.bin/vite --port 8999 --host 0.0.0.0

  ➜  Local:   http://localhost:8999/
  ➜  Network: http://10.70.11.224:8999/   enp0s3
  ➜  Network: http://192.168.56.88:8999/  enp0s8
  ➜  press h + enter to show help



kuangzy@lite:$ cat package.json 
{
  "devDependencies": {
    "vite": "^8.2.1"
  },
  "scripts": {
    "dev": "vite --port 8989 --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview"
  }
}

================================
[内置常量]

import.meta.env.MODE: {string} 应用运行的 模式。

import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。该值由 base 配置项 决定。

import.meta.env.PROD: {boolean} 应用是否运行在生产环境（使用 NODE_ENV='production' 运行开发服务器或构建应用时使用 NODE_ENV='production' ）。

import.meta.env.DEV: {boolean} 应用是否运行在开发环境（永远与 import.meta.env.PROD 相反）。

import.meta.env.SSR: {boolean} 应用是否运行在 server 上。

================================

Vite 自动将环境变量暴露在 import.meta.env 对象下，作为字符串。以 VITE_ 为前缀的变量在 Vite 打包后会暴露在客户端源代码中.

VITE_SOME_KEY=123

import.meta.env.VITE_SOME_KEY


-----------------
.env 文件
Vite 使用 dotenv 从你的 环境目录 中的下列文件加载额外的环境变量：

.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

Vite 总是会加载 .env 和 .env.local 文件

