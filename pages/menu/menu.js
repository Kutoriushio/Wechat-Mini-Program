// pages/menu/menu.js


Page({
    data: {
        selectedRecipes: [],
        categories: [],
        curIndex: []
    },

    getRecipes: function(category) {
        // 获取当前种类的所有食谱
        let selectedRecipe = [];
        wx.getStorageSync('recipes').forEach(function(item, index){
            if (item.category === category) {
                selectedRecipe.push(item);
            }
        })
        return selectedRecipe;
    },

    getCurrentCategory: function(e) {
        // 响应用户的点击事件，显示对应种类的所有食谱
        let index = e.currentTarget.dataset.index;
        let category = this.data.categories[index].name;

        let selectedRecipes = [];
        selectedRecipes = this.getRecipes(category);
        // 渲染对应种类的菜谱
        this.setData({
            curIndex: index,
            selectedRecipes
        })
    },
    
    onLoad: function() {
        // 初始化函数
        const app = getApp();
        // 给全局数据的recipes添加key(clickOrder)
        app.globalData.recipes.map((item) => {
            return {
                ...item,
                clickOrder: 0
            };
        });
        // 判断本地是否已有存储数据
        if (wx.getStorageInfoSync('recipes').keys.length === 0){
            wx.setStorageSync('category', app.globalData.categories);
            wx.setStorageSync('recipes', app.globalData.recipes);
        }
        const categories = wx.getStorageSync('category');
        // 渲染第一个种类的菜谱
        const initialRecipe = this.getRecipes(categories[0].name);
        this.setData({  
            categories,
            curIndex: 0,
            selectedRecipes: initialRecipe
        })

    },

    onShow: function() {
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
        let curCategory = this.data.categories[this.data.curIndex];
        // 修改本地存储的数据，将点击的菜谱的标签内容并以时间排序
        const updatedRecipes = wx.getStorageSync('recipes').map((recipe) =>{
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
        //更新本地存储的数据
        wx.setStorageSync('recipes', updatedRecipes);
        const selectedRecipes = this.getRecipes(curCategory.name);
        this.setData({
            selectedRecipes
        })
    }
})