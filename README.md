# tinyapp-enhance
> 支付宝小程序 


## 列表
- [x] 组件监听当前页面的`onPageScroll`,`onShow`,`onResize`,`onHide`

## 使用方法

```diff
// App.js
import { enhanceApp } from 'tinyapp-enhance'

const options = {
  // App的一些配置
}
- App(options)
+ App(enhanceApp(options));

// 页面
// Pages/page1/xxx.js
import { enhancePage } from "tinyapp-enhance";

const options = {
  // Page的一些配置
}

- Page(options);
+ Page(enhancePage(options));

// 组件
// Components/xxx-component/xxx.js
import { enhanceComponent } from "tinyapp-enhance";

const options = {
+ pageLifetimes: {
+   onPageScroll({ scrollTop }) {
+    // 这里可以访问到使用该组件页面的滚动
+   },
+   onResize(){},
+   onShow(){},
+   onHide(){},
+ }
  // Component 其他配置
}

- Component(options);
+ Component(enhanceComponent(options));

```

## 说明


