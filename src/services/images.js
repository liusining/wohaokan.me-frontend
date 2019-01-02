import {take} from "./Request";

export function fetchImages({page, gender}, shouldLoading) {
  return take.get(`get_images?page=${page}&gender=${gender}`, {
    shouldLoading
  });
}