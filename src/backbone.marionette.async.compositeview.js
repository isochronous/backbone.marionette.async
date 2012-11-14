// Async Composite View
// --------------------

Async.CompositeView = {
  // Renders the model once, and the collection once. Calling
  // this again will tell the model's view to re-render itself
  // but the collection will not re-render.
    render: function(opts) {
        var that = this,
            options = opts || {},
            compositeRendered = $.Deferred();

        this.isClosed = false;

        this.resetItemViewContainer();

        var modelIsRendered = this.renderModel(options);
        $.when(modelIsRendered).then(function(html) {
            that.$el.html(html);
            that.bindUIElements();
            that.triggerMethod("composite:model:rendered");
            that.triggerMethod("render");

            var collectionIsRendered = that.renderCollection();
            $.when(collectionIsRendered).then(function() {
                compositeRendered.resolve();
            });
        });

        compositeRendered.done(function() {
            that.triggerMethod("composite:rendered");
        });

        return compositeRendered.promise();
    },

    // Modified: Had to add an override for renderModel because it
    // sends the wrong parameters to Renderer.render
    renderModel: function(opts) {
        var speck = this.getTemplate(),
            options = opts || {};
        return Marionette.Renderer.render(speck, this, options);
    },

    // Render the collection for the composite view
    renderCollection: function() {
        var collectionDeferred = Marionette.CollectionView.prototype.render.apply(this, arguments);
        collectionDeferred.done(function() {
            this.triggerMethod("composite:collection:rendered");
        });
        return collectionDeferred.promise();
    }
};
