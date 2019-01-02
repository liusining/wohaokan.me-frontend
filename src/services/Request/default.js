export function initDefault(Request) {
  Request.showError = function (message) {
    console.error(message);
  };

  Request.handleError = function ({msg}, {errorMessage = ''}) {
    Request.showError(msg || errorMessage);
  };

  Request.loading = function () {
  }
}