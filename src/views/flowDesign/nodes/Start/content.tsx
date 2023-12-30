import {defineComponent, PropType, ref, VNode} from "vue";
import {StartNode} from './index'

export default defineComponent({
    props: {
        node: {
            type: Object as PropType<StartNode>,
            required: true
        }
    },
    setup(props) {
        const content = ref<VNode>(<span></span>);
        const renderContent = (): VNode => {
            content.value = <span>{props.node.name}</span>
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