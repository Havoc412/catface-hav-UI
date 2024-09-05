// 记录 tabbar 状态
import { defineStore } from "pinia";

export default defineStore("tarbarStore", {
    state: (): {
        curPageIndex: number,
        routeHistory: number[]
    } => {
        return {
          curPageIndex: 0,
          routeHistory: []
        };
    },
    actions: {
        setPageID(nID: number, remember: Boolean = false) {
            if(remember)
                this.routeHistory.push(this.curPageIndex);
            setTimeout(() => {
                this.curPageIndex = nID;
                console.info(this.curPageIndex);
            }, 200); // todo 动画延时的问题。
            console.info(this.routeHistory);
        },
        backRoute() {
          const lastRoute = this.routeHistory.pop(); // 移除并获取数组的最后一个元素
          if (lastRoute !== undefined) {
            this.curPageIndex = lastRoute;
          }
          // console.info(lastRoute);
        }
    }
})