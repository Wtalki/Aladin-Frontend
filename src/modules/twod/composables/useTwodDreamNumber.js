import { useTwodDreamNumberStore } from '@/modules/twod/store/twodDreamNumberStore'
import { storeToRefs } from 'pinia'

export const useTwodDreamNumber = () => {
  const store = useTwodDreamNumberStore()

  const { items, currentPage, previousPageUrl, nextPageUrl } = storeToRefs(store)
  const { loadDreamNumbers, changePage } = store

  return {
    items,
    currentPage,
    previousPageUrl,
    nextPageUrl,
    loadDreamNumbers,
    changePage
  }
}
