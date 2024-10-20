import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useDraggableScroll(containerRef: Ref<HTMLElement | null>) {
  const isDragging = ref(false)
  let startX: number, startY: number
  let scrollLeft: number, scrollTop: number

  const onMouseDown = (e: MouseEvent) => {
    if (!containerRef.value) return
    isDragging.value = true
    startX = e.pageX
    startY = e.pageY
    scrollLeft = containerRef.value.scrollLeft
    scrollTop = containerRef.value.scrollTop
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !containerRef.value) return
    const deltaX = e.pageX - startX
    const deltaY = e.pageY - startY
    containerRef.value.scrollLeft = scrollLeft - deltaX
    containerRef.value.scrollTop = scrollTop - deltaY
  }

  const onMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  onMounted(() => {
    containerRef.value?.addEventListener('mousedown', onMouseDown)
  })

  onBeforeUnmount(() => {
    containerRef.value?.removeEventListener('mousedown', onMouseDown)
  })

  return {
    isDragging
  }
}
