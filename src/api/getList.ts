import data from '../../data.json';
import type { cardDataType } from './type/type'
const list: cardDataType[] = data.data.items.map(item => ({
  name: item.note_card.user.nick_name,
  title: item.note_card.display_title,
  avatar: item.note_card.user.avatar,
  url: item.note_card.cover.url_default,
  height: item.note_card.cover.height,
  width: item.note_card.cover.width,
  liked_count: item.note_card.interact_info.liked_count
}))

export const getDataList = (page: number, pageSize = 20) => {
  return new Promise<cardDataType[]>((resolve) => {
    setTimeout(() => {
      resolve(list.slice((page - 1) * pageSize, page * pageSize));
    },2000);
  })
}