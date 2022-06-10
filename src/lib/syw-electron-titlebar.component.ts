import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';

interface ICONS {
  minus: string;
  minimize: string;
  maximize: string;
}

@Component({
  selector: 'sywElectronTitlebar',
  templateUrl: './syw-electron-titlebar.component.html',
  styleUrls: ['./syw-electron-titlebar.component.scss']
})
export class SywElectronTitlebarComponent implements OnInit, AfterViewInit {

  // 图标
  public icons: ICONS = {
    // 最小化
    minus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAACCAIAAADTkbvhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6REQ0Q0EzQTUzNzBBMTFFQ0I4MzNDOUM4QzNFRDEyREUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6REQ0Q0EzQTYzNzBBMTFFQ0I4MzNDOUM4QzNFRDEyREUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERDRDQTNBMzM3MEExMUVDQjgzM0M5QzhDM0VEMTJERSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpERDRDQTNBNDM3MEExMUVDQjgzM0M5QzhDM0VEMTJERSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhQhoOwAAAAOSURBVHjaYmAYDAAgwAAAhgABz7v82QAAAABJRU5ErkJggg==',
    // 向下还原
    minimize: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUNCODREN0IzNzBBMTFFQ0I2Qzk5RkJGODRBMEU3NDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUNCODREN0MzNzBBMTFFQ0I2Qzk5RkJGODRBMEU3NDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5Q0I4NEQ3OTM3MEExMUVDQjZDOTlGQkY4NEEwRTc0MyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5Q0I4NEQ3QTM3MEExMUVDQjZDOTlGQkY4NEEwRTc0MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlkUKScAAADaSURBVHja7JfRCsIwDEUbFat7UL/A//8uv0B9cHbg6q2MoUObok3tQwJ32aAkZ6WXZeS9N7EgogPSBlpCM5MneqiDzpQA4IbmEtGlAFyQ1tAOa094/mkXUKNHjS1uj1CbAnBFslhHOV8ddUNjlwwAzQN9puZhF28KUAcALpzP7ZDdNz4H9J4DEPU5ACwH8PC5kM1a1G04AFGfo+5KARRAARSgOoCXgUQaAGqiI5kwAD+UFgBwsc/1wsjGxzMwgv7rECpAVQDFR7IpQPGhdAog+vv9bix/jrsAAwBlgywuYy7oUwAAAABJRU5ErkJggg==',
    // 向上还原
    maximize: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUZGNDY1MjUzNzBCMTFFQzk3MUU5QTEzRTlENEJDRDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUZGNDY1MjYzNzBCMTFFQzk3MUU5QTEzRTlENEJDRDQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxRkY0NjUyMzM3MEIxMUVDOTcxRTlBMTNFOUQ0QkNENCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRkY0NjUyNDM3MEIxMUVDOTcxRTlBMTNFOUQ0QkNENCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnAyBOkAAAAsSURBVHjaYmRgYPjPQAPASA+DGalk5v9Rg0cNHjV41OBRg0eYwUOjzgMIMADCBSgBncoePwAAAABJRU5ErkJggg=='
  };

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // 初始化titlebar
    ipcRenderer.on('initTitlebar', (event, args) => {
      this.delectWindowResized(args);
    });

    // 监听窗口大小改变
    ipcRenderer.on('windowResized', (event, args) => {
      this.delectWindowResized(args);
    });

    // 是否展示最大化按钮
    ipcRenderer.on('isShowMaximizeBtn', (event, args) => {
      this.isShowMaximizeBtn(args);
    });
  }

  // 关闭窗口
  public windowClose(): void {
    ipcRenderer.send('windowClose');
  }

  // 最大化窗口
  public windowMaximize(): void {
    ipcRenderer.send('windowMaximize');
  }

  // 非最大化窗口
  public windowUnmaximize(): void {
    ipcRenderer.send('windowUnmaximize');
  }

  // 最小化窗口
  public windowMinimize(): void {
    ipcRenderer.send('windowMinimize');
  }

  // 窗口变化检测
  public delectWindowResized(size: number[]) {
    // 判断窗口大小
    // 1. 获取当前electron窗口大小
    let currentWindowSize = size;
    // 与实际屏幕宽高做对比
    if (currentWindowSize[0] >= window.screen.availWidth && currentWindowSize[1] >= window.screen.availHeight) {
      // 最大状态
      this.isShowMaximizeBtn(true);
    } else {
      this.isShowMaximizeBtn(false);
    }
  }

  // 是否展示最大化按钮[若不展示，将展示最小化按钮]
  public isShowMaximizeBtn(isMaximizeStatus: boolean) {
    if (isMaximizeStatus) {
      let maximize = document.getElementById('maximize');
      maximize!.style.display = "none";
      let minimize = document.getElementById('minimize');
      minimize!.style.display = "block";
    } else {
      let maximize = document.getElementById('maximize');
      maximize!.style.display = "block";
      let minimize = document.getElementById('minimize');
      minimize!.style.display = "none";
    }
  }

}
