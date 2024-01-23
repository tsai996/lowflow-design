<script setup lang="ts" name="flowDesign">
import NodeTree from './nodes/index.vue'
import NodePenal from './penal/index.vue'
import {FlowNode} from './nodes/Node/index'
import useNode from './hooks/useNode'
import {computed, onUnmounted, provide, ref} from "vue";
import {Plus, Minus, Download, Sunny, Moon, TopRight, TopLeft} from "@element-plus/icons-vue";
import {useVModels} from "@vueuse/core";
import {Field} from "~/components/Render/interface";
import {downloadXml} from "~/api/modules/model";
import {useRefHistory} from '@vueuse/core'
import {cloneDeep} from "lodash-es";

export interface FlowDesignProps {
  process: FlowNode,
  fields: Field[]
}

const $props = defineProps<FlowDesignProps>()
const $emits = defineEmits(['update:process', 'update:fields'])
const {fields} = useVModels($props, $emits)
const process = ref<FlowNode>($props.process)
const { undo, redo, canUndo, canRedo} = useRefHistory(process,
    {deep: true, clone: cloneDeep }
)
const nodePenalRef = ref<InstanceType<typeof NodePenal>>()
const zoom = ref(100)
const getScale = computed(() => zoom.value / 100)
const isDark = ref<boolean>(false)
const handleToggleDark = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
const openPenal = (node: FlowNode) => {
  nodePenalRef.value?.open(node)
}
const {addNode, delNode, validateNodes, addNodeRef} = useNode(process, fields)
provide('nodeHooks', {
  readOnly: false,
  fields: fields,
  addNode,
  delNode,
  addNodeRef,
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
const validate = () => {
  validateNodes()
}
const converterBpmn = () => {
  const processModel = {
    code: 'test',
    name: '测试',
    icon: {
      name: 'el:HomeFilled',
      color: '#409EFF',
    },
    process: process.value,
    form: {
      fields: fields.value
    },
    version: 1,
    sort: 0,
    groupId: '',
    remark: '',
  }
  downloadXml(processModel)
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
    <div class="dark">
      <el-switch
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
          @change="handleToggleDark"
          v-model="isDark"/>
    </div>
    <!--放大/缩小-->
    <div class="zoom">
      <el-button :icon="Plus" @click="zoom += 10" :disabled="zoom >= 170" circle></el-button>
      <span>{{ zoom }}%</span>
      <el-button :icon="Minus" @click="zoom -= 10" circle :disabled="zoom <= 50"></el-button>
      <el-button @click="undo()" :disabled="!canUndo" :icon="TopLeft">撤销</el-button>
      <el-button @click="redo()" :disabled="!canRedo" :icon="TopRight">重做</el-button>
      <el-button @click="validate">校验</el-button>
      <el-button @click="converterBpmn" type="primary" :icon="Download">转bpmn</el-button>
    </div>
    <!--流程树-->
    <div class="node-container">
      <NodeTree :node="process"/>
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
    top: 20px;
    right: 20px;

    span {
      margin: 0 10px;
    }
  }

  .dark {
    position: fixed;
    z-index: 999;
    top: 10px;
    left: 20px;
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
