[yarn]
[[install]](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
npm install --global yarn@1
建议通过npm 包管理器安装 Yarn，该包管理器在您将Node.js安装到系统时已捆绑在npm 包管理器中。
安装好 npm 后，您可以运行以下命令来安装和升级Yarn：

npm install --global yarn@1

[[check]]
yarn --version

[[Usage]](https://classic.yarnpkg.com/en/docs/usage)

现在你已经安装了Yarn ，可以开始使用它了。以下是一些你最常用的命令。

[启动一个新项目]

yarn init

[添加依赖项]

yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

[向不同类别的依赖项添加依赖项]
[[分别添加到devDependencies、peerDependencies和：optionalDependencies]]

yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional

[升级依赖项]

yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]

[移除依赖项]

yarn remove [package]


[正在安装项目的所有依赖项]

yarn
或者
yarn install
