# 使用 vite + react 构建一个 Tauri 的应用程序

## create-tauri-app

```$ yarn create tarui-app```

**注: 本文中包管理工具默认使用 yarn**

执行指令后将会执行以下几个步骤:

1. 项目名称
   指令创建的文件夹名称以及 `package.json` 文件中的 `name` 字段的值

2. 前端框架选择
   可以从 `react、vue、angular` 等框架中选择. 在本文中选择 `react` 作为前端框架

3. 语言选择
   可以从 typescript 和 javascript 中选择. 推荐使用 `typescript`

## 项目结构

1. package.json
   与普通的前端项目中的 `package.json` 一致

2. src 目录
   存放前端代码的目录, 一个普通的 `react` 项目, 这里不过多介绍.

3. src-tauri 目录
   存在 tauri 应用的核心底层文件, 语言为 `rust`. 其中的文件结构如下:

   * `Cargo.toml`
     `Cargo` 的清单文件, 可以声明应用所依赖的 `rust` 包和应用的元数据等等
   * `tauri.conf.json`
      此文件可让自定义 tauri 应用的各方各面，包括应用名称到允许的 api 列表
   * `src/main.rs`
      `rust`程序的入口, 也是启动 `tauri`的地方. 具体内容由以下两部分组成

      ```rust
      // Prevents additional console window on Windows in release, DO NOT REMOVE!!
      #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
      
      // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
      #[tauri::command]
      fn greet(name: &str) -> String {
          format!("Hello, {}! You've been greeted from Rust!", name)
      }
      /*
       * 程序的入口点，也是运行时调用的第一个函数。
       */
      fn main() {
          tauri::Builder::default()
              .invoke_handler(tauri::generate_handler![greet])
              .run(tauri::generate_context!())
              .expect("error while running tauri application");
      }
      
      ```  

4. vite.config.ts
   创建工具将生成一份默认的 vite.config.ts 来作为 vite 的配置文件, 具体内容如下:

   ```typescript
   import { defineConfig } from 'vite'

   export default defineConfig({
     /*
      *设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息。命令行模式下可以通过 --clearScreen false 设置。
      *这里主要用于防止 vite 掩盖 rust 错误
     */
     clearScreen: false,
     /*
      *由于 tauri 需要一个固定端口，如果该端口不可用则失败
      *所以将设 strictPort 为 true, 若端口已被占用则会直接退出，而不是尝试下一个可用端口。
     */
     server: {
       strictPort: true,
     },
     /*
      * 环境变量配置, 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在客户端源码中.
      * to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
      * `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
      */
     envPrefix: ['VITE_', 'TAURI_'],

     build: {
       // Tauri uses Chromium on Windows and WebKit on macOS and Linux
      /*
       * 配置最终构建的浏览器兼容目标
       * tauri 在 Windows 上使用 Chromium，在 macOS 和 Linux 上使用 WebKit
       */
       target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
       /*
        * 是否压缩构建产物的代码, 默认值为 esbuild
        * 如果是 debug 时, 关闭代码压缩
        */
       minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
       /*
        * 构建后是否生成 source map 文件
        * 如果是 debug 时, 生成 source map
        */
       sourcemap: !!process.env.TAURI_DEBUG,
     },
   })
   ```

## 启用项目

 `$ yarn tauri dev`

## 指令

### 注册指令

  tauri 为前端开发提供了其他系统原生功能. 我们将其称作为 **[指令](https://tauri.app/zh-cn/v1/guides/features/command/)**, 这使得可以从前端调用由 `rust` 编写的函数. 由此, 可以使用高性能的 `rust` 代码处理繁重的任务或系统调用.

  以下是一个简单的示例:

  ```rust
  #[tauri::command]
  fn greet(name: &str) -> String {
     format!("Hello, {}!", name)
  }
  ···
  一个指令等于一个普通的 `rust` 函数, 加上 `#[tauri:command]` 宏来让其能够与 `javascript` 环境交互.

  最后, 需要让 `tauri` 知悉刚刚创建的指令. 需要使用 `.invoke_handler()` 函数以及 `Generate_handle!`[] 宏来注册指令: 

  ```rust
  fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
  }
  ```

### 调用指令

   在前端项目安装 `` @tauri-apps/api包后便可以调用指令了.

   ```typescript
   import { invoke } from '@tauri-apps/api'

   // 调用命令
   // 在应用窗口中右键，打开开发者工具
   // 你会看到控制台上输出了 "Hello, World!"！
   invoke('greet', { name: 'World' })
     // `invoke` 返回的是一个 Promise
     .then((response) => console.log(response))
   ```

更多有关 rust 和 javascript 之前的通信信息: <https://tauri.app/zh-cn/v1/references/architecture/inter-process-communication/>

## 集成到已有项目

1. 安装 tauri cli
  `$ yarn add -D @tauri-apps/cli`

2. 搭建一个使用 tauri 的简单 rust 项目.
   `$ yarn tauri init`

   执行后会询问几个问题
   1. 应用的名称是什么?
      这将会是您打包后和操作系统会调用的应用名称. 此处会默认填充前端项目中 package.json 中的 name 字段值.
   2. 窗口标题是什么?
      这将会是您主窗口的默认标题. 此处会默认填充前端项目中 package.json 中的 name 字段值.
   3. 前端页面资源 (HTML/CSS/JS) 相对于 `/src-tauri/tauri.conf.json` 文件将被创建的位置？
      这是 production 环境时 tauri 加载 web 前端资源的目录.
   4. 开发环境时的加载路径
      可以是一个网络地址也可以是一个文件路径 development.
   5. 使用什么命令来启动前端项目?
      启动前端开发服务器的命令.
   6. 使用什么命令来构建前端页面？
      构建前端文件的命令.
  
  执行完后将生成 src-tauri 目录, 文件结构与初始化生成的结构一致. 最后执行启动项目的命令即可.
