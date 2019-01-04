
import {saveAuth} from "../utils/authorizationHelper";
import {saveAuthCode} from "../services/user";
import {LOAD_STATUS} from "../utils/constants";
import {initLoading, hideLoading} from "./loading";
import {initRoot} from "./bootstrap";
import {onReady} from "../utils/browserHelper";
import './services';

export function entry(code, error) {
  let promise = (code ? saveAuthCode(code) : Promise.resolve());

  onReady(() => {
    initLoading();

    promise.then((data) => {
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

      initRoot(currState);

    });
  });
}