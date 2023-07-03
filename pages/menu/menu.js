// pages/menu/menu.js
Page({
    data: {
        categories: [
            {name: '甜品', id: 1},
            {name: '主食', id: 2},
            {name: '素菜', id: 3},
            {name: '荤菜', id: 4},
            {name: '汤', id: 5},
            {name: 'melon特供', id: 6}
        ],
        recipes: [
            {name: '青椒土豆丝', id: 1, category: '素菜'},
            {name: '炒青菜', id: 2, category: '素菜'},
            {name: '炒空心菜', id: 3, category: '素菜'},
            {name: '清炒芦笋', id: 4, category: '素菜'},
            {name: '煎豆腐', id: 5, category: '素菜'},
            {name: '炒刀豆', id: 6, category: '素菜'},
            {name: '芹菜炒鸡蛋', id: 7, category: '素菜'},
            {name: '番茄炒蛋', id: 8, category: '素菜'},
            {name: '烤羊排', id: 9, category: '荤菜'},
            {name: '煎三文鱼', id: 10, category: '荤菜'},
            {name: '咖喱猪排', id: 11, category: '荤菜'},
            {name: '咖喱牛肉', id: 12, category: '荤菜'},
            {name: '烤羊排', id: 13, category: '荤菜'},
            {name: '包菜炒粉丝', id: 14, category: '素菜'},
            {name: '烤鸡翅', id: 15, category: '荤菜'},
            {name: '萝卜炖牛腩', id: 16, category: '荤菜'},
            {name: '巴沙鱼片', id: 17, category: '荤菜'},
            {name: '椒盐虾', id: 18, category: '荤菜'},
            {name: '蘑菇炒牛肉', id: 19, category: '荤菜'},
            {name: '香煎鸡胸肉', id: 20, category: '荤菜'},
            {name: '白灼虾', id: 21, category: '荤菜'},
            {name: '辣子鸡', id: 22, category: '荤菜'},
            {name: '红烧鸡腿', id: 23, category: '荤菜'},
            {name: '煎鸡腿', id: 24, category: '荤菜'},
            {name: '芹菜炒肉丝', id: 25, category: '荤菜'},
            {name: '豆角烧土豆', id: 26, category: '素菜'},
            {name: '炒鸡蛋', id: 27, category: '素菜'},
            {name: '煎虾滑', id: 28, category: '荤菜'},
            {name: '煎牛排', id: 29, category: '荤菜'},
            {name: '番茄蛋花汤', id: 30, category: '汤'},
            {name: '鸡架汤', id: 31, category: '汤'},
            {name: '粉丝汤', id: 32, category: '汤'},
            {name: '羊肉汤', id: 33, category: '汤'},
            {name: '面', id: 34, category: '主食'},
            {name: '土豆粉', id: 35, category: '主食'},
            {name: '米线', id: 36, category: '主食'},
            {name: '麻辣烫', id: 37, category: '主食'},
            {name: '蛋炒饭', id: 38, category: '主食'},
            {name: '炒米粉', id: 39, category: '主食'},
            {name: '炒年糕', id: 40, category: '主食'},
            {name: '汤年糕', id: 41, category: '主食'},
            {name: '披萨', id: 42, category: '主食'},
            {name: '回锅肉', id: 43, category: '荤菜'},
            {name: '玉米烙', id: 44, category: '甜品'},
            {name: '血糯米糕', id: 45, category: '甜品'},
            {name: '绿豆汤', id: 46, category: '甜品'},
            {name: '麦芬', id: 47, category: '甜品'},
            {name: '虾饺', id: 48, category: '主食'},
            {name: '酱香饼', id: 49, category: 'melon特供'},
            {name: '煲仔饭', id: 50, category: 'melon特供'},
            {name: '火锅', id: 51, category: 'melon特供'},
            {name: '羊蝎子锅', id: 52, category: 'melon特供'},
            {name: '金汤肥牛', id: 53, category: '荤菜'},
            {name: '煎火腿肠', id: 54, category: '荤菜'},
            {name: '干锅花菜', id: 55, category: '素菜'}
        ]
    },

    getCurrentCategory: function(e) {
        let index = e.currentTarget.dataset.index;
        let category = this.data.categories[index].name;

        let selectedRecipe = [];
        this.data.recipes.forEach(function(item, index){
            if (item.category === category) {
                selectedRecipe.push(item)
            }
        })
        this.setData({
            selectedRecipe: selectedRecipe
        })
    }
})