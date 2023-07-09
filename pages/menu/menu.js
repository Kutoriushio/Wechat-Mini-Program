// pages/menu/menu.js
// 引入云数据库
const db = wx.cloud.database();
Page({
    data: {
        selectedRecipes: [],
        categories: [],
        curIndex: []
    },

    getDataFromCollection: function (collectionName, query){
        return new Promise((resolve, reject) => {
            db.collection(collectionName).where(query).get().then(res => {
                resolve(res.data); //数据库获取成功，返回数据
            }).catch(err => {
                reject(err); //获取失败，返回错误信息
            })
        })
    },
    

    getCurrentCategory: async function(e) {
        // 响应用户的点击事件，显示对应种类的所有食谱(异步操作)
        try {
            let curIndex = e.currentTarget.dataset.index;
            let curId = this.data.categories[curIndex].category_id;
            const selectedRecipes = await this.getDataFromCollection('recipes', {category_id: curId});
            this.setData({
                curIndex,
                selectedRecipes
            })
        } catch(err) {
            console.log(err)
        }
    },
    
    onLoad: async function(options) {
        // 异步操作，等待接受数据库数据,然后传给前端渲染
        try {
            const categories = await this.getDataFromCollection('category', {});
            const selectedRecipes = await this.getDataFromCollection('recipes', {category_id :1});
            this.setData({
                categories,
                selectedRecipes,
                curIndex: 0
            })
        } catch(err) {
            console.log(err)
        }
    },

    onShow: function() {
        // 更新全局数据
        this.setData({
            recipes: getApp().globalData.recipes
        });
        // 重新渲染页面
        const index = this.data.curIndex;
        const renderedRecipes = this.getRecipes(this.data.categories[index].name);
        this.setData({
            selectedRecipes: renderedRecipes
        })
    },

    goToDetailPage: function(e) {
        // 跳转至详情页
        let curId = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/pages/detail/detail?id=' + curId,
        })
    },

    addToOrder: function(e) {
        // 响应用户的点击事件，将选中的食谱添加到点菜中
        let curId = e.currentTarget.dataset.id;
        // 修改点击的菜谱的标签内容并以时间排序
        const selectedRecipes = this.data.selectedRecipes.map((recipe) =>{
            if(recipe.id === curId) {
                if (recipe.buttonText === '添加') {
                    recipe.buttonText = '已添加';
                    recipe.clickOrder = Date.now();
                } else {
                    recipe.buttonText = '添加'
                }
            }
            return recipe
        });
        this.setData({
            selectedRecipes
        })
    }
})