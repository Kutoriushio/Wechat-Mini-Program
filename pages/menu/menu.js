// pages/menu/menu.js


Page({
    data: {
        selectedRecipes: [],
        recipes: [],
        categories: [],
        curIndex: []
    },

    getRecipes: function(category) {
        // 获取当前种类的所有食谱
        let selectedRecipe = [];
        this.data.recipes.forEach(function(item, index){
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
        // 把对应种类的食谱数据传给全局变量selectedRecipes
        this.data.selectedRecipes = selectedRecipes;
        this.setData({
            curIndex: index,
            selectedRecipes: selectedRecipes
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
        this.data.categories = app.globalData.categories;
        this.data.recipes = app.globalData.recipes;
        // 显示第一个种类的菜谱
        const initialRecipe = this.getRecipes(this.data.categories[0].name);
        this.setData({  
            categories: this.data.categories,
            curIndex: 0,
            selectedRecipes: initialRecipe
        })
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