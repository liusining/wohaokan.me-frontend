import {take} from "./Request";

export function fetchImages({page, gender}, shouldLoading) {
  return take.get(`get_images?page=${encodeURIComponent(page)}&gender=${encodeURIComponent(gender)}`, {
    shouldLoading
  });
}