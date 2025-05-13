document.addEventListener("DOMContentLoaded", () => {
  // 获取DOM元素
  const dragContainer = document.getElementById("dragContainer")
  const addBoxButton = document.getElementById("addBox")
  const resetBoxesButton = document.getElementById("resetBoxes")

  // 全局变量
  let boxCount = 5
  let activeBox = null
  let initialX = 0
  let initialY = 0
  let xOffset = 0
  let yOffset = 0

  // 初始化所有盒子
  initBoxes()

  // 添加新盒子按钮事件
  addBoxButton.addEventListener("click", () => {
    boxCount++

    const newBox = document.createElement("div")
    newBox.className = "box"
    newBox.id = "box" + boxCount
    newBox.textContent = "盒子 " + boxCount

    // 随机位置和颜色
    const maxLeft = dragContainer.clientWidth - 100
    const maxTop = dragContainer.clientHeight - 100
    const left = Math.floor(Math.random() * maxLeft)
    const top = Math.floor(Math.random() * maxTop)
    const hue = Math.floor(Math.random() * 360)

    newBox.style.left = left + "px"
    newBox.style.top = top + "px"
    newBox.style.backgroundColor = `hsl(${hue}, 70%, 50%)`

    dragContainer.appendChild(newBox)
    initDraggable(newBox)
  })

  // 重置盒子位置按钮事件
  resetBoxesButton.addEventListener("click", () => {
    const boxes = document.querySelectorAll(".box")
    boxes.forEach((box, index) => {
      switch (index % 5) {
        case 0:
          box.style.top = "50px"
          box.style.left = "50px"
          break
        case 1:
          box.style.top = "200px"
          box.style.left = "200px"
          break
        case 2:
          box.style.top = "100px"
          box.style.left = "350px"
          break
        case 3:
          box.style.top = "300px"
          box.style.left = "100px"
          break
        case 4:
          box.style.top = "250px"
          box.style.left = "500px"
          break
      }
    })
  })

  // 初始化所有盒子
  function initBoxes() {
    const boxes = document.querySelectorAll(".box")
    boxes.forEach((box) => {
      initDraggable(box)
    })
  }

  // 初始化单个盒子的拖拽功能
  function initDraggable(element) {
    // 鼠标事件
    element.addEventListener("mousedown", dragStart)

    // 触摸事件
    element.addEventListener("touchstart", dragStart)
  }

  // 开始拖拽
  function dragStart(e) {
    // 阻止默认行为，防止文本选择等
    e.preventDefault()

    // 设置当前活动盒子
    activeBox = this

    // 获取初始位置
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX
      initialY = e.touches[0].clientY
    } else {
      initialX = e.clientX
      initialY = e.clientY
    }

    // 获取盒子当前位置
    const style = window.getComputedStyle(activeBox)
    xOffset = Number.parseInt(style.left) || 0
    yOffset = Number.parseInt(style.top) || 0

    // 添加拖拽样式
    activeBox.classList.add("dragging")

    // 添加移动和结束事件监听
    document.addEventListener("mousemove", drag)
    document.addEventListener("touchmove", drag)
    document.addEventListener("mouseup", dragEnd)
    document.addEventListener("touchend", dragEnd)
  }

  // 拖拽中
  function drag(e) {
    if (!activeBox) return

    // 阻止默认行为，防止滚动等
    e.preventDefault()

    let currentX, currentY

    // 获取当前位置
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX
      currentY = e.touches[0].clientY - initialY
    } else {
      currentX = e.clientX - initialX
      currentY = e.clientY - initialY
    }

    // 计算新位置
    let newX = xOffset + currentX
    let newY = yOffset + currentY

    // 限制在容器内
    const maxX = dragContainer.clientWidth - activeBox.offsetWidth
    const maxY = dragContainer.clientHeight - activeBox.offsetHeight

    newX = Math.max(0, Math.min(newX, maxX))
    newY = Math.max(0, Math.min(newY, maxY))

    // 设置位置
    activeBox.style.left = newX + "px"
    activeBox.style.top = newY + "px"
  }

  // 结束拖拽
  function dragEnd(e) {
    if (!activeBox) return

    // 移除拖拽样式
    activeBox.classList.remove("dragging")

    // 移除事件监听
    document.removeEventListener("mousemove", drag)
    document.removeEventListener("touchmove", drag)
    document.removeEventListener("mouseup", dragEnd)
    document.removeEventListener("touchend", dragEnd)

    // 重置变量
    activeBox = null
  }
})
