// Async Region
// ------------

// Show a view that is rendered asynchronously, waiting for the view
// to be rendered before swaping it in.
Async.Region = {
    show: function(view, options) {
        var that = this,
            opts = options || {},
            asyncShow = $.Deferred();

        this.ensureEl();
        this.close();

        // Wait for the view to finish rendering
        $.when(view.render(opts)).then(function() {
            that.open(view);

            Marionette.triggerMethod.call(view, "show");
            Marionette.triggerMethod.call(that, "show", view);

            asyncShow.resolve();
        });

        this.currentView = view;
        return asyncShow.promise();
    }
};
