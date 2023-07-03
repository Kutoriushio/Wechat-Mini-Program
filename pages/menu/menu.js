// pages/menu/menu.js
const app = getApp();
const categories = app.globalData.categories;
const recipes = app.globalData.recipes;

Page({
    getRecipes: function(category) {
        let selectedRecipe = [];
        recipes.forEach(function(item, index){
            if (item.category === category) {
                selectedRecipe.push(item);
            }
        })
        return selectedRecipe;
    },

    getCurrentCategory: function(e) {
        let index = e.currentTarget.dataset.index;
        let category = categories[index].name;

        let selectedRecipe = [];
        selectedRecipe = this.getRecipes(category);
        this.setData({
            curIndex: index,
            selectedRecipe: selectedRecipe
        })
    },
    
    onLoad: function() {
        const initialRecipe = this.getRecipes(categories[0].name)
        this.setData({
            categories: categories,
            curIndex: 0,
            selectedRecipe: initialRecipe
        })
    },

    goToDetailPage: function(e) {
        let curId = e.currentTarget.dataset.id;
        console.log(curId);
        wx.navigateTo({
          url: '/pages/detail/detail?id=' + curId,
        })
    }
})