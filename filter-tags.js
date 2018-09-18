var filterTags = (function () {

    function filterTags(form, options) {

        if (!document.querySelector) return;

        function addEvent(el, type, handler) {
            el.attachEvent ? 
                el.attachEvent('on' + type, handler) :
                el.addEventListener(type, handler);
        }

        function removeEvent(el, type, handler) {
            el.detachEvent ?
                el.detachEvent('on' + type, handler) :
                el.removeEventListener(type, handler);
        }

        function hasClass(el, className) {
            return el.classList ?
                el.classList.contains(className) :
                new RegExp('\\b' + className + '\\b').test(el.className);
        }

        var opts = {
            // collection: 0, // Nodelist
            tagZone: 0, // Node
            ignoreClass: 0, // Classes to be ignored while action
            useDefaultStyle: true,
            render: function(tag) {
                return '<div class="ft--tag"><span data-ft-val="' + tag + '">' + tag + '</span><span data-ft-remove></span></div>';
            }
        }

        for (var o in options) {
            if (options.hasOwnProperty(o)) {
                opts[o] = options[o];
            }
        }

        // INIT        
        if (!form || !(document.querySelector(form) instanceof HTMLFormElement)) {
            throw new Error('First obligatory param should be form with elems containig attribute "data-ft"');
        }

        var ignored;
        if (opts.ignoreClass !== 0) {
          if (typeof opts.ignoreClass === 'string') {
            ignored = [opts.ignoreClass]
          } else if (typeof ignoreClass === 'object') {
            ignored = opts.ignoreClass;
          }
        }

        ignored.forEach(function(className) {
            var nl = document.querySelectorAll(className);
            nl.forEach(function(el) {
                el.classList.add('ft--ignore');
                var insideEl = el.querySelectorAll('*');
                insideEl.forEach(function(i_el) {
                    i_el.classList.add('ft--ignore');
                });
            });
        });

        var tagZone = document.querySelector(opts.tagZone) || document.body.appendChild(document.createElement('div'));
        var form = document.querySelector(form);
        var triggers = form.querySelectorAll('input');

        var defaultStyle = '.ft--tag{font-size:.85em;padding:8px;line-height:16px;background-color:#f3f3f3;border-radius:5px;margin:3px 6px 3px 0;}.ft--tag [data-ft-remove]{width:14px;height:14px;display:inline-block;margin-left: 6px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAFVBMVEUAAABrcYNsc4BsdIBsc4Bsc4Bsc4C+18e+AAAABnRSTlMAFtTWx7jgNXjIAAAASklEQVQI12MIEWAAAkZXBjdDEEM4hUE4WQAoYGYIxIoMDEIgnlCSAKMakMMAJIFsIAMoBBIACwEF4Ay4FEIxXDvcQLgVcEvhzgAAi/IMn7LEUL8AAAAASUVORK5CYII=);background-size:contain;margin-bottom:-1px;}';

        if (opts.useDefaultStyle) {
            var style = form.appendChild(document.createElement('style'));
            style.innerHTML += defaultStyle;
        }

        triggers.forEach(function(t) {
            if (!t.getAttribute('data-ft')) {
                if (t.type === 'checkbox' || t.type === 'radio') {
                    var data = t.parentNode.innerText;
                    t.setAttribute('data-ft', data);
                    addEvent(t, 'change', function(event) {
                        event.stopImmediatePropagation();
                        return formHandler(event);
                    })
                }
            }
        })
        // TODO
        // var buffer = [];
        var selected = {};

        function renderer() {

            tagZone.innerHTML = '';

            for (var s in selected) {
                if (selected[s]) {
                    tagZone.innerHTML += opts.render(s);
                }
            }

        }

        function formHandler(event) {

            if (event.target.hasAttribute('data-ft-remove')) {
                tagzoneHandler(event)
            } else if (!event.target.classList.contains('ft--ignore')) {
                var action = setTimeout(function() {
                    for (var i = 0; i < triggers.length; i++) {
                        var that = triggers[i];
                        var data = that.hasAttribute('data-ft') ?
                            that.getAttribute('data-ft') :
                            that.placeholder ?
                                that.placeholder + ': ' + that.value :
                                that.value;
                        if (that.checked || (that.value && that.value !== 'on')) {
                            that.classList.add('ft--added');
                            selected[data] = that;
                        } else if (!that.checked) {
                          if (hasClass(that, 'ft--added')) {
                            that.classList.remove('ft--added');
                          }
                          if (selected[data]) {
                            delete selected[data];
                          }
                        }
                    }
                    renderer()
                }, 16);
            }
                // TODO: implement form submit handler (filter items)
            // }
        }

        function tagzoneHandler(event) {
            if (event.target.hasAttribute('data-ft-remove')) {
                var that = event.target.parentElement;
                var data = that.querySelector('[data-ft-val]').getAttribute('data-ft-val');
                
                if (selected.hasOwnProperty(data)) {
                    selected[data] = undefined;
                    delete selected[data];
                }
            }
            renderer();
        }

        addEvent(form, 'click', formHandler);
        addEvent(form, 'submit', function(e) {
            e.preventDefault;
            formHandler(e);
        });
        addEvent(form, 'keyup', function(e) {
            e.preventDefault;
            if (e.keyCode === 13) {
                formHandler(e);
            }            
        });
        addEvent(tagZone, 'click', tagzoneHandler);

    }

    return filterTags;
})();

(function() {
    if (typeof define === "function" && define.amd) {
        define('filterTags', function() { return filterTags; });
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = filterTags;
    } else {
        window.filterTags = filterTags;
    }
})();
