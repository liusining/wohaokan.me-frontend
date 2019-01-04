import {isAuth} from "../utils/authorizationHelper";
import {resolveSearch} from "../utils/browserHelper";
import {authorization} from "../services/authorization";

const {code, error} = resolveSearch();
/**
 *  该文件用于检测当前用户是否已经授权，使用按需加载进行性能优化
 */
if (code || isAuth() || error) {
  import('./checkAuthDueDate').then(({checkAuthDueDate}) => {
    checkAuthDueDate(code, error);
  })
} else {
  authorization();
}