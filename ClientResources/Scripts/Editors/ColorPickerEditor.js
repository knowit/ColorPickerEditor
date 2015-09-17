define([
    "dojo/_base/array",
    "dojo/query",
    "dojo/on",
    "dojo/_base/declare",
    "dojo/_base/lang",

    "dijit/_CssStateMixin",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",

    "epi/epi",
    "epi/shell/widget/_ValueRequiredMixin"
],
function (
    array,
    query,
    on,
    declare,
    lang,

    _CssStateMixin,
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,

    epi,
    _ValueRequiredMixin
) {

    return declare("alloy.editors.ColorPickerEditor", [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _CssStateMixin, _ValueRequiredMixin], {

        templateString: "<div class=\"dijitInline\">\
                            <ul data-dojo-attach-point=\"colorPickerList\" class=\"colorPickerList\">\
                                <li><a href=\"#\" data-color=\"#7cb5ec\" style=\"background-color:#7cb5ec;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#434348\" style=\"background-color:#434348;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#90ed7d\" style=\"background-color:#90ed7d;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#f7a35c\" style=\"background-color:#f7a35c;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#8085e9\" style=\"background-color:#8085e9;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#f15c80\" style=\"background-color:#f15c80;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#e4d354\" style=\"background-color:#e4d354;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#8085e8\" style=\"background-color:#8085e8;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#8d4653\" style=\"background-color:#8d4653;\"><span>Color name 1</span></a></li>\
                                <li><a href=\"#\" data-color=\"#91e8e1\" style=\"background-color:#91e8e1;\"><span>Color name 1</span></a></li>\
                            </ul>\
                        </div>",
        intermediateChanges: false,
        value: null,
        pickedColor: null,
        onChange: function (value) {
            // Event
        },
        postCreate: function () {

            this.inherited(arguments);
            this._loadCssFile();

            this.pickedColor = this.value;
            this._bindEvents(this);
        },
        startup: function () {
            this._markChosenColorInList(this.pickedColor);
        },
        isValid: function () {
            return !this.required || lang.isArray(this.value) && this.value.length > 0 && this.value.join() != "";
        },
        _setValueAttr: function (value) {
            this._setValue(value, true);
        },
        _setReadOnlyAttr: function (value) {
            this._set("readOnly", value);
        },
        _setIntermediateChangesAttr: function (value) {

            this._set("intermediateChanges", value);
        },
        _markChosenColorInList: function (value) {

            var listItems = query(this.colorPickerList).query("li");
            var tmpColor = "";
            for (var i = 0; i < listItems.length; i++) {
                tmpColor = query(listItems[i]).query("a")[0].getAttribute("data-color");
                if (value == tmpColor) {
                    listItems[i].setAttribute("class", "selectedColor");
                } else {
                    listItems[i].setAttribute("class", "");
                }
            }
        },
        _bindEvents: function (myself) {
            
            on(query(this.colorPickerList).query("a"), "click", function (e) {
                myself._chooseColor(e.currentTarget, myself);
                myself._markChosenColorInList(e.currentTarget.getAttribute("data-color"));

                e.preventDefault();
            });

        },
        _chooseColor: function(clickedItem, myself) {
            var color = clickedItem.getAttribute("data-color");
            myself._setValue(color, true);
        },
        _setValue: function (value, updateTextbox) {
            //avoids running this if the widget already is started
            if (this._started && epi.areEqual(this.value, value)) {
                return;
            }

            // set value to this widget (and notify observers). 
            this._set("value", value);

            // set value to tmp value
            if (updateTextbox) {
                this.pickedColor = value;
            }

            if (this._started && this.validate()) {
                // Trigger change event
                this.onChange(value);
            }
        },
        _loadCssFile: function () {
            var $ = document;
            var cssId = 'ColorPicker';
            if (!$.getElementById(cssId)) {
                var head = $.getElementsByTagName('head')[0];
                var link = $.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = '/ClientResources/Scripts/Editors/themes/ColorPickerEditor.css';
                link.media = 'all';
                head.appendChild(link);
            }
        }
    });
});

