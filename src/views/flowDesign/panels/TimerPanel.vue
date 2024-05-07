<script setup lang="ts">
import type { TimerNode } from '../nodes/type'
defineProps<{
  activeData: TimerNode
}>()
</script>

<template>
  <el-form label-position="top">
    <el-form-item prop="waitType" label="等待方式">
      <el-radio-group v-model="activeData.waitType">
        <el-radio-button label="固定时长" value="duration" />
        <el-radio-button label="固定时间" value="date" />
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="duration" label="等待时长" v-if="activeData.waitType === 'duration'">
      <el-input
        v-model.number="activeData.duration"
        :min="0"
        :max="9999999"
        type="number"
        style="max-width: 230px"
        class="input-with-select"
      >
        <template #append>
          <el-select v-model="activeData.unit" placeholder="Select" style="width: 80px">
            <el-option label="秒" value="PT%sS"></el-option>
            <el-option label="分钟" value="PT%sM"></el-option>
            <el-option label="小时" value="PT%sH"></el-option>
            <el-option label="天" value="P%sD"></el-option>
            <el-option label="周" value="P%sW"></el-option>
            <el-option label="月" value="P%sM"></el-option>
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="duration" label="指定时间" v-if="activeData.waitType === 'date'">
      <el-date-picker
        v-model="activeData.timeDate"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择等待时间"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
