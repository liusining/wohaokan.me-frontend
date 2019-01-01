export function getPath() {
  if (process.env.NODE_ENV === 'production') {
    return '//api.wohaokan.me';
  } else {
    return '//stg.api.wohaokan.me';
  }
}