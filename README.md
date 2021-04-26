> baidu mapv

## Install

```sh
cnpm install
```


## Use

```javascript
const mapvs = require('jtj-mapvs');
```
介绍
---

本mapv 实现了：
1，mapv聚合 可以，有聚合点图标，图标转向，
2，实现了 聚合图标的展示


option 新加了 3个参数  {clusterIcons: [], clusterIconsSize: [], iconDegComputed: true }
1,clusterIcons 为集合的图片
2,clusterIconsSize 为聚合图片的大小
3, iconDegComputed 是否开启图标转向 true|false
 
其他 option 配置参数参考 https://github.com/huiyan-fe/mapv/blob/master/src/map/baidu-map/Layer.md


var options = {
    draw: 'cluster',
    clusterIcons: [
          './cluster1.png',
          './cluster2.png',
          './cluster3.png',
          './cluster4.png'
    ],
    clusterIconsSize: [40, 60, 80, 90],
    iconDegComputed: true
}



