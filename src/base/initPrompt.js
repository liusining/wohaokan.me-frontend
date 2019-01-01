import Prompt from '../components/Prompt';
import {no} from "../utils/util";

export function initPrompt(Vue) {
  let prompt = new Vue({
    data() {
      return {
        isShow: false,
        callback: no,
        promptInfo: {
          title: '',
          content: '',
          button: '',
        }
      }
    },
    components: {Prompt},
    template: `<Prompt :show.sync="isShow" v-bind="promptInfo" @callback="callback"/>`,
    methods: {
      show(title, content, button, callback = no) {
        this.isShow = true;
        this.callback = callback;

        this.promptInfo = {
          title,
          content,
          button
        }
      }
    }
  }).$mount();

  document.body.appendChild(prompt.$el);

  Vue.mixin({
    beforeCreate() {
      this.$prompt = function ({title = "温馨提示", content, button, callback}) {
        prompt.show(title, content, button, callback);
      };
    }
  })
}