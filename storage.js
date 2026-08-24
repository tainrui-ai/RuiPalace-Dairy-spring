/**
 * storage.js - 蕊宫日记本地化持久存储模块
 * 提供基于 File System Access API 的本地文件读写双向绑定
 */

let fileHandle = null;
let writable = null;

// 初始化连接：唤起文件选择器并建立持久化写入通道
async function bindFileHandle() {
  try {
    // 唤起文件选择器
    [fileHandle] = await window.showOpenFilePicker({
      types: [{ 
        description: '蕊宫日记手稿 (JSON)', 
        accept: { 'application/json': ['.json'] } 
      }],
      multiple: false
    });

    // 检查是否有写权限，如果没有，请求权限
    const permission = await fileHandle.requestPermission({ mode: 'readwrite' });
    if (permission !== 'granted') {
      throw new Error("无权写入文件，请检查文件权限。");
    }

    // 建立可写入流
    writable = await fileHandle.createWritable();
    console.log("蕊宫：本地文件绑定成功，通道已开启。");
    return true;
  } catch (err) {
    console.error("蕊宫：文件连接失败或用户已取消操作。", err);
    return false;
  }
}

// 写入数据：将 JSON 字符串刷入绑定的本地磁盘文件
async function syncToDisk(dataString) {
  if (!writable) {
    console.warn("蕊宫：未检测到绑定文件，磁盘写入跳过。");
    return false;
  }
  
  try {
    // 写入新内容之前必须先清空流，否则会导致数据追加而非覆盖
    await writable.truncate(0); 
    await writable.write(dataString);
    await writable.flush(); // 确保数据真正落盘
    console.log("蕊宫：数据已同步至本地磁盘。");
    return true;
  } catch (err) {
    console.error("蕊宫：磁盘写入失败，请确保文件未被外部占用。", err);
    return false;
  }
}

// 导出当前句柄状态，以便在 index.html 中判断是否需要重连
function getFileStatus() {
  return {
    isBound: !!fileHandle,
    fileName: fileHandle ? fileHandle.name : null
  };
}
