import {defineComponent, PropType, ref, VNode} from "vue";
import {CcNode} from './index'
import {getList as getUsers} from '~/api/modules/user'

export default defineComponent({
    props: {
        node: {
            type: Object as PropType<CcNode>,
            required: true
        }
    },
    setup(props) {
        const content = ref<VNode>(<span></span>);
        const renderContent = (): VNode => {
            if (props.node.users.length > 0) {
                getUsers(props.node.users).then(res => {
                    if (res.success) {
                        content.value = <span>{res.data.map(e => e.name).join('、')}</span>
                    }
                })
            } else {
                content.value = <span>未指定人员</span>
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