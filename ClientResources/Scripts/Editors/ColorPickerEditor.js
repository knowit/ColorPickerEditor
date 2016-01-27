define([
    "dojo/_base/array",
    "dojo/query",
    "dojo/on",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",

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
    domConstruct,

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
                            </ul>\
                        </div>",
        intermediateChanges: false,
        value: null,
        pickedColor: null,
        onChange: function (value) {
            // Event
        },
        postCreate: function () {

            this._initColors();
            this.inherited(arguments);
            this._loadCssFile();

            this.pickedColor = this.value;
            this._bindEvents(this);
    
        },
        startup: function () {
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
                this._markChosenColorInList(this.pickedColor);
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
        },
        _initColors: function () {
            var colorPicker = this.colorPickerList;
            array.forEach(this.selections, function (selection) {
                domConstruct.create('a', { href: '#', title: selection.text, 'data-color': selection.value, style: 'background-color:' + selection.value + ';' }
                    , domConstruct.create('li', null, colorPicker));
            });
        }
    });
});

