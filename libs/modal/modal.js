/**
 * @Author: jecyu
 * @Date: 2017-12-05 10:09:11 am 
 * @Modified By: jecyu 
 * @Last Modified time: 2017-12-06 11:42:30 am 
 */
/**
 * modal 
 * @param modalId {string} modal元素id
 */
function modal(modalId) {
    this.id = modalId;
    this.element = document.querySelector('#' + modalId);
}

modal.prototype = {
    constructor: modal,
    /**
     * 显示Modal
     * @param modal {object} modal元素 
     */
    show: function(modal) {
        if (modal.style.display === 'none') {
            console.log('display');
        }
        modal.style.display = 'block';
    },
    /**
     * 隐藏Modal
     * @param modal {object} modal元素
     */
    hide: function(modal) {
        if (modal.style.display === 'block') {
        }
        modal.style.display = 'none';
    }
    
}





