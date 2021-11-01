# SywElectronTitlebar

- Angular CLI v12.2.0
- Electron v13.1.7

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
       minWidth: 1200,
       minHeight: 600,
   });
   ```

   - 若设置最小宽高，则 非最大化 时，在未有窗口前置状态情况下，将默认使用此宽高作为最小化时的宽高。
   - 若未设置，则默认最小宽高为 `W:1120, H:630`

2. 在 `module` 文件中引入

   ```js
   import { SywElectronTitlebarModule } from 'syw-electron-titlebar';
   
   @NgModule({
     imports: [
       SywElectronTitlebarModule
     ]
   })
   ```

3. 在`HTML`文件中使用

   ```html
   <!-- 类似组件使用方式 -->
   <sywElectronTitlebar></sywElectronTitlebar>
   ```

## Custom Titlebar Content

`sywElectronTitlebar`可自定义除**操作区域**外的内容，默认为空白。

例如：

```html
<sywElectronTitlebar>
    <div style="width: 100%; height: auto; display: flex; justify-content: center; align-items: center;">
        <span>这是自定义的内容</span>
    </div>
</sywElectronTitlebar>
```

注意：由于右侧**操作区域**占据一部分位置的原因，所以自定义的内容在定位上则会**偏左**，可以通过设置`margin-left`来纠正偏移。

##  Style Operation 

`sywElectronTitlebar` 未设任何可操作属性以控制样式或布局，除操作区域外，均由使用者自行定义，例如操作`titlebar`内部样式，可在`css`文件中使用样式穿透：

```
# HTML
<sywElectronTitlebar class="syw-electron-titlebar"></sywElectronTitlebar>

# 改变titlebar背景色
::ng-deep .syw-electron-titlebar {
    .sywElectronTitlebarContainer {
        background-color: #fff !important;
    }
}
```

- class 名称获取：从控制台中即可看到。
- 样式设置失败：可考虑增加样式权重，以覆盖`titlebar`本身样式。

