import {ADD_COUNT, ADD_TO_CART} from "./mutation-types";

export default {
  addCart({commit,state}, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        commit(ADD_COUNT,oldProduct);
        resolve('当前商品数量+1');
      } else {
        payload.count = 1;
        payload.checked = true;
        commit(ADD_TO_CART,payload);
        resolve('商品添加至购物车')
      }
    })

  }
}