/**
 * Created by [username] on [date].
 * xxx
 */
NEJ.define([
    'pro/widget/module',
    './modules/page.js'
], function(Module, page, p) {
    var pro;

    p._$$IndexModule = NEJ.C();
    pro = p._$$IndexModule._$extend(Module);

    pro.__init = function(_options) {
        this.__supInit(_options);
    };

    p._$$IndexModule._$allocate();
});
