(function ()
{
    if (window.NodeList && !NodeList.prototype.forEach)
        NodeList.prototype.forEach = Array.prototype.forEach;

    var runnables = document.querySelectorAll(".runkit");

    if (runnables.length <= 0)
        return;

    var script = document.createElement("script");
    
    script.onload = function ()
    {
        runnables.forEach(function (runnable) {
            var elt = runnable.parentNode;
            var src = RunKit.sourceFromElement(elt);
            var onLoad = function() {
                for (var i = elt.childNodes.length - 1; i >= 0; i--)
                    if (elt.childNodes[i].tagName !== 'IFRAME')
                        elt.removeChild(elt.childNodes[i]);
            }
            RunKit.createNotebook({ element: elt, source: src, onLoad: onLoad });
        });
    }

    script.src = "https://embed.runkit.com";

    document.body.append(script);
})();
