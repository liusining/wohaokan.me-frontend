import '../services';
import {getUser, saveAuthCode} from "../services/user";
import {onReady} from "../utils/browserHelper";
import {hideLoading, initLoading} from "./loading";
import {saveAuth} from "../utils/authorizationHelper";
import {LOAD_STATUS} from "../utils/constants";

/**
 * 该文件用于检测权限是否已过期，使用按需加载，是一种性能优化
 */

export function checkAuthDueDate(code, error) {
  (code ? saveAuthCode(code) : Promise.resolve()).then((data) => {

    onReady(() => {
      initLoading();

      hideLoading(true);

      if (data) {
        saveAuth(data.result.session_key);
      }

      let currState;

      if (error) {
        currState = LOAD_STATUS.ERROR;
      } else if (code) {
        currState = LOAD_STATUS.AUTH;
      } else {
        currState = LOAD_STATUS.SUCCESS;
      }

      getUser(false).then(({result}) => {
        import('./bootstrap').then(({initRoot}) => {
          initRoot(currState, result);
        });
      })
    });
  });
}