# @bfehub/gtex

提取/复制 Git 暂存状态的文件。

> 我有一个很大的静态文件的项目，发版时我不得不一个个的上传，所以我制作了这个包用于提取修改的文件。

## 用法

执行命令

```sh
npx @bfehub/gtex
```

文件状态

```sh
A  .gitignore
A  LICENSE
AM README.md
A  bin/cli.js
A  index.js
A  package-lock.json
AM package.json
```

复制输出

```sh
gtex file | .gtex/package.json
gtex file | .gtex/package-lock.json
gtex file | .gtex/index.js
gtex file | .gtex/bin/cli.js
gtex file | .gtex/README.md
gtex file | .gtex/LICENSE
gtex file | .gtex/.gitignore
```

## 配置

配置示例 `gtex --dest=".dist" --filter="*.js"`

| 配置项   | 默认值  | 示例值             | 说明                                                                   |
| -------- | ------- | ------------------ | ---------------------------------------------------------------------- |
| `dest`   | `.gtex` | `--dest=".dist"`   | 输出目录，添加到 `.gitignore` 配置中。                                 |
| `filter` | `*`     | `--filter="*.js"`  | 文件过滤，使用 [minimatch](https://github.com/isaacs/minimatch) 匹配。 |
| `zip`    | -       | `--zip="dist.zip"` | 压缩文件，配置压缩名称后会生成压缩包。                                 |
