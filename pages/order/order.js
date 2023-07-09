// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addedRecipes: [],
        startX: 0,
        startY: 0,
        scrollY : true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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
        const updatedRecipes = this.updateOrder();
        this.setData({
            addedRecipes: updatedRecipes
        });
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

    },

    updateOrder: function() {
        // 选中所有已添加的食谱，并按照点击顺序排序
        const recipes = wx.getStorageSync('recipes');
        const updatedRecipes = recipes.filter(recipe => recipe.buttonText === '已添加');
        const sortedRecipes = updatedRecipes.sort((a,b) => {
            return a.clickOrder - b.clickOrder;
        });
        return sortedRecipes;
    },

    touchStart: function(e) {
        //给数组添加一对键值对，表示是否显示删除选项
        this.data.addedRecipes = this.data.addedRecipes.map((item) => {
            return {
                ...item,
                show: false
            }
        });
        this.setData({
            startX : e.touches[0].clientX,
            startY : e.touches[0].clientY
        });
    },

    touchMove: function(e) {
        const curIndex = e.currentTarget.dataset.index;
        let moveX = e.changedTouches[0].clientX;
        let moveY = e.changedTouches[0].clientY;
        let addedRecipes = this.data.addedRecipes;
        let scrollY = true;
        // 计算X和Y的位移
        const deltaX = moveX - this.data.startX;
        const deltaY = moveY - this.data.startY;
        // 计算角度
        const angle = 360 * Math.atan(deltaY / deltaX) / (2 * Math.PI);
        addedRecipes.forEach((item, index) => {
            // 角度大于30表示用户上滑，直接返回
            if (angle > 30) {
                return;
            }
            //遍历数组，如果用户触碰目标的index和页面数组的index一致且是向左滑动，就显示删除选项
            //touches.clientX的原点在左上角
            if (curIndex === index) {
                if (moveX + 100 < this.data.startX) {
                    item.show = true;
                    scrollY = false;
                }
            }
        })
        this.setData({
            addedRecipes,
            scrollY: scrollY
        })
    },

    delete: function(e) {
        const btnIndex = e.currentTarget.dataset.index;
        // 找到要删除的菜谱
        let deleteRecipe = this.data.addedRecipes[btnIndex];
        // 将本地存储中的菜谱数据修改为‘添加’
        const recipes = wx.getStorageSync('recipes');
        const updatedRecipes = recipes.map((item) => {
            if (item.id === deleteRecipe.id) {
                item.buttonText = '添加'
            }
            return item
        })
        wx.setStorageSync('recipes', updatedRecipes)
        this.onShow()
        
    }
})