(function ()
{
    var runnable = document.querySelectorAll(".runkit");

    if (runnable.length <= 0)
        return;

    var script = document.createElement("script");
    
    script.onload = function ()
    {
        for (var index = 0; index < runnable.length; ++index)
        {
            var element = runnable.item(index).parentNode;
            var source = RunKit.sourceFromElement(element);
            var onLoad = function ()
            {
                var childNodes = element.childNodes;
                var index = childNodes.length - 1;

                for (; index >= 0; --index)
                    if (childNodes[index].tagName !== "IFRAME")
                        element.removeChild(childNodes[index]);
            }

            RunKit.createNotebook({ element: element, source: source, onLoad: onLoad });
        }
    }

    script.src = "https://embed.runkit.com";

    document.body.append(script);
})();
