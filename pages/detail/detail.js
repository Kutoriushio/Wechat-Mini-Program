// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recipe: [],
        detail: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // string转换为number
        let selectedId = parseInt(options.id);
        // 引用云数据库
        const db = wx.cloud.database();
        const recipes = wx.getStorageSync('recipes');
        // 查找本地数据，返回对应的菜谱数据
        const selectedRecipe = recipes.find(function(recipe){
            return recipe.id === selectedId;
        });
        // 从数据库查找对应菜谱的详情数据
        db.collection('details').where({
            recipe_id : selectedId
        }).get().then(res => {
            this.setData({
                recipe: selectedRecipe,
                detail: res.data
            })
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})