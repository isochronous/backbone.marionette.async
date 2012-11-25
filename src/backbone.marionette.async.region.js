// Async Region
// ------------

// Show a view that is rendered asynchronously, waiting for the view
// to be rendered before swaping it in.
Async.Region = {
    show: function(view, options) {
        var that = this,
            renderComplete,
            asyncShow = $.Deferred();

        options = options || {};

        var afterRender = function() {
            that.open(view);

            Marionette.triggerMethod.call(view, "show");
            Marionette.triggerMethod.call(that, "show", view);

            asyncShow.resolve();
        };

        this.ensureEl();
        this.close();

        renderComplete = view.render(options);

        // Wait for the view to finish rendering
        $.when(renderComplete).then(afterRender);

        this.currentView = view;

        return asyncShow.promise();
    }
};
