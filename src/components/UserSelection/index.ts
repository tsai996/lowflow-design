import userTag from './src/UserTag.vue'
import userPicker from './src/UserPicker.vue'
import userSelector from './src/UserSelector.vue'
import {withInstall, withNoopInstall} from 'element-plus/es/utils/vue/install'

export const UserTag = withNoopInstall(userTag)
export const UserPicker = withNoopInstall(userPicker)
export const UserSelector = withInstall(userSelector, {
    userTag,
    userPicker
})
export default UserSelector
