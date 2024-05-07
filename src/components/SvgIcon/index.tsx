import './index.scss'
import type { CSSProperties, PropType } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String as PropType<string>,
      required: true
    },
    prefix: {
      type: String as PropType<string>,
      default: 'icon'
    },
    color: {
      type: String as PropType<string>
    },
    size: {
      type: Number as PropType<number>
    },
    className: {
      type: String as PropType<string>
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const svgClass = computed(() => [
      'svg-icon',
      props.name && props.name.replace('el:', ''),
      props.className
    ])
    const fill = computed(() => (props.color ? props.color : 'currentColor'))
    const style = computed<CSSProperties>(() => {
      const { size } = props
      if (!size) return {}
      return {
        fontSize: `${size}px`
      }
    })
    return {
      symbolId,
      svgClass,
      fill,
      style
    }
  },
  render() {
    const { $attrs, symbolId, svgClass, fill } = this
    if (this.name) {
      if (this.name.startsWith('el:')) {
        return (
          <el-icon class={svgClass} color={this.color} size={this.size} {...$attrs}>
            {h(resolveComponent(this.name.slice(3)))}
          </el-icon>
        )
      } else {
        return (
          <svg class={svgClass} style={this.style} aria-hidden="true" {...$attrs}>
            <use xlinkHref={symbolId} fill={fill}></use>
          </svg>
        )
      }
    }
    return null
  }
})
