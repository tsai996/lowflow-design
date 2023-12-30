import {defineComponent, PropType, ref, VNode, watchEffect} from "vue";
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
        watchEffect(() => {
            if (props.node.users.length > 0) {
                getUsers(props.node.users).then(res => {
                    if (res.success) {
                        content.value = <span>{res.data.map(e => e.name).join('、')}</span>
                    }
                })
            } else {
                content.value = <span>未指定人员</span>
            }
        })
        return {
            content
        }
    },
    render() {
        return <el-text>{this.content}</el-text>
    }
})