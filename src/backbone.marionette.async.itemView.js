// Async ItemView
// --------------

// An asynchronous rendering method for the `ItemView`. This method
// assumes template loading, data serialization, `beforeRender`, and
// `onRender` functions are all asynchronous, using `jQuery.Deferred()`
// and `jQuery.when(...).then(...)` to manage async calls.
Async.ItemView = {
    render: function(opts) {
        var that = this,
            options = opts || {},
            deferredRender = $.Deferred();

        var beforeRenderDone = function() {
            that.triggerMethod("before:render", that);
            that.triggerMethod("item:before:render", that);

            var deferredData = that.serializeData();
            $.when(deferredData).then(dataSerialized);
        };

        var dataSerialized = function(data) {
            var template = that.getTemplate();
            var asyncRender = Marionette.Renderer.render(template, that, options);
            $.when(asyncRender).then(templateRendered);
        };

        var templateRendered = function(html) {
            //If either of these are true then $el's HTML has already been updated
            if (!options.replace && !options.update) {
                that.$el.html(html);
            }
            that.bindUIElements();
            callDeferredMethod(that.onRender, onRenderDone, that);
        };

        var onRenderDone = function() {
            that.triggerMethod("render", that);
            that.triggerMethod("item:rendered", that);

            deferredRender.resolve();
        };

        callDeferredMethod(this.beforeRender, beforeRenderDone, this);

        return deferredRender.promise();
    }
};
