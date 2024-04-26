import { defineStore } from "pinia";

export const useItemsRaindleStore = defineStore('items-raindle',{
  state: () => ({
    shareableEmoji: ``
  }),
  actions: {
    appendEmoji(emoji){
      this.shareableEmoji += emoji;
    }
}})
