# SywElectronTitlebar

- Angular-CLI v12.2.0
- Electron v16.2.2

## Release Notes

由于`Electron`中`remote`模块存在许多问题且`remote`模块在`Electron14`之后已经废弃，所以`syw-electron-titlebar v3.0.0`版本选择放弃使用`@electron/remote`模块，改为使用传统的`Electron`通信方式，以取得最大的兼容性和最优的性能。

- `v3.0.0`版本做出的改变可将最大程序的操作权限交给使用者。

- `v3.0.0`版本的更新不兼容`v2.0.0`版本，升级时请注意。
- `v3.0.0`使用改变，详见文档 **Usage** 一节。

推荐使用`syw-electron-titlebar v3.0.0` 版本。

## Installation

```bash
npm i syw-electron-titlebar
```

## Usage

由于顶部操作栏位置的特殊性，建议放在 `app.componet` 组件下，以保证`titlebar`位于页面顶部，如有特殊要求，亦可自由改动位置，使用方式不变。

使用方式如下：

1. 在`electron`入口文件中，取消默认`titlebar`显示

   ```js
   new BrowserWindow({
       frame: false,// 不使用默认边框
   });
   ```
   
2. 在`electron`入口文件中与渲染进行进行通信，并做出对应操作。

   <font color="red">以下主进程监听内容，可直接复制粘贴使用。</font>

   ```js
   // 引入 ipcMain 和 screen
   import { ipcMain, screen } from 'electron';
   
   // 窗口配置
   win = new BrowserWindow({...});
                            
   // 初始化syw-electron-titlebar
   win.on('ready-to-show', () => {
   	win.webContents.send('initTitlebar', win.getSize());
   });
   
   // 监听窗口关闭事件
   ipcMain.on('windowClose', () => {
       if (win) {
         win.destroy();
       }
   });
   
   // 监听窗口向上还原事件
   ipcMain.on('windowMaximize', () => {
       win.maximize();
       win.webContents.send('isShowMaximizeBtn', true);
   });
   
   // 监听窗口向下还原事件
   ipcMain.on('windowUnmaximize', () => {
       const winSize = win.getSize();
       win.unmaximize();
       const newWinSize = win.getSize();
       // 前后两次进行对比，判断非最大化是否未动
       if (winSize[0] === newWinSize[0] && winSize[1] === newWinSize[1]) {
         // 拿到设置最小值，并设置
         let miniSize = win.getMinimumSize();
         if (miniSize[0] !== 0 || miniSize[1] !== 0) {
           win.setSize(miniSize[0], miniSize[1]);
         } else {
           win.setSize(1200, 600);
         }
         win.center();
       }
       win.webContents.send('isShowMaximizeBtn', false);
   });
   
   // 监听窗口最小化事件
   ipcMain.on('windowMinimize', () => {
       win.minimize();
   });            
   ```

   - 若在`BrowserWindow`配置中设置最小宽高，则 向下还原 时，在未有窗口前置状态情况下，将默认使用此宽高作为最小化时的宽高。

   **注： 除监听事件源及必要的窗口操作外，其他部分逻辑将完全交予使用者，可按自己所愿更改，这里提供示例操作。**

3. 在 `module` 文件中引入

   ```js
   import { SywElectronTitlebarModule } from 'syw-electron-titlebar';
   
   @NgModule({
     imports: [
       SywElectronTitlebarModule
     ]
   })
   ```

4. 在`HTML`文件中使用

   ```html
   <!-- 类似组件使用方式 -->
   <sywElectronTitlebar></sywElectronTitlebar>
   ```

## Custom Titlebar Content

`sywElectronTitlebar`可自定义除**操作区域**外的内容，默认为空白。

例如：

```html
<sywElectronTitlebar>
    <div style="width: 100%; text-align: center;">
        <span>这是自定义的内容</span>
    </div>
</sywElectronTitlebar>
```

注意：由于右侧**操作区域**占据一部分位置的原因，所以自定义的内容在定位上则会**偏左**，可以通过设置`padding-left`来纠正偏移，偏移量为`120px`。

##  Style Operation 

`sywElectronTitlebar` 未设任何可操作属性以控制样式或布局，除操作区域外，均由使用者自行定义，例如操作`titlebar`内部样式，可在`css`文件中使用样式穿透：

```html
<!-- HTML -->
<sywElectronTitlebar class="syw-electron-titlebar"></sywElectronTitlebar>

```
```scss
// 改变titlebar背景色
::ng-deep .syw-electron-titlebar {
    .sywElectronTitlebarContainer {
        background-color: #fff;
    }
}
```

- class 名称获取：从控制台中即可看到。
- 样式设置失败：可考虑增加样式权重` !important`，以强制覆盖`titlebar`本身样式。

