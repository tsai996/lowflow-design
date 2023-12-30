import {defineComponent, PropType, ref, VNode} from "vue";
import {ConditionNode} from './index'

export default defineComponent({
    props: {
        node: {
            type: Object as PropType<ConditionNode>,
            required: true
        }
    },
    setup(props) {
        const content = ref<VNode>(<span></span>);
        const renderContent = (): VNode => {
            if (props.node.def) {
                content.value = <span>不满足条件时，进入默认条件</span>
            } else if (props.node.conditions.conditions.length > 0 || props.node.conditions.groups.length > 0) {
                const count = props.node.conditions.conditions.length + props.node.conditions.groups.length
                content.value = <span>已设置（{count}）个条件</span>
            } else {
                content.value = <span>不满足条件时，进入默认条件</span>
            }
            return content.value
        }
        return {
            renderContent
        }
    },
    render() {
        return <el-text>{this.renderContent()}</el-text>
    }
})