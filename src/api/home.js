/**
 * 获取广告区轮播图
 * @returns promise
 */
export const findBanner = () => {
  return ('http://pcapi-xiaotuxian-front-devtest.itheima.net/home/banner', 'get')
}

/**
 * 获取同类推荐(也支持猜你喜欢)
 * @param {String} id -- 商品id 传入就是相关推荐 不传就是猜你喜欢
 * @param {Integer} limit -- 商品数量
 */
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return ('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods/relevant', 'get', { id, limit })
}
