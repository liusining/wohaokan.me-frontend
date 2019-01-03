import Message from '../components/Message';

let msg;

export function initMessage(Vue) {
  let Msg = Vue.extend(Message);
  msg = new Msg().$mount();
  document.body.appendChild(msg.$el);

  Vue.mixin({
    beforeCreate() {
      this.$message = function ({type = "success", message}) {
        msg.show(type, message);
      };
    }
  })
}

export function showMessage(type, message) {
  msg && msg.show(type, message);
}