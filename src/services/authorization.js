/**
 * mixin授权
 * @param returnTo 期望授权之后的返回值
 */
export function authorization(returnTo = "") {
  let client_id;

  if (process.env.NODE_ENV === 'production') {
    client_id = 'b9b4d690-1bac-42c4-8be4-93b43cbc4e5d';
  } else {
    client_id = 'faf9c343-677e-4f84-89cd-4c5688f22f7c';
  }

  window.location = `https://mixin.one/oauth/authorize?client_id=${client_id}&scope=PROFILE:READ+ASSETS:READ&response_type=code&return_to=${returnTo}`;
}