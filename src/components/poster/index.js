/*
* created by linanyi 2020-01-15
* 海报弹窗组件
*/

import posterVue from './index.vue';

// 定义插件对象
const Poster = {};
// vue的install方法，用于定义vue插件
Poster.install = function (Vue, options) {
    const PosterBoxInstance = Vue.extend(posterVue);
    let currentMsg;
    const initInstance = () => {
        // 实例化vue实例
        currentMsg = new PosterBoxInstance();
        let msgBoxEl = currentMsg.$mount().$el;
        document.body.appendChild(msgBoxEl);
    };
    // 在Vue的原型上添加实例方法，以全局调用
    Vue.prototype.$poster = {
        showPosterBox (options) {
            if (!currentMsg) {
                initInstance();
            }
            if (typeof options === 'string') {
                currentMsg.content = options;
            } else if (typeof options === 'object') {
                Object.assign(currentMsg, options);
            }
            return currentMsg.showPosterBox()
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
export default Poster;
