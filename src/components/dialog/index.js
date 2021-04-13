/*
* created by linanyi 2019-12-24
* 模态框组件
*/

import dialogVue from './index.vue';

// 定义插件对象
const Dialog = {};
// vue的install方法，用于定义vue插件
Dialog.install = function (Vue, options) {
  const DialogBoxInstance = Vue.extend(dialogVue);
  let currentMsg;
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new DialogBoxInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$dialog = {
    showDialogBox (options) {
      if (!currentMsg) {
        initInstance();
      }
      if (typeof options == 'string') {
        currentMsg.content = options;
      } else if (typeof options == 'object') {
        Object.assign(currentMsg, options);
      }
      return currentMsg.showDialogBox()
          .then(val => {
            currentMsg = null;
            return Promise.resolve(val);
          })
          .catch(err => {
            currentMsg = null;
            return Promise.reject(err);
          });
    },
    cancel(){
      return currentMsg.cancel()
    }
  };
};
export default Dialog;
