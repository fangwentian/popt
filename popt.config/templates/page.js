/**
 * Created by xxx on 2017-07-01.
 * xxx
 */
NEJ.define([
    'pro/extend/util',                    // 对应对象_  (平台封装工具函数)
    'pro/widget/BaseComponent',           // 对应对象BaseComponent
    'text!./page.html',                   // 对应对象body
], function(_, BaseComponent, body, _p) {
    return BaseComponent.extend({
        template: body,
        name: 'wgt-main',
        config: function(data) {
            _.extend(data, {

            })
            this.supr(data);
        },
        init: function(data) {
            this.supr(data);
        }
    });
});