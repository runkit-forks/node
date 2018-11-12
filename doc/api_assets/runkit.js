(function () {
    if (window.NodeList && !NodeList.prototype.forEach)
        NodeList.prototype.forEach = Array.prototype.forEach;

    var runnables = document.querySelectorAll(".runkit");

    if (runnables.length <= 0)
        return;

    var script = document.createElement("script");
    
    script.onload = function () {
        runnables.forEach(function (runnable) {
            var parent = runnable.parentNode;
            var wrapper = document.createElement('div');
            wrapper.style.position = 'absolute';
            wrapper.style.top = '0';
            wrapper.style.left = '-9999px';
            wrapper.className = 'runkit-wrapper';
            parent.insertBefore(wrapper, parent.firstChild);
            RunKit.createNotebook({
                element: wrapper,
                source: RunKit.sourceFromElement(parent),
                onLoad: function() {
                    for (var i = parent.childNodes.length - 1; i >= 0; i--) {
                        if (parent.childNodes[i].className !== 'runkit-wrapper') {
                            parent.removeChild(parent.childNodes[i]);
                        }
                    }
                    wrapper.style.cssText = '';
                },
                autoEval: true,
            });
        });
    }

    script.src = "https://embed.runkit.com";

    document.body.append(script);
})();
