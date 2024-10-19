/*
 * @description 创建文件的MD5值,根据文件大小动态选择分片大小和快速循环的方式
 * @param {Object} file el文件对象或文件对象
 * @return {String} MD5 值
 * */
const maxChunkSize = 1024 * 1024 // 每次处理数据块的最大值，1MB
const chunksPerCycle = 100 // 每个计算周期中处理的数据块数
export const createMD5 = file => {
 file = file.raw || file
 let stamp = Date.now()
 console.time('md计算耗时' + stamp)
 let worker = new Worker(
  './worker.js'
  )
 
 return new Promise((resolve, reject) => {
  // 分片放worker处理
  const fileReader = new FileReader()
  try {
   let currentChunk = 0
   const totalChunks = Math.ceil(file.size / maxChunkSize)
   // 处理数据块
   const processChunk = start => {
    try {
     let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
     const end = Math.min(start + maxChunkSize, file.size)
     const chunk = blobSlice.call(file, start, end)
     fileReader.readAsArrayBuffer(chunk)
     } catch (e) {
     console.error(e)
     }
    }
   // 文件读取成功
   fileReader.onload = () => {
    worker.postMessage({ dataBuffer: fileReader.result, status: 'ing' }, [fileReader.result])
    currentChunk += 1
    if (currentChunk >= totalChunks) {
     worker.postMessage({ status: 'end' })
     fileReader.abort()
     // console.timeEnd('计算MD5')
     return
     // return resolve(md5Hash)
     } else if (currentChunk % chunksPerCycle === 0) {
     // 在处理指定数量的数据块后，设置一个任务延迟以使 UI 线程有空间处理
     setTimeout(() => {
      processChunk(currentChunk * maxChunkSize)
      }, 0)
     } else {
     // 继续处理下一个数据块
     processChunk(currentChunk * maxChunkSize)
     }
    }

   fileReader.onerror = e => {
    console.error(e)
    return reject(e)
    }
    worker.onmessage = ({ data }) => {
    const { md5, status, error } = data
    if (status === 'success') {
     resolve(md5)
     } else {
     reject(error)
     }
    console.timeEnd('md计算耗时' + stamp)
    worker.terminate()
    }
   // 开始处理第一个数据块
   processChunk(0)
   } catch (e) {
   fileReader.abort()
   reject(e)
   } finally {
   }
  })
}
