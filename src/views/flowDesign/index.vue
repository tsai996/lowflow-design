<script setup lang="ts" name="flowDesign">
import NodeTree from './nodes/index.vue'
import NodePenal from './penal/index.vue'
import {FlowNode} from './nodes/Node/index'
import useNode from './hooks/useNode'
import {computed, onMounted, onUnmounted, provide, reactive, ref} from "vue";
import {Plus, Minus} from "@element-plus/icons-vue";
import {getList} from "~/api/modules/user";

const nodePenalRef = ref<InstanceType<typeof NodePenal>>()
const nodeTreeObj = reactive<FlowNode>({
  id: 'root',
  pid: null,
  type: 'start',
  name: '发起人',
  child: {
    id: 'end',
    pid: 'root',
    type: 'end',
    name: '结束',
    child: null
  }
})
const zoom = ref(100)
const getScale = computed(() => zoom.value / 100)
const openPenal = (node: FlowNode) => {
  nodePenalRef.value?.open(node)
}
const {addNode, delNode} = useNode(nodeTreeObj)
provide('nodeHooks', {
  readOnly: false,
  addNode,
  delNode,
  openPenal
})
const handleZoom = (e: WheelEvent) => {
  if (e.shiftKey) {
    if (e.deltaY > 0) {
      if (zoom.value > 50) {
        zoom.value -= 10
      }
    } else {
      if (zoom.value < 170) {
        zoom.value += 10
      }
    }
  }
}
const convert = () => {
  const process = {
    id: 'dawdawdw',
    name: '测试流程',
    process: nodeTreeObj
  }
}
// 按住shift键滚动鼠标滚轮，可以放大/缩小
window.addEventListener('wheel', handleZoom)
// 离开页面时，销毁事件监听
onUnmounted(() => {
  window.removeEventListener('wheel', handleZoom)
})
</script>

<template>
  <div class="designer-container">
    <!--放大/缩小-->
    <div class="zoom">
      <el-button :icon="Plus" @click="zoom += 10" :disabled="zoom >= 170" circle></el-button>
      <span>{{ zoom }}%</span>
      <el-button :icon="Minus" @click="zoom -= 10" circle :disabled="zoom <= 50"></el-button>
    </div>
    <!--流程树-->
    <div class="node-container">
      <NodeTree :node="nodeTreeObj"/>
    </div>
    <!--属性面板-->
    <NodePenal ref="nodePenalRef"/>
  </div>

</template>

<style scoped lang="scss">
.designer-container {
  background-color: var(--el-bg-color);
  position: relative;
  display: flex;
  flex-direction: row;
  min-height: 100%;
  min-width: 100%;
  // overflow: scroll;

  .zoom {
    position: fixed;
    z-index: 999;
    top: 40px;
    right: 30px;

    span {
      margin: 0 10px;
    }
  }

  .node-container {
    margin: 0 auto;
    transform: scale(v-bind(getScale));
    transform-origin: 50% 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
