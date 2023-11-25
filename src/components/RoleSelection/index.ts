import roleTag from './src/RoleTag.vue'
import rolePicker from './src/RolePicker.vue'
import roleSelector from './src/RoleSelector.vue'
import {withInstall, withNoopInstall} from 'element-plus/es/utils/vue/install'

export const RoleTag = withNoopInstall(roleTag)
export const RolePicker = withNoopInstall(rolePicker)
export const RoleSelector = withInstall(roleSelector, {
    roleTag,
    rolePicker
})
export default RoleSelector
