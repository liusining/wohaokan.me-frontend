// 用于唯一标识一次镜像，当获取的图片类型改变后（在随便看看、看看女生和翻翻男生之间切换），需要防止上次的异步数据对本次有影响，需要
// 删除某些无用的结果。而uuid用于标记一次唯一的数据类型请求。返回数据后，会检测发送请求之前的uuid与请求返回后的uuid是否相同，
// 如果不同，则会抛弃该请求结果。
let UUIDContainer = {
  uuid: 0
};

export function getUUID() {
  return UUIDContainer.uuid;
}

export function updateUUID() {
  UUIDContainer = {
    uuid: UUIDContainer.uuid + 1
  };
}