import {isAuth, saveAuth} from "../utils/authorizationHelper";
import {authorization, saveAuthCode} from "../services/authorization";
import {resolveSearch} from "../utils/browserHelper";
import {initRoot} from "./bootstrap";
import {LOAD_STATUS} from "../utils/constants";
import {initLoading, hideLoading} from "./loading";

const search = resolveSearch();

document.addEventListener('DOMContentLoaded', function () {
  initLoading();

  const {code, error} = search;
  // 如果已经授权，或授权成功，或授权失败时，都会进入主页
  if (code || isAuth() || error) {
    let promiseList = [import('./bootstrap')];
    // let promiseList = [];

    if (code) {
      promiseList.push(saveAuthCode(code));
    }

    Promise.all(promiseList).then(([{initRoot}, data]) => {
      hideLoading(true);

      if (data) {
        saveAuth(data.result.session_key);
      }

      let currState;

      if (error || (data && data.status !== 200)) {
        currState = LOAD_STATUS.ERROR;
      } else if (code) {
        currState = LOAD_STATUS.AUTH;
      } else {
        currState = LOAD_STATUS.SUCCESS;
      }

      initRoot(currState);
    });
  } else {
    authorization();
  }
});