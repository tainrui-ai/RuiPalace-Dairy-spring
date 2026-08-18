let fileHandle;

// 绑定点击事件触发文件选择
document.getElementById('saveButton').addEventListener('click', async function setupFileAccess() {
  try {
    // 唤起本地文件选择框
    [fileHandle] = await window.showOpenFilePicker({
      types: [{ description: '日记手稿', accept: { 'application/json': ['.json'] } }],
      multiple: false
    });
    console.log("连接已建立，所有书写将自动持久化在此文件。");
  } catch (err) {
    console.log("用户取消了文件选择。");
  }
});