<template>
    <div style="width: 100%; height: 100%" id="demo1">
      <baidu-map
              style="width: 100%; height: 100vh"
              :map-click="false"
              :center="center"
              :zoom="zoom"
              :min-zoom="zoom_min"
              :scroll-wheel-zoom="true"
              :max-zoom="zoom_max"
              @zoomend="zoomEnd"
              @ready="mapReady">
          <pop-card-carno
                  v-if="dialog_IsShow_Carno"
                  :position="{lng: positionCarno.lng, lat: positionCarno.lat}"
                  :data="dialogInfoCarno"
                  @mouseover.native="active = true"
                  @mouseleave.native="active = false"
          />
      </baidu-map>
    </div>
</template>

<script>
import PopCardCarno from './textCarno';
import data from './data'


  export default {
    name: 'ScatterMap',
      components: {
          PopCardCarno
      },
    data() {
      return {
        markers: data,
        // 默认中心
        // center: '北京',
        center: { lng: 116.404, lat: 39.915 },
        // 默认级别
        zoom: 5,
        // 最小级别
        zoom_min: 5,
        // 最大级别
        zoom_max: 18,
        mapvLayer: null,
        dialog_IsShow_Carno: false,
          positionCarno: {
              lng: 0,
              lat: 0
          },
          dialogInfoCarno: {},
      };
    },

    created() {},
    destroyed() {
      this.MAP = null
      this.mapvLayer = null
    },
    methods: {
      initMakers() {
        const mapvs = require('jtj-mapvs');
        this.points = this.markers;
        const that = this; // 改变this 指向
        const data = [];

        // 构造数据
        this.markers.forEach((item, index) => {
          data.push({
            geometry: {
              type: 'Point',
              coordinates: [item.longitude, item.latitude]
            },
            icon: item.icon,
            deg: parseInt(item.direction) || 0,
            order: index, // 脚标
            data: item // 数据
          });
        })
        const dataSet = new mapvs.DataSet(data);

        var options = {
          iconOptions: {
            url: './car1.jpg',
            width: 80,
            height: 80,
            offset: {
              x: 0,
              y: 0
            }
          },
          minSize: 15, // 聚合点最小半径
          maxSize: 31, // 聚合点最大半径
          globalAlpha: 1, // 透明度
          clusterRadius: 150, // 聚合像素半径
          maxClusterZoom: 14, // 最大聚合的级别
          maxZoom: 18, // 最大显示级别
          minPoints: 5, // 最少聚合点数，点数多于此值才会被聚合
          extent: 400, // 聚合的细腻程度，越高聚合后点越密集
          label: { // 聚合文本样式
            show: true, // 是否显示
            fillStyle: 'white',
            // shadowColor: 'yellow',
            font: '20px Arial'
            // lineHeight: '200%'
            // shadowBlur: 10,
          },
          methods: {
            click: (item, e) => {
              const name = e.domEvent.target.nodeName
              if (item && item.children.length > 0 && name === 'CANVAS') {
                that.changeMapScatter(item)
              }
            },
            mousemove: function(item, e) { // 鼠标移动事件，对应鼠标经过的元素对象值
              if (item) {
                  document.getElementById('demo1').querySelectorAll('canvas')[0].style.cursor = 'pointer'
              } else {
                  document.getElementById('demo1').querySelectorAll('canvas')[0].style.cursor = ''
              }
                const name = e.domEvent.target.nodeName
                if (item && item.children.length === 0 && name === 'CANVAS') {
                    // 更换窗口位置
                    that.positionCarno.lat = item.data.latitude;
                    that.positionCarno.lng = item.data.longitude;
                    that.dialogInfoCarno = item.data
                    // 显示窗口加载
                    that.dialog_IsShow_Carno = true;
                } else {
                    that.dialog_IsShow_Carno = false;
                }
            }
          },
          width: 20, // 规定图像的宽度
          height: 20, // 规定图像的高度
          size: 10, // 添加点击事件时候可以用来设置点击范围
          sx: 0, // 开始剪切的 x 坐标位置
          sy: 0, // 开始剪切的 y 坐标位置
          // swidth: 20, // 被剪切图像的宽度
          // sheight: 20, // 被剪切图像的高度
          updateImmediate: true,
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

        if (this.mapvLayer) {
          this.mapvLayer.hide()
          // this.mapvLayerText.hide()
        }
        this.mapvLayer = new mapvs.baiduMapLayer(that.MAP, dataSet, options); // eslint-disable-line
      },
      // 地图API
      // 地图初始化
      mapInit() {
        // 清空地图点信息
        this.MAP.clearOverlays();
        setTimeout(_ => this.initMakers(), 300)
      },
      // 地图初始化
      mapReady({
                 BMap,
                 map
               }) {
        window.BMap = BMap;
        this.MAP = map;
        this.points = this.markers;
        if (this.points && this.points.length > 0) {
          // 清空地图点
          this.mapInit();
        }
      },
      // 获取地图级别
      zoomEnd(e) {
        // alert(e.target.getZoom())
      },
      // 放大
      zoomAdd() {
        this.zoom = this.zoom + 1;
      },
      // 缩小
      zoomMinus() {
        this.zoom = this.zoom - 1;
      },
      changeMapScatter(item) {
        this.zoom = this.MAP.getZoom() + 1;}
    }
  };
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
