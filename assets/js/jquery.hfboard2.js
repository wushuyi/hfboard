/**
 * Created by shuyi.wu on 2014/11/27.
 */
;(function (define) {
    'use strict';

    define(['jquery'], function ($) {

    })
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        // Node
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}));
