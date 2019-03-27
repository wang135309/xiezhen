<template>
  <div>
    <div class="known">
      系统维护中...
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import { Toast, MessageBox } from "mint-ui"

export default {}
</script>

<style scoped>
.link-area {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 0.3rem;
}

.link-area > a {
  color: #fe3959;
}

.link-area > span {
  color: #999999;
}

.known {
  width: 100%;
  height: 13rem;
  text-align: center;
  line-height: 6rem;
  color: red;
  font-size: 0.4rem;
}

.chahao {
  width: 20px;
  height: 20px;
  float: right;
  background: url("../../assets/chahao.png") no-repeat;
  background-size: contain;
}

.mint-cell > .ball:before {
  content: "";
  width: 10px;
  height: 10px;
  display: block;
  z-index: 1;
  position: absolute;
  border-radius: 50%;
  top: 5px;
  left: 0;
  background: #ff4d55;
}

.mint-navbar .mint-tab-item {
  color: #333;
}

.mint-navbar .mint-tab-item.is-selected {
  border: 0;
  color: #fe3959;
}

.mint-tab-item {
  position: relative;
}

.is-selected::after {
  margin-bottom: -3px;
  font-size: 15px;
  background-color: #fe3959;
  position: absolute;
  right: 0;
  top: 0.9rem;
  left: 26%;
  height: 2px;
  content: "";
  width: 50%;
}

.code {
  display: inline-block;
  padding: 0.15rem 0.2rem;
  background: #cecdce;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  height: 0.55rem;
  line-height: 0.25rem;
  opacity: 1;
}

.red {
  background: #3d71ff;
}

.center {
  text-align: center;
  color: #999;
  font-size: 0.3rem;
  margin-top: 0.5rem;
}
</style>
