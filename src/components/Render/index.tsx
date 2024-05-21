import { cloneDeep } from 'lodash-es'
import type { Field } from './type'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, Object] as PropType<any>,
      default: undefined,
      required: false
    },
    field: {
      type: Object as PropType<Field>,
      required: true
    }
  },
  emits: ['update:modelValue'],
  components: {
    ElInput: defineAsyncComponent(() => import('element-plus/es').then(({ ElInput }) => ElInput)),
    ElInputNumber: defineAsyncComponent(() =>
      import('element-plus/es').then(({ ElInputNumber }) => ElInputNumber)
    ),
    ElSelect: defineAsyncComponent(() =>
      import('element-plus/es').then(({ ElSelect }) => ElSelect)
    ),
    ElRadio: defineAsyncComponent(() => import('element-plus/es').then(({ ElRadio }) => ElRadio)),
    ElCheckbox: defineAsyncComponent(() =>
      import('element-plus/es').then(({ ElCheckbox }) => ElCheckbox)
    ),
    UserSelector: defineAsyncComponent(() => import('@/components/UserSelector/index.vue')),
    RoleSelector: defineAsyncComponent(() => import('@/components/RoleSelector/index.vue'))
  },
  setup(props, { emit }) {
    /**
     * 构建属性参数
     * @param fieldClone
     */
    const buildProps = (fieldClone: Field) => {
      const dataObject: Record<string, any> = {}
      const _props = fieldClone.props || {}
      Object.keys(_props).forEach((key) => {
        dataObject[key] = _props[key]
      })
      if (props.modelValue !== undefined) {
        dataObject.modelValue = props.modelValue
      } else {
        dataObject.modelValue = fieldClone.value
      }
      dataObject['onUpdate:modelValue'] = (value: any) => {
        emit('update:modelValue', value)
      }
      delete dataObject.options
      return dataObject
    }
    /**
     * 构建插槽
     * @param fieldClone
     */
    const buildSlots = (fieldClone: Field) => {
      const children: Record<string, any> = {}
      const slotFunctions: Record<string, any> = {
        ElSelect: (conf: Field) => {
          return conf.props.options.map((item: any) => {
            return <el-option label={item.label} value={item.value}></el-option>
          })
        },
        ElRadio: (conf: Field) => {
          return conf.props.options.map((item: any) => {
            return <el-radio label={item.value}>{item.label}</el-radio>
          })
        },
        ElCheckbox: (conf: Field) => {
          return conf.props.options.map((item: any) => {
            return <el-checkbox label={item.value}>{item.label}</el-checkbox>
          })
        }
      }
      const slotFunction = slotFunctions[fieldClone.name]
      if (slotFunction) {
        children.default = () => {
          return slotFunction(fieldClone)
        }
      }
      return children
    }
    return {
      buildProps,
      buildSlots
    }
  },
  render() {
    const fieldClone: Field = cloneDeep(this.field)
    const slots = this.buildSlots(fieldClone)
    const props = this.buildProps(fieldClone)
    const eleComponent = resolveComponent(fieldClone.name)
    if (typeof eleComponent === 'string') {
      return h(eleComponent, props, slots)
    }
    return h(eleComponent, props, slots)
  }
})
