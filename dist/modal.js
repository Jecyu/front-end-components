(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.modal = factory());
}(this, function () { 'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "/**\n * @Author: jecyu\n * @Date: 2017-12-05 3:56:37 pm \n * @Modified By: jeCyu \n * @Last Modified time: 2017-12-05 6:20:05 pm \n */\n\n/* reset style */\n\nbody, html {\n    width: 100%;\n    height: 100%;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\n.mod {\n    width: 100%;\n    height: 500px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.mod:nth-child(1) {\n    background: lavender;\n}\n\n.mod:nth-child(2) {\n    background: lightsalmon;\n}\n\n.mod:nth-child(3) {\n    background: lightblue;\n}\n\n.mod:nth-child(4) {\n    background: lightcoral;\n}\n\n.mod:nth-child(5) {\n    background: lightseagreen;\n}\n\n.btn {\n    background: none;\n    border: 0;\n    outline: none;\n    cursor: pointer;\n}\n\n.btn-primary {\n    display: block;\n    height: 48px;\n    margin-bottom: 14px;\n    padding: 5px;\n    border-radius: 4px;\n    font-size: 20px;\n    color: #fff;\n    background: #40d2c2;\n}\n\n\n.opera-btn {\n    display: block;\n    width: 100%;\n    height: 48px;\n    margin-bottom: 14px;\n    border-radius: 4px;\n    font-size: 20px;\n    color: #fff;\n    background: #40d2c2;\n}\n\n\n\n\n\n/* modal */\n.modal {\n    display: none;\n    position: fixed;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    z-index: 999;\n\n    box-sizing: border-box;\n    background: rgba(56, 56, 56, 0.6);\n}\n\n.modal .modal-dialog {\n    position: absolute;\n    z-index: 999;\n    left: 50%;\n    top: 20%;\n    transform: translate(-50%);\n    width: 400px;\n    height: 362px;\n    background: #fff;\n}\n\n.modal-header {\n    position: relative;\n    padding: 0 30px 0 60px;\n    background: #f7f7f7 url(../images/site-logo.png) no-repeat 10px center;\n    background-size: 50px;\n}\n\n.modal-header .modal-title {\n    height: 50px;\n    margin: 0;\n\n    line-height: 50px;\n    font-size: 20px;\n    font-weight: normal;\n    color: #4c4c4c;\n}\n\n\n.modal-header .close {\n    position: absolute;\n    right: 0;\n    top: 0;\n\n    padding: 0 5px;\n    font-size: 40px;\n    color: #bababa;\n}\n\n.modal-body {\n    margin: 54px 20px 28px 20px;\n}\n\n.modal-body .user-item {\n    position: relative;\n}\n\n.modal-body .user-item+.user-item {\n    margin-top: 14px;\n}\n\n.modal-body .user-item .user-label {\n    position: absolute;\n    font-size: 20px;\n    color: #bcbcbc;\n    cursor: pointer;\n}\n\n.modal .user-label .user-icon {\n    position: absolute;\n    top: 8px;\n    left: 12px;\n    font-size: 20px;\n}\n\n.modal .user-label .close {\n    position: absolute;\n    transform: translateY(-50%);\n}\n\n.modal-body .user-item .reset {\n    position: absolute;\n    right: 10px;\n    top: 8px;\n    font-size: 20px;\n    color: #4c4c4c;\n}\n\n.modal-body .user-item .user-content {\n    width: 360px;\n    height: 42px;\n    padding: 0 40px;\n    font-size: 20px;\n    box-sizing: border-box;\n    outline: none;\n}\n\n.modal-footer {\n    margin: 0 20px;\n}\n\n.modal-footer .footer-above {\n    margin-top: 28px;\n    text-align: right;\n    font-size: 14px;\n}\n\n.modal-footer .select-container {\n    float: left;\n    color: #4c4c4c;\n}\n\n.modal-footer .select-container .user-label {\n    vertical-align: middle;\n    cursor: pointer;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n}\n\n.modal-footer .select-container .user-content {\n    width: 15px;\n    height: 15px;\n    vertical-align: middle;\n    border: 1px solid #585858;\n    background: #fff;\n    cursor: pointer;\n}\n\ninput[type=\"checkbox\"] {\n    outline: none;\n    /* -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none; */\n}\n\n.footer-below {\n    margin-top: 14px;\n    text-align: right;\n    font-size: 14px;\n}\n\n.modal-footer .link {\n    color: #40d2c2;\n    text-decoration: none;\n}\n\n\n";
  styleInject(css);

  /**
   * @Author: jecyu
   * @Date: 2017-12-05 10:09:11 am 
   * @Modified By: jecyu 
   * @Last Modified time: 2017-12-06 11:42:30 am 
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
          if (modal.style.display === 'block') ;
          modal.style.display = 'none';
      }
      
  };

  return modal;

}));
//# sourceMappingURL=modal.js.map
