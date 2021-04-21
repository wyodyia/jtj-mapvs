<template>
  <bm-overlay
    ref="carNo"
    pane="labelPane"
    class="popover"
    :class="statusPopver"
    @draw="draw">
    <div style="font-size:12px; color:#fff; position: relative">
      <!-- Body -->
      <div class="body">
        <div>{{ data.truckPlate }}</div>
      </div>
      <div style="position: absolute;left: 36px; top: 15px"><i class="el-icon-caret-bottom" /></div>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  name: 'PopcardCarNo', // 用来接受传入的值，用来定制样式
  components: {
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    active: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: () => ({ lng: 116.404, lat: 39.915 })
    }
  },
  data() {
    return {
    };
  },
  computed: {
    statusPopver() {
      if (this.data.status === '2') {
        return 'runPopver'
      } else if (this.data.status === '0') {
        return 'outlinePopver'
      } else {
        return 'parkPopver'
      }
    }
  },
  watch: {
    position: {
      handler() {
        this.$refs.carNo.reload()
      },
      deep: true
    }
  },
  created:function() {
    const self = this;
    self.init();
  },
  mounted() {
    this.$refs.carNo.$el.parentNode.style.zIndex = 99999
  },
  methods: {
    mapPixel(map, p) {
      return map.pointToOverlayPixel(new BMap.Point(p.lng, p.lat))
    },
    draw({ el, BMap, map }) {
      /* 偏移量*/
      const offset = -43;
      /* 顶部工具栏高度*/
      const toolbar = 60;
      /* 图标是否在视野内*/
      // const inMap = map.getBounds().containsPoint(new BMap.Point(this.position.lng, this.position.lat));
      map.getBounds().containsPoint(this.position)
      const pixel = this.mapPixel(map, this.position)
      /* 坐标点*/
      const px = pixel.x + offset;
      const py = pixel.y + offset - 5;
      /* 获取地图东北与西南角*/
      const NorthEast = this.mapPixel(map, map.getBounds().getNorthEast());
      const SouthWest = this.mapPixel(map, map.getBounds().getSouthWest());

      let ex = null;
      let ey = null;
      let xMax = null;
      let xMin = null;
      let yMax = null;
      let yMin = null;



      /* 关于y方向东北与西南像素大小判断*/
      if(NorthEast.y < SouthWest.y) {
        yMax = SouthWest.y;
        yMin = NorthEast.y + toolbar;
        /* 赋值判断*/
        if((py > yMax) || (py === yMax) || (yMax - this.$refs.carNo.$el.offsetHeight < py && py < yMax)) {
          ey = yMax - this.$refs.carNo.$el.offsetHeight
        }else if(py < yMin) {
          ey = yMin
        }else{
          ey = py
        }
      }else{
        yMax = NorthEast.y;
        yMin = SouthWest.y;
        ey = py
      }

      /* 关于x方向东北与西南像素大小判断*/
      if(NorthEast.x > SouthWest.x) {
        xMax = NorthEast.x;
        xMin = SouthWest.x;
        /* 赋值判断*/
        if((px > xMax) || (px === xMax) || (xMax - this.$refs.carNo.$el.offsetWidth < px && px < xMax)) {
          ex = xMax - this.$refs.carNo.$el.offsetWidth
        }else if(px < xMin) {
          ex = xMin
        }else{
          ex = px
        }
      }else{
        xMax = SouthWest.x;
        xMin = NorthEast.x;
        /* 赋值判断*/
        if(px > xMax) {
          ex = px
        }else {
          ex = xMax
        }
        if(NorthEast.y < SouthWest.y) {
          /* 此时在海中 回归图标*/
          ey = py
        }
      }

      /* 弹框位置*/
      el.style.left = ex + 'px';
      el.style.top = ey + 'px';
    },
    init() {
      // const self = this;
    }
  }
};
</script>
<style>
  .popover {
    width: 80px;
    padding: 0px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    position: absolute;
    box-shadow: 1px 1px 3px rgba(0,0,0, 0.3);
  }
  .runPopver{
    background: rgba(19, 184, 51, 1);

  }
  .outlinePopver{
    background: rgb(224, 165, 36);

  }
  .parkPopver{
    background: rgba(213, 57, 44, 1);
  }

  .body {
    line-height: 20px;
    font-size: 12px;
    text-align: center;
  }
  .body   div{
    text-shadow: 1px 1px 2px rgba(0,0,0, 0.3);
  }
</style>
