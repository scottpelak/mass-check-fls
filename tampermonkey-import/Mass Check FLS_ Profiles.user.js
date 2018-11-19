// ==UserScript==
// @name        Mass Check FLS: Profiles
// @description Adds checkbox in FLS Read and Edit column headers in Enhanced Profiles to mass check selections
// @author      Scott Pelak
// @match       https://*.salesforce.com/*e?s=ObjectsAndTabs*
// @match       https://trade--cops.lightning.force.com/lightning/setup/EnhancedProfiles/page?*%3DObjectsAndTabs%26o%3D*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==
"use strict";
(function ($, undefined) {
    $(function () {
        var checkAll = function(columns, input) {
            var checkboxColumns = [];
            for(var i = 0; i < columns.length; i ++) {
                checkboxColumns.push('input[id$="fls_' + columns[i] + '_ck"]:not(:disabled)');
            }
            var isChecked = $(input).prop('checked');
            $('table.detailList table.list tbody').find(checkboxColumns.join(',')).prop('checked', isChecked);
        };

        // Add Mass check for Read
        $('table.detailList table.list thead tr.headerRow th[id$="fls_readheader"] div[id$="sortDiv"]').prepend('<input type="checkbox" id="fls_readheader-check-all"/>&nbsp;');

        $('input#fls_readheader-check-all').click(function(event){
            checkAll(['read'], event.target);
        })

        // Add Mass check for Edit
        $('table.detailList table.list thead tr.headerRow th[id$="fls_editheader"] div[id$="sortDiv"]').prepend('<input type="checkbox" id="fls_editheader-check-all"/>&nbsp;');

        $('input#fls_editheader-check-all').click(function(event) {
            checkAll(['read', 'edit'], event.target);
            $('input#fls_readheader-check-all').prop('checked', $(event.target).prop('checked'));
        });
    });
})(window.jQuery.noConflict(true));