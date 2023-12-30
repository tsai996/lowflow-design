import {defineComponent, inject, PropType, ref, Ref, VNode} from "vue";
import {ApprovalNode} from './index'
import {Field} from "~/components/Render/interface";
import {getList as getRoles} from '~/api/modules/role'
import {getList as getUsers} from '~/api/modules/user'


export default defineComponent({
    props: {
        node: {
            type: Object as PropType<ApprovalNode>,
            required: true
        }
    },
    setup(props) {
        const {fields} = inject<{
            fields: Ref<Field[]>
        }>('nodeHooks')!
        const content = ref<VNode>(<span></span>);
        const renderContent = (): VNode => {
            if (props.node.assigneeType === 'choice') {
                content.value = <span>{`发起人自选（${props.node.choice ? '多选' : '单选'}）`}</span>
            } else if (props.node.assigneeType === 'self') {
                content.value = <span>{'发起人自己'}</span>
            } else if (props.node.assigneeType === 'leader') {
                content.value = <span>{props.node.leader === 1 ? '直属上级' : `${props.node.leader}级上级`}</span>
            } else if (props.node.assigneeType === 'formUser') {
                const title = fields.value.find(e => e.id === props.node.formUser)?.title || props.node.formUser || '?'
                content.value = <span>{`表单内（${title}）角色`}</span>
            } else if (props.node.assigneeType === 'formRole') {
                const title = fields.value.find(e => e.id === props.node.formRole)?.title || props.node.formRole || '?'
                content.value = <span>{`表单内（${title}）角色`}</span>
            } else if (props.node.assigneeType === 'user') {
                if (props.node.users.length > 0) {
                    getUsers(props.node.users).then(res => {
                        if (res.success) {
                            content.value = <span>{res.data.map(e => e.name).join('、')}</span>
                        }
                    })
                } else {
                    content.value = <span>未指定人员</span>
                }
            } else if (props.node.assigneeType === 'role') {
                if (props.node.roles.length > 0) {
                    getRoles(props.node.roles).then(res => {
                        if (res.success) {
                            content.value = <span>{res.data.map(e => e.name).join('、')}</span>
                        }
                    })
                } else {
                    content.value = <span>未指定角色</span>
                }
            } else {
                content.value = <span>{props.node.name}</span>
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