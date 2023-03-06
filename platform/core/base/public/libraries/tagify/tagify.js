/**
 * Tagify (v 3.7.2)- tags input component
 * By Yair Even-Or
 * Don't sell this code. (c)
 * https://github.com/yairEO/tagify
 */
!(function (t, e) {
    "function" == typeof define && define.amd
        ? define([], e)
        : "object" == typeof exports
        ? (module.exports = e())
        : (t.Tagify = e());
})(this, function () {
    "use strict";
    function g(e, t) {
        var i = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var s = Object.getOwnPropertySymbols(e);
            t &&
                (s = s.filter(function (t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                i.push.apply(i, s);
        }
        return i;
    }
    function u(t, e, i) {
        return (
            e in t
                ? Object.defineProperty(t, e, {
                      value: i,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                  })
                : (t[e] = i),
            t
        );
    }
    function p(t) {
        return (
            (function (t) {
                if (Array.isArray(t)) {
                    for (var e = 0, i = new Array(t.length); e < t.length; e++)
                        i[e] = t[e];
                    return i;
                }
            })(t) ||
            (function (t) {
                if (
                    Symbol.iterator in Object(t) ||
                    "[object Arguments]" === Object.prototype.toString.call(t)
                )
                    return Array.from(t);
            })(t) ||
            (function () {
                throw new TypeError(
                    "Invalid attempt to spread non-iterable instance"
                );
            })()
        );
    }
    var e = "undefined" != typeof InstallTrigger;
    function f(t) {
        var e = Object.prototype.toString.call(t).split(" ")[1].slice(0, -1);
        return (
            t === Object(t) &&
            "Array" != e &&
            "Function" != e &&
            "RegExp" != e &&
            "HTMLUnknownElement" != e
        );
    }
    function d(t) {
        var e = document.createElement("div");
        return t.replace(/\&#?[0-9a-z]+;/gi, function (t) {
            return (e.innerHTML = t), e.innerText;
        });
    }
    function n(t) {
        return new DOMParser().parseFromString(
            t.trim(),
            "text/html"
        ).body.firstElementChild;
    }
    function h(t) {
        return t
            ? t
                  .replace(/\>[\r\n ]+\</g, "><")
                  .replace(/(<.*?>)|\s+/g, function (t, e) {
                      return e || " ";
                  })
            : "";
    }
    function a(t) {
        return t
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/`|'/g, "&#039;");
    }
    function c(t, e, i) {
        function s(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) &&
                    (f(e[i])
                        ? f(t[i])
                            ? s(t[i], e[i])
                            : (t[i] = Object.assign({}, e[i]))
                        : (t[i] = e[i]));
        }
        return t instanceof Object || (t = {}), s(t, e), i && s(t, i), t;
    }
    function m(t) {
        return String.prototype.normalize
            ? "string" == typeof t
                ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                : void 0
            : t;
    }
    function t(t, e) {
        if (!t)
            return console.warn("Tagify: ", "invalid input element ", t), this;
        this.applySettings(t, e || {}),
            (this.state = {
                editing: !1,
                actions: {},
                mixMode: {},
                dropdown: {},
                flaggedTags: {},
            }),
            (this.value = []),
            (this.listeners = {}),
            (this.DOM = {}),
            c(this, new this.EventDispatcher(this)),
            this.build(t),
            this.getCSSVars(),
            this.loadOriginalValues(),
            this.events.customBinding.call(this),
            this.events.binding.call(this),
            t.autofocus && this.DOM.input.focus();
    }
    return (
        (t.prototype = {
            isIE: window.document.documentMode,
            TEXTS: {
                empty: "empty",
                exceed: "number of tags exceeded",
                pattern: "pattern mismatch",
                duplicate: "already exists",
                notAllowed: "not allowed",
            },
            DEFAULTS: {
                delimiters: ",",
                pattern: null,
                maxTags: 1 / 0,
                callbacks: {},
                addTagOnBlur: !0,
                duplicates: !1,
                whitelist: [],
                blacklist: [],
                enforceWhitelist: !1,
                keepInvalidTags: !1,
                mixTagsAllowedAfter: /,|\.|\:|\s/,
                mixTagsInterpolator: ["[[", "]]"],
                backspace: !0,
                skipInvalid: !1,
                editTags: 2,
                transformTag: function () {},
                autoComplete: { enabled: !0, rightKey: !1 },
                dropdown: {
                    classname: "",
                    enabled: 2,
                    maxItems: 10,
                    searchKeys: [],
                    fuzzySearch: !0,
                    accentedSearch: !0,
                    highlightFirst: !1,
                    closeOnSelect: !0,
                    position: "all",
                },
            },
            templates: {
                wrapper: function (t, e) {
                    return '<tags class="tagify '
                        .concat(e.mode ? "tagify--" + e.mode : "", " ")
                        .concat(t.className, '"\n                        ')
                        .concat(
                            e.readonly ? "readonly" : "",
                            '\n                        tabIndex="-1">\n                <span contenteditable data-placeholder="'
                        )
                        .concat(
                            e.placeholder || "&#8203;",
                            '" aria-placeholder="'
                        )
                        .concat(
                            e.placeholder || "",
                            '"\n                    class="tagify__input"\n                    role="textbox"\n                    aria-autocomplete="both"\n                    aria-multiline="'
                        )
                        .concat(
                            "mix" == e.mode,
                            '"></span>\n            </tags>'
                        );
                },
                tag: function (t, e) {
                    return '<tag title="'
                        .concat(
                            e.title || t,
                            "\"\n                        contenteditable='false'\n                        spellcheck='false'\n                        tabIndex=\"-1\"\n                        class=\"tagify__tag "
                        )
                        .concat(
                            e.class ? e.class : "",
                            '"\n                        '
                        )
                        .concat(
                            this.getAttributes(e),
                            ">\n                <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>\n                <div>\n                    <span class='tagify__tag-text'>"
                        )
                        .concat(
                            t,
                            "</span>\n                </div>\n            </tag>"
                        );
                },
                dropdown: function (t) {
                    var e = t.dropdown,
                        i = ""
                            .concat(
                                "manual" == e.position
                                    ? ""
                                    : "tagify__dropdown tagify__dropdown--".concat(
                                          e.position
                                      ),
                                " "
                            )
                            .concat(e.classname)
                            .trim();
                    return '<div class="'.concat(
                        i,
                        '" role="listbox" aria-labelledby="dropdown">\n                        <div class="tagify__dropdown__wrapper"></div>\n                    </div>'
                    );
                },
                dropdownItem: function (t) {
                    return "<div "
                        .concat(
                            this.getAttributes(t),
                            "\n                        class='tagify__dropdown__item "
                        )
                        .concat(
                            t.class ? t.class : "",
                            '\'\n                        tabindex="0"\n                        role="option">'
                        )
                        .concat(t.value, "</div>");
                },
            },
            customEventsList: [
                "add",
                "remove",
                "invalid",
                "input",
                "click",
                "keydown",
                "focus",
                "blur",
                "edit:input",
                "edit:updated",
                "edit:start",
                "edit:keydown",
                "dropdown:show",
                "dropdown:hide",
                "dropdown:select",
            ],
            applySettings: function (i, t) {
                var s = this;
                if (
                    ((this.DEFAULTS.templates = this.templates),
                    (this.settings = c({}, this.DEFAULTS, t)),
                    (this.settings.readonly = i.hasAttribute("readonly")),
                    (this.settings.placeholder =
                        i.getAttribute("placeholder") ||
                        this.settings.placeholder ||
                        ""),
                    this.isIE && (this.settings.autoComplete = !1),
                    ["whitelist", "blacklist"].forEach(function (t) {
                        var e = i.getAttribute("data-" + t);
                        e &&
                            (e = e.split(s.settings.delimiters)) instanceof
                                Array &&
                            (s.settings[t] = e);
                    }),
                    "autoComplete" in t &&
                        !f(t.autoComplete) &&
                        ((this.settings.autoComplete =
                            this.DEFAULTS.autoComplete),
                        (this.settings.autoComplete.enabled = t.autoComplete)),
                    i.pattern)
                )
                    try {
                        this.settings.pattern = new RegExp(i.pattern);
                    } catch (t) {}
                if (this.settings.delimiters)
                    try {
                        this.settings.delimiters = new RegExp(
                            this.settings.delimiters,
                            "g"
                        );
                    } catch (t) {}
                "select" == this.settings.mode &&
                    (this.settings.dropdown.enabled = 0),
                    "mix" == this.settings.mode &&
                        (this.settings.autoComplete.rightKey = !0);
            },
            getAttributes: function (t) {
                if ("[object Object]" != Object.prototype.toString.call(t))
                    return "";
                var e,
                    i,
                    s = Object.keys(t),
                    n = "";
                for (i = s.length; i--; )
                    "class" != (e = s[i]) &&
                        t.hasOwnProperty(e) &&
                        t[e] &&
                        (n += " " + e + (t[e] ? '="'.concat(t[e], '"') : ""));
                return n;
            },
            getCaretGlobalPosition: function () {
                var t = document.getSelection();
                if (t.rangeCount) {
                    var e,
                        i,
                        s = t.getRangeAt(0),
                        n = s.startContainer,
                        a = s.startOffset;
                    return 0 < a
                        ? ((i = document.createRange()).setStart(n, a - 1),
                          i.setEnd(n, a),
                          {
                              left: (e = i.getBoundingClientRect()).right,
                              top: e.top,
                              bottom: e.bottom,
                          })
                        : n.getBoundingClientRect();
                }
                return { left: -9999, top: -9999 };
            },
            getCSSVars: function () {
                var t,
                    e,
                    i,
                    s = getComputedStyle(this.DOM.scope, null);
                this.CSSVars = {
                    tagHideTransition:
                        ((t = (function (t) {
                            if (!t) return {};
                            var e = (t = t.trim().split(" ")[0])
                                .split(/\d+/g)
                                .filter(function (t) {
                                    return t;
                                })
                                .pop()
                                .trim();
                            return {
                                value: +t
                                    .split(e)
                                    .filter(function (t) {
                                        return t;
                                    })[0]
                                    .trim(),
                                unit: e,
                            };
                        })(
                            ((i = "tag-hide-transition"),
                            s.getPropertyValue("--" + i))
                        )),
                        (e = t.value),
                        "s" == t.unit ? 1e3 * e : e),
                };
            },
            build: function (t) {
                var e = this.DOM,
                    i = this.settings.templates.wrapper(t, this.settings);
                (e.originalInput = t),
                    (e.scope = n(i)),
                    (e.input = e.scope.querySelector("[contenteditable]")),
                    t.parentNode.insertBefore(e.scope, t),
                    0 <= this.settings.dropdown.enabled &&
                        this.dropdown.init.call(this);
            },
            destroy: function () {
                this.DOM.scope.parentNode.removeChild(this.DOM.scope),
                    this.dropdown.hide.call(this, !0),
                    clearTimeout(this.dropdownHide__bindEventsTimeout);
            },
            loadOriginalValues: function (t) {
                if ((t = t || this.DOM.originalInput.value))
                    if ((this.removeAllTags(), "mix" == this.settings.mode))
                        this.parseMixTags(t.trim());
                    else {
                        try {
                            "string" != typeof JSON.parse(t) &&
                                (t = JSON.parse(t));
                        } catch (t) {}
                        this.addTags(t).forEach(function (t) {
                            return t && t.classList.add("tagify--noAnim");
                        });
                    }
            },
            cloneEvent: function (t) {
                var e = {};
                for (var i in t) e[i] = t[i];
                return e;
            },
            EventDispatcher: function (n) {
                var a = document.createTextNode("");
                function i(e, t, i) {
                    i &&
                        t.split(/\s+/g).forEach(function (t) {
                            return a[e + "EventListener"].call(a, t, i);
                        });
                }
                (this.off = function (t, e) {
                    return i("remove", t, e), this;
                }),
                    (this.on = function (t, e) {
                        return (
                            e && "function" == typeof e && i("add", t, e), this
                        );
                    }),
                    (this.trigger = function (t, e) {
                        var i;
                        if (t)
                            if (n.settings.isJQueryPlugin)
                                "remove" == t && (t = "removeTag"),
                                    jQuery(n.DOM.originalInput).triggerHandler(
                                        t,
                                        [e]
                                    );
                            else {
                                try {
                                    var s = c({}, e);
                                    (s.tagify = this),
                                        (i = new CustomEvent(t, { detail: s }));
                                } catch (t) {
                                    console.warn(t);
                                }
                                a.dispatchEvent(i);
                            }
                    });
            },
            loading: function (t) {
                return (
                    (this.state.isLoading = t),
                    this.DOM.scope.classList[t ? "add" : "remove"](
                        "tagify--loading"
                    ),
                    this
                );
            },
            toggleFocusClass: function (t) {
                this.DOM.scope.classList.toggle("tagify--focus", !!t);
            },
            events: {
                customBinding: function () {
                    var e = this;
                    this.customEventsList.forEach(function (t) {
                        e.on(t, e.settings.callbacks[t]);
                    });
                },
                binding: function (t) {
                    var e,
                        i = !(0 < arguments.length && void 0 !== t) || t,
                        s = this.events.callbacks,
                        n = i ? "addEventListener" : "removeEventListener";
                    if (!this.state.mainEvents || !i)
                        for (var a in ((this.state.mainEvents = i) &&
                            !this.listeners.main &&
                            (this.DOM.input.addEventListener(
                                this.isIE ? "keydown" : "input",
                                s[this.isIE ? "onInputIE" : "onInput"].bind(
                                    this
                                )
                            ),
                            this.settings.isJQueryPlugin &&
                                jQuery(this.DOM.originalInput).on(
                                    "tagify.removeAllTags",
                                    this.removeAllTags.bind(this)
                                )),
                        (e = this.listeners.main =
                            this.listeners.main || {
                                focus: ["input", s.onFocusBlur.bind(this)],
                                blur: ["input", s.onFocusBlur.bind(this)],
                                keydown: ["input", s.onKeydown.bind(this)],
                                click: ["scope", s.onClickScope.bind(this)],
                                dblclick: [
                                    "scope",
                                    s.onDoubleClickScope.bind(this),
                                ],
                                paste: ["input", s.onPaste.bind(this)],
                            })))
                            ("blur" == a && !i) ||
                                this.DOM[e[a][0]][n](a, e[a][1]);
                },
                callbacks: {
                    onFocusBlur: function (t) {
                        var e = t.target ? t.target.textContent.trim() : "",
                            i = this.settings,
                            s = t.type,
                            n = 0 <= i.dropdown.enabled,
                            a = { relatedTarget: t.relatedTarget },
                            o =
                                t.relatedTarget &&
                                t.relatedTarget.classList.contains(
                                    "tagify__tag"
                                ) &&
                                this.DOM.scope.contains(t.relatedTarget),
                            r =
                                this.state.actions.selectOption &&
                                (n || !i.dropdown.closeOnSelect),
                            l = this.state.actions.addNew && n;
                        if (!o) {
                            if (
                                "blur" == s &&
                                t.relatedTarget === this.DOM.scope
                            )
                                return (
                                    this.dropdown.hide.call(this),
                                    void this.DOM.input.focus()
                                );
                            if (!r && !l)
                                if (
                                    ((this.state.hasFocus =
                                        "focus" == s && +new Date()),
                                    this.toggleFocusClass(this.state.hasFocus),
                                    this.setRangeAtStartEnd(!1),
                                    "mix" != i.mode)
                                ) {
                                    if ("focus" == s)
                                        return (
                                            this.trigger("focus", a),
                                            void (
                                                0 === i.dropdown.enabled &&
                                                this.dropdown.show.call(this)
                                            )
                                        );
                                    "blur" == s &&
                                        (this.trigger("blur", a),
                                        this.loading(!1),
                                        ("select" == this.settings.mode
                                            ? !this.value.length ||
                                              this.value[0].value != e
                                            : e &&
                                              !this.state.actions
                                                  .selectOption &&
                                              i.addTagOnBlur) &&
                                            this.addTags(e, !0)),
                                        this.DOM.input.removeAttribute("style"),
                                        this.dropdown.hide.call(this);
                                } else if ("focus" == s) {
                                    if (this.fixFirefoxLastTagNoCaret()) return;
                                    this.trigger("focus", a);
                                } else
                                    "blur" == t.type &&
                                        (this.trigger("blur", a),
                                        this.loading(!1),
                                        this.dropdown.hide.call(this),
                                        (this.state.dropdown.visible = void 0));
                        }
                    },
                    onKeydown: function (t) {
                        var s = this,
                            e = t.target.textContent.trim();
                        if (
                            (this.trigger("keydown", {
                                originalEvent: this.cloneEvent(t),
                            }),
                            "mix" == this.settings.mode)
                        ) {
                            switch (t.key) {
                                case "Left":
                                case "ArrowLeft":
                                    this.state.actions.ArrowLeft = !0;
                                    break;
                                case "Delete":
                                case "Backspace":
                                    if (this.state.editing) return;
                                    var i = document.getSelection(),
                                        n =
                                            "Delete" == t.key &&
                                            i.anchorOffset ==
                                                i.anchorNode.length,
                                        a =
                                            1 == i.anchorNode.nodeType ||
                                            (!i.anchorOffset &&
                                                i.anchorNode
                                                    .previousElementSibling),
                                        o = d(this.DOM.input.innerHTML),
                                        r = this.getTagElms();
                                    if (
                                        (3 == i.anchorNode.nodeType &&
                                            !i.anchorNode.nodeValue &&
                                            i.anchorNode
                                                .previousElementSibling &&
                                            t.preventDefault(),
                                        (a || n) && !this.settings.backspace)
                                    )
                                        return void t.preventDefault();
                                    setTimeout(function () {
                                        var t = d(s.DOM.input.innerHTML);
                                        if (
                                            ((i.anchorNode == s.DOM.input &&
                                                t.length == o.length) ||
                                                (!i.anchorOffset &&
                                                    t.length >= o.length)) &&
                                            (s.removeTag(
                                                i.anchorNode
                                                    .previousElementSibling
                                            ),
                                            s.fixFirefoxLastTagNoCaret(),
                                            2 == s.DOM.input.children.length &&
                                                "BR" ==
                                                    s.DOM.input.children[1]
                                                        .tagName)
                                        )
                                            return (
                                                (s.DOM.input.innerHTML = ""),
                                                !(s.value.length = 0)
                                            );
                                        s.value = [].map
                                            .call(r, function (t, e) {
                                                var i = t.__tagifyTagData;
                                                if (t.parentNode) return i;
                                                s.trigger("remove", {
                                                    tag: t,
                                                    index: e,
                                                    data: i,
                                                });
                                            })
                                            .filter(function (t) {
                                                return t;
                                            });
                                    }, 50);
                            }
                            return !0;
                        }
                        switch (t.key) {
                            case "Backspace":
                                this.state.dropdown.visible ||
                                    ("" != e && 8203 != e.charCodeAt(0)) ||
                                    (!0 === this.settings.backspace
                                        ? this.removeTag()
                                        : "edit" == this.settings.backspace &&
                                          setTimeout(
                                              this.editTag.bind(this),
                                              0
                                          ));
                                break;
                            case "Esc":
                            case "Escape":
                                if (this.state.dropdown.visible) return;
                                t.target.blur();
                                break;
                            case "Down":
                            case "ArrowDown":
                                this.state.dropdown.visible ||
                                    this.dropdown.show.call(this);
                                break;
                            case "ArrowRight":
                                var l =
                                    this.state.inputSuggestion ||
                                    this.state.ddItemData;
                                if (l && this.settings.autoComplete.rightKey)
                                    return void this.addTags([l], !0);
                                break;
                            case "Tab":
                                if (!e || "select" == this.settings.mode)
                                    return !0;
                            case "Enter":
                                t.preventDefault(),
                                    setTimeout(function () {
                                        s.state.actions.selectOption ||
                                            s.addTags(e, !0);
                                    });
                        }
                    },
                    onInput: function (t) {
                        var e = this.input.normalize.call(this),
                            i = e.length >= this.settings.dropdown.enabled,
                            s = { value: e, inputElm: this.DOM.input };
                        if ("mix" == this.settings.mode)
                            return this.events.callbacks.onMixTagsInput.call(
                                this,
                                t
                            );
                        (s.isValid = this.validateTag({ value: e })),
                            this.trigger("input", s),
                            e
                                ? this.input.value != e &&
                                  (this.input.set.call(this, e, !1),
                                  -1 != e.search(this.settings.delimiters)
                                      ? this.addTags(e) &&
                                        this.input.set.call(this)
                                      : 0 <= this.settings.dropdown.enabled &&
                                        this.dropdown[i ? "show" : "hide"].call(
                                            this,
                                            e
                                        ))
                                : this.input.set.call(this, "");
                    },
                    onMixTagsInput: function () {
                        var t,
                            e,
                            i,
                            s,
                            n,
                            a,
                            o,
                            r,
                            l = this,
                            d = this.settings;
                        if (this.value.length < this.getTagElms().length)
                            return (
                                (this.value = [].map.call(
                                    this.getTagElms(),
                                    function (t) {
                                        return t.__tagifyTagData;
                                    }
                                )),
                                void this.update()
                            );
                        if (this.hasMaxTags()) return !0;
                        if (
                            window.getSelection &&
                            0 < (o = window.getSelection()).rangeCount &&
                            3 == o.anchorNode.nodeType
                        ) {
                            if (
                                ((t = o.getRangeAt(0).cloneRange()).collapse(
                                    !0
                                ),
                                t.setStart(o.focusNode, 0),
                                (s =
                                    (e = t
                                        .toString()
                                        .slice(0, t.endOffset)).split(d.pattern)
                                        .length - 1),
                                (i = e.match(d.pattern)) &&
                                    (n = e.slice(
                                        e.lastIndexOf(i[i.length - 1])
                                    )),
                                n)
                            ) {
                                (this.state.actions.ArrowLeft = !1),
                                    (this.state.tag = {
                                        prefix: n.match(d.pattern)[0],
                                        value: n.replace(d.pattern, ""),
                                    }),
                                    (this.state.tag.baseOffset =
                                        o.baseOffset -
                                        this.state.tag.value.length),
                                    (a =
                                        this.state.tag.value.length >=
                                        d.dropdown.enabled);
                                try {
                                    (r =
                                        (r =
                                            this.state.flaggedTags[
                                                this.state.tag.baseOffset
                                            ]).prefix ==
                                            this.state.tag.prefix &&
                                        r.value[0] == this.state.tag.value[0]),
                                        this.state.flaggedTags[
                                            this.state.tag.baseOffset
                                        ] &&
                                            !this.state.tag.value &&
                                            delete this.state.flaggedTags[
                                                this.state.tag.baseOffset
                                            ];
                                } catch (t) {}
                                (r ||
                                    s <
                                        this.state.mixMode
                                            .matchedPatternCount) &&
                                    (a = !1);
                            } else this.state.flaggedTags = {};
                            this.state.mixMode.matchedPatternCount = s;
                        }
                        setTimeout(function () {
                            l.update(),
                                l.trigger(
                                    "input",
                                    c({}, l.state.tag, {
                                        textContent: l.DOM.input.textContent,
                                    })
                                ),
                                l.state.tag &&
                                    l.dropdown[a ? "show" : "hide"].call(
                                        l,
                                        l.state.tag.value
                                    );
                        }, 10);
                    },
                    onInputIE: function (t) {
                        var e = this;
                        setTimeout(function () {
                            e.events.callbacks.onInput.call(e, t);
                        });
                    },
                    onClickScope: function (t) {
                        var e = t.target.closest(".tagify__tag"),
                            i = this.settings,
                            s = new Date() - this.state.hasFocus;
                        if (t.target != this.DOM.scope) {
                            if (
                                !t.target.classList.contains(
                                    "tagify__tag__removeBtn"
                                )
                            )
                                return e
                                    ? (this.trigger("click", {
                                          tag: e,
                                          index: this.getNodeIndex(e),
                                          data: this.tagData(e),
                                          originalEvent: this.cloneEvent(t),
                                      }),
                                      void (
                                          1 == this.settings.editTags &&
                                          this.events.callbacks.onDoubleClickScope.call(
                                              this,
                                              t
                                          )
                                      ))
                                    : void (t.target == this.DOM.input &&
                                      500 < s
                                          ? this.state.dropdown.visible
                                              ? this.dropdown.hide.call(this)
                                              : 0 === i.dropdown.enabled &&
                                                "mix" != i.mode &&
                                                this.dropdown.show.call(this)
                                          : "select" == i.mode &&
                                            (this.state.dropdown.visible ||
                                                this.dropdown.show.call(this)));
                            this.removeTag(t.target.parentNode);
                        } else this.DOM.input.focus();
                    },
                    onPaste: function (t) {
                        var e;
                        t.preventDefault(),
                            (e = (
                                t.clipboardData || window.clipboardData
                            ).getData("Text")),
                            this.input.set.call(this, e);
                    },
                    onEditTagInput: function (t, e) {
                        var i = t.closest(".tagify__tag"),
                            s = this.getNodeIndex(i),
                            n = this.input.normalize.call(this, t),
                            a = n != t.originalValue,
                            o = this.validateTag({ value: n });
                        a || !0 !== t.originalIsValid || (o = !0),
                            i.classList.toggle("tagify--invalid", !0 !== o),
                            (i.__tagifyTagData.__isValid = o),
                            n.length >= this.settings.dropdown.enabled &&
                                ((this.state.editing.value = n),
                                this.dropdown.show.call(this, n)),
                            this.trigger("edit:input", {
                                tag: i,
                                index: s,
                                data: c({}, this.value[s], { newValue: n }),
                                originalEvent: this.cloneEvent(e),
                            });
                    },
                    onEditTagFocus: function (t) {
                        this.state.editing = {
                            scope: t,
                            input: t.querySelector("[contenteditable]"),
                        };
                    },
                    onEditTagBlur: function (t) {
                        if (
                            (this.state.hasFocus || this.toggleFocusClass(),
                            this.DOM.scope.contains(t))
                        ) {
                            var e = t.closest(".tagify__tag"),
                                i = this.input.normalize.call(this, t),
                                s = i,
                                n = s != t.originalValue,
                                a = c({}, e.__tagifyTagData, { value: s }),
                                o = this.validateTag(a);
                            if (!i)
                                return (
                                    this.removeTag(e),
                                    void this.onEditTagDone(null, a)
                                );
                            n
                                ? (this.settings.transformTag.call(this, a),
                                  !0 === (o = this.validateTag(a))
                                      ? this.onEditTagDone(e, a)
                                      : this.trigger("invalid", {
                                            data: a,
                                            tag: e,
                                            message: o,
                                        }))
                                : this.onEditTagDone(e, a);
                        }
                    },
                    onEditTagkeydown: function (t, e) {
                        switch (
                            (this.trigger("edit:keydown", {
                                originalEvent: this.cloneEvent(t),
                            }),
                            t.key)
                        ) {
                            case "Esc":
                            case "Escape":
                                (t.target.textContent = t.target.originalValue),
                                    (e.__tagifyTagData =
                                        e.__tagifyTagData.__originalData);
                            case "Enter":
                            case "Tab":
                                t.preventDefault(), t.target.blur();
                        }
                    },
                    onDoubleClickScope: function (t) {
                        var e,
                            i,
                            s = t.target.closest("tag"),
                            n = this.settings;
                        s &&
                            ((e = s.classList.contains(
                                "tagify__tag--editable"
                            )),
                            (i = s.hasAttribute("readonly")),
                            "select" == n.mode ||
                                n.readonly ||
                                e ||
                                i ||
                                !this.settings.editTags ||
                                this.editTag(s),
                            this.toggleFocusClass(!0),
                            this.trigger("dblclick", {
                                tag: s,
                                index: this.getNodeIndex(s),
                                data: this.tagData(s),
                            }));
                    },
                },
            },
            fixFirefoxLastTagNoCaret: function () {
                var t = this.DOM.input;
                if (e && t.childNodes.length && 1 == t.lastChild.nodeType)
                    return (
                        t.appendChild(document.createTextNode("")),
                        this.setRangeAtStartEnd(!0),
                        !0
                    );
            },
            editTag: function (e, t) {
                var i = this;
                t = t || {};
                var s = (e = e || this.getLastTag()).querySelector(
                        ".tagify__tag-text"
                    ),
                    n = this.getNodeIndex(e),
                    a = e.__tagifyTagData,
                    o = this.events.callbacks,
                    r = this,
                    l = !0;
                if (s) {
                    if (!(a instanceof Object && "editable" in a) || a.editable)
                        return (
                            (e.__tagifyTagData.__originalData = c({}, a)),
                            e.classList.add("tagify__tag--editable"),
                            (s.originalValue = s.textContent),
                            s.setAttribute("contenteditable", !0),
                            s.addEventListener(
                                "focus",
                                o.onEditTagFocus.bind(this, e)
                            ),
                            s.addEventListener("blur", function () {
                                (r.state.editing = !1),
                                    setTimeout(o.onEditTagBlur.bind(r), 0, s);
                            }),
                            s.addEventListener(
                                "input",
                                o.onEditTagInput.bind(this, s)
                            ),
                            s.addEventListener("keydown", function (t) {
                                return o.onEditTagkeydown.call(i, t, e);
                            }),
                            s.focus(),
                            this.setRangeAtStartEnd(!1, s),
                            t.skipValidation ||
                                (l = this.editTagToggleValidity(e, a.value)),
                            (s.originalIsValid = l),
                            this.trigger("edit:start", {
                                tag: e,
                                index: n,
                                data: a,
                                isValid: l,
                            }),
                            this
                        );
                } else
                    console.warn(
                        "Cannot find element in Tag template: ",
                        ".tagify__tag-text"
                    );
            },
            editTagToggleValidity: function (t) {
                var e,
                    i = t.__tagifyTagData;
                if (i)
                    return (
                        (e = !(!i.__isValid || 1 == i.__isValid)),
                        t.classList.toggle("tagify--invalid", e),
                        i.__isValid
                    );
                console.warn("tag has no data: ", t, i);
            },
            onEditTagDone: function (t, e) {
                var i = this;
                e = e || {};
                var s = { tag: t, index: this.getNodeIndex(t), data: e };
                this.trigger("edit:beforeUpdate", s),
                    delete e.__originalData,
                    t && (this.editTagToggleValidity(t), this.replaceTag(t, e)),
                    this.trigger("edit:updated", s),
                    this.dropdown.hide.call(this),
                    !0 === e.__isValid &&
                        this.getTagElms("tagify--notAllowed").forEach(function (
                            t
                        ) {
                            var e = i.validateTag(t.__tagifyTagData);
                            !0 === e &&
                                ((t.__tagifyTagData.__isValid = e),
                                delete i.state.editing.locked,
                                i.replaceTag(t));
                        });
            },
            replaceTag: function (t, e) {
                var i = this;
                (e && e.value) || (e = t.__tagifyTagData),
                    e.__isValid &&
                        1 != e.__isValid &&
                        c(e, this.getInvaildTagParams(e, e.__isValid));
                var s = this.createTagElem(e);
                this.state.editing.locked ||
                    ((this.state.editing = { locked: !0 }),
                    setTimeout(function () {
                        return delete i.state.editing.locked;
                    }, 500),
                    t.parentNode.replaceChild(s, t),
                    this.updateValueByDOMTags());
            },
            updateValueByDOMTags: function () {
                var e = this;
                (this.value = []),
                    [].forEach.call(this.getTagElms(), function (t) {
                        t.classList.contains("tagify--notAllowed") ||
                            e.value.push(t.__tagifyTagData);
                    }),
                    this.update();
            },
            setRangeAtStartEnd: function (e, i) {
                i = (i = i || this.DOM.input).lastChild || i;
                var s = document.getSelection();
                s.rangeCount &&
                    ["Start", "End"].forEach(function (t) {
                        return s.getRangeAt(0)["set" + t](i, e ? 0 : i.length);
                    });
            },
            input: {
                value: "",
                set: function (t, e) {
                    var i = 0 < arguments.length && void 0 !== t ? t : "",
                        s = !(1 < arguments.length && void 0 !== e) || e,
                        n = this.settings.dropdown.closeOnSelect;
                    (this.input.value = i),
                        s && (this.DOM.input.innerHTML = i),
                        !i &&
                            n &&
                            setTimeout(this.dropdown.hide.bind(this), 20),
                        this.input.autocomplete.suggest.call(this),
                        this.input.validate.call(this),
                        this.setRangeAtStartEnd();
                },
                validate: function () {
                    var t =
                        !this.input.value ||
                        this.validateTag({ value: this.input.value });
                    "select" == this.settings.mode
                        ? this.DOM.scope.classList.toggle(
                              "tagify--invalid",
                              !0 !== t
                          )
                        : this.DOM.input.classList.toggle(
                              "tagify__input--invalid",
                              !0 !== t
                          );
                },
                normalize: function (t) {
                    var e = t || this.DOM.input,
                        i = [];
                    e.childNodes.forEach(function (t) {
                        return 3 == t.nodeType && i.push(t.nodeValue);
                    }),
                        (i = i.join("\n"));
                    try {
                        i = i.replace(
                            /(?:\r\n|\r|\n)/g,
                            this.settings.delimiters.source.charAt(0)
                        );
                    } catch (t) {}
                    return (i = i.replace(/\s/g, " ").replace(/^\s+/, ""));
                },
                autocomplete: {
                    suggest: function (t) {
                        if (this.settings.autoComplete.enabled) {
                            "string" == typeof (t = t || {}) &&
                                (t = { value: t });
                            var e = t.value || "",
                                i = e
                                    .substr(0, this.input.value.length)
                                    .toLowerCase(),
                                s = e.substring(this.input.value.length);
                            e &&
                            this.input.value &&
                            i == this.input.value.toLowerCase()
                                ? (this.DOM.input.setAttribute(
                                      "data-suggest",
                                      s
                                  ),
                                  (this.state.inputSuggestion = t))
                                : (this.DOM.input.removeAttribute(
                                      "data-suggest"
                                  ),
                                  delete this.state.inputSuggestion);
                        }
                    },
                    set: function (t) {
                        var e = this.DOM.input.getAttribute("data-suggest"),
                            i = t || (e ? this.input.value + e : null);
                        return (
                            !!i &&
                            ("mix" == this.settings.mode
                                ? this.replaceTextWithNode(
                                      document.createTextNode(
                                          this.state.tag.prefix + i
                                      )
                                  )
                                : (this.input.set.call(this, i),
                                  this.setRangeAtStartEnd()),
                            this.input.autocomplete.suggest.call(this),
                            this.dropdown.hide.call(this),
                            !0)
                        );
                    },
                },
            },
            getTagIdx: function (e) {
                return this.value.findIndex(function (t) {
                    return JSON.stringify(t) == JSON.stringify(e);
                });
            },
            getNodeIndex: function (t) {
                var e = 0;
                if (t) for (; (t = t.previousElementSibling); ) e++;
                return e;
            },
            getTagElms: function () {
                for (
                    var t = arguments.length, e = new Array(t), i = 0;
                    i < t;
                    i++
                )
                    e[i] = arguments[i];
                var s = [".tagify__tag"].concat(e).join(".");
                return this.DOM.scope.querySelectorAll(s);
            },
            getLastTag: function () {
                var t = this.DOM.scope.querySelectorAll(
                    "tag:not(.tagify--hide):not([readonly])"
                );
                return t[t.length - 1];
            },
            tagData: function (t, e) {
                return (
                    e &&
                        (t.__tagifyTagData = c({}, t.__tagifyTagData || {}, e)),
                    t.__tagifyTagData
                );
            },
            isTagDuplicate: function (i) {
                return (
                    "select" != this.settings.mode &&
                    this.value.reduce(function (t, e) {
                        return i.trim().toLowerCase() === e.value.toLowerCase()
                            ? t + 1
                            : t;
                    }, 0)
                );
            },
            getTagIndexByValue: function (i) {
                var s = [];
                return (
                    this.getTagElms().forEach(function (t, e) {
                        t.textContent.trim().toLowerCase() == i.toLowerCase() &&
                            s.push(e);
                    }),
                    s
                );
            },
            getTagElmByValue: function (t) {
                var e = this.getTagIndexByValue(t)[0];
                return this.getTagElms()[e];
            },
            markTagByValue: function (t, e) {
                return (
                    !!(e = e || this.getTagElmByValue(t)) &&
                    (e.classList.add("tagify--mark"),
                    setTimeout(function () {
                        e.classList.remove("tagify--mark");
                    }, 100),
                    e)
                );
            },
            isTagBlacklisted: function (e) {
                return (
                    (e = e.toLowerCase().trim()),
                    this.settings.blacklist.filter(function (t) {
                        return e == t.toLowerCase();
                    }).length
                );
            },
            isTagWhitelisted: function (e) {
                return this.settings.whitelist.some(function (t) {
                    return "string" == typeof e
                        ? e.trim().toLowerCase() ===
                              (t.value || t).toLowerCase()
                        : JSON.stringify(t).toLowerCase() ===
                              JSON.stringify(e).toLowerCase();
                });
            },
            validateTag: function (t) {
                var e = t.value.trim(),
                    i = this.settings,
                    s = !0;
                return (
                    e
                        ? i.pattern &&
                          i.pattern instanceof RegExp &&
                          !i.pattern.test(e)
                            ? (s = this.TEXTS.pattern)
                            : !i.duplicates && this.isTagDuplicate(e)
                            ? (s = this.TEXTS.duplicate)
                            : (this.isTagBlacklisted(e) ||
                                  (i.enforceWhitelist &&
                                      !this.isTagWhitelisted(e))) &&
                              (s = this.TEXTS.notAllowed)
                        : (s = this.TEXTS.empty),
                    s
                );
            },
            getInvaildTagParams: function (t, e) {
                return {
                    "aria-invalid": !0,
                    class: (t.class || "") + " tagify--notAllowed",
                    title: e,
                };
            },
            hasMaxTags: function () {
                return (
                    this.value.length >= this.settings.maxTags &&
                    this.TEXTS.exceed
                );
            },
            normalizeTags: function (t) {
                function i(t) {
                    return (t + "")
                        .split(a)
                        .filter(function (t) {
                            return t;
                        })
                        .map(function (t) {
                            return { value: t.trim() };
                        });
                }
                var e,
                    s = this.settings,
                    n = s.whitelist,
                    a = s.delimiters,
                    o = s.mode,
                    r = !!n && n[0] instanceof Object,
                    l = t instanceof Array,
                    d = l && t[0] instanceof Object && "value" in t[0],
                    c = [];
                if (d)
                    return (t = (e = []).concat.apply(
                        e,
                        p(
                            t.map(function (e) {
                                return i(e.value).map(function (t) {
                                    return (function (e) {
                                        for (
                                            var t = 1;
                                            t < arguments.length;
                                            t++
                                        ) {
                                            var i =
                                                null != arguments[t]
                                                    ? arguments[t]
                                                    : {};
                                            t % 2
                                                ? g(i, !0).forEach(function (
                                                      t
                                                  ) {
                                                      u(e, t, i[t]);
                                                  })
                                                : Object.getOwnPropertyDescriptors
                                                ? Object.defineProperties(
                                                      e,
                                                      Object.getOwnPropertyDescriptors(
                                                          i
                                                      )
                                                  )
                                                : g(i).forEach(function (t) {
                                                      Object.defineProperty(
                                                          e,
                                                          t,
                                                          Object.getOwnPropertyDescriptor(
                                                              i,
                                                              t
                                                          )
                                                      );
                                                  });
                                        }
                                        return e;
                                    })({}, e, {}, t);
                                });
                            })
                        )
                    ));
                if (
                    ("number" == typeof t && (t = t.toString()),
                    "string" == typeof t)
                ) {
                    if (!t.trim()) return [];
                    t = i(t);
                } else if (l) {
                    var h;
                    t = (h = []).concat.apply(
                        h,
                        p(
                            t.map(function (t) {
                                return i(t);
                            })
                        )
                    );
                }
                return (
                    r &&
                        (t.forEach(function (e) {
                            var t = n.filter(function (t) {
                                return (
                                    t.value.toLowerCase() ==
                                    e.value.toLowerCase()
                                );
                            });
                            t[0] ? c.push(t[0]) : "mix" != o && c.push(e);
                        }),
                        c.length && (t = c)),
                    t
                );
            },
            parseMixTags: function (t) {
                var o = this,
                    e = this.settings,
                    r = e.mixTagsInterpolator,
                    l = e.duplicates,
                    d = e.transformTag,
                    c = e.enforceWhitelist,
                    h = [];
                return (
                    (t = t
                        .split(r[0])
                        .map(function (t, e) {
                            var i,
                                s,
                                n = t.split(r[1]),
                                a = n[0];
                            try {
                                i = JSON.parse(a);
                            } catch (t) {
                                i = o.normalizeTags(a)[0];
                            }
                            if (
                                !(1 < n.length) ||
                                (c && !o.isTagWhitelisted(i.value)) ||
                                (!l && o.isTagDuplicate(i.value))
                            ) {
                                if (t) return e ? r[0] + t : t;
                            } else d.call(o, i), (s = o.createTagElem(i)), h.push(i), s.classList.add("tagify--noAnim"), (n[0] = s.outerHTML), o.value.push(i);
                            return n.join("");
                        })
                        .join("")),
                    (this.DOM.input.innerHTML = t),
                    this.DOM.input.appendChild(document.createTextNode("")),
                    this.DOM.input.normalize(),
                    this.getTagElms().forEach(function (t, e) {
                        return (t.__tagifyTagData = h[e]);
                    }),
                    this.update(),
                    t
                );
            },
            replaceTextWithNode: function (t, e) {
                if (this.state.tag || e) {
                    e = e || this.state.tag.prefix + this.state.tag.value;
                    var i,
                        s,
                        n = this.state.selection || window.getSelection(),
                        a = n.anchorNode;
                    return (
                        a.splitText(n.anchorOffset),
                        (i = a.nodeValue.lastIndexOf(e)),
                        ((s = a.splitText(i)).nodeValue = s.nodeValue.replace(
                            e,
                            ""
                        )),
                        a.parentNode.insertBefore(t, s),
                        this.DOM.input.normalize(),
                        s
                    );
                }
            },
            selectTag: function (t, e) {
                if (
                    !this.settings.enforceWhitelist ||
                    this.isTagWhitelisted(e.value)
                )
                    return (
                        this.input.set.call(this, e.value, !0),
                        this.state.actions.selectOption &&
                            setTimeout(this.setRangeAtStartEnd.bind(this)),
                        this.getLastTag()
                            ? this.replaceTag(this.getLastTag(), e)
                            : this.appendTag(t),
                        (this.value[0] = e),
                        this.trigger("add", { tag: t, data: e }),
                        this.update(),
                        [t]
                    );
            },
            addEmptyTag: function () {
                var t = { value: "" },
                    e = this.createTagElem(t);
                (e.__tagifyTagData = t),
                    this.appendTag(e),
                    this.editTag(e, { skipValidation: !0 });
            },
            addTags: function (t, e, i) {
                var s,
                    n = this,
                    a =
                        2 < arguments.length && void 0 !== i
                            ? i
                            : this.settings.skipInvalid,
                    o = [],
                    r = this.settings;
                return t && 0 != t.length
                    ? ((t = this.normalizeTags(t)),
                      this.state.editing.scope
                          ? ((t[0].__isValid = !0),
                            this.onEditTagDone(this.state.editing.scope, t[0]))
                          : "mix" == r.mode
                          ? (r.transformTag.call(this, t[0]),
                            (s = this.createTagElem(t[0])),
                            this.replaceTextWithNode(s) ||
                                this.DOM.input.appendChild(s),
                            setTimeout(function () {
                                return s.classList.add("tagify--noAnim");
                            }, 300),
                            (t[0].prefix =
                                t[0].prefix || this.state.tag
                                    ? this.state.tag.prefix
                                    : (r.pattern.source || r.pattern)[0]),
                            this.value.push(t[0]),
                            this.update(),
                            (this.state.tag = null),
                            this.trigger(
                                "add",
                                c({}, { tag: s }, { data: t[0] })
                            ),
                            this.fixFirefoxLastTagNoCaret(),
                            s)
                          : ("select" == r.mode && (e = !1),
                            this.DOM.input.removeAttribute("style"),
                            t.forEach(function (t) {
                                var e,
                                    i = {};
                                if (
                                    ((t = Object.assign({}, t)),
                                    r.transformTag.call(n, t),
                                    (t.__isValid =
                                        n.hasMaxTags() || n.validateTag(t)),
                                    !0 !== t.__isValid)
                                ) {
                                    if (a) return;
                                    c(i, n.getInvaildTagParams(t, t.__isValid)),
                                        t.__isValid == n.TEXTS.duplicate &&
                                            n.markTagByValue(t.value);
                                }
                                if (
                                    ((i.role = "tag"),
                                    t.readonly && (i["aria-readonly"] = !0),
                                    ((e = n.createTagElem(
                                        c({}, t, i)
                                    )).__tagifyTagData = t),
                                    o.push(e),
                                    "select" == r.mode)
                                )
                                    return n.selectTag(e, t);
                                n.appendTag(e),
                                    t.__isValid && !0 === t.__isValid
                                        ? (n.value.push(t),
                                          n.update(),
                                          n.trigger("add", {
                                              tag: e,
                                              index: n.value.length - 1,
                                              data: t,
                                          }))
                                        : (n.trigger("invalid", {
                                              data: t,
                                              index: n.value.length,
                                              tag: e,
                                              message: t.__isValid,
                                          }),
                                          r.keepInvalidTags ||
                                              setTimeout(function () {
                                                  return n.removeTag(e, !0);
                                              }, 1e3)),
                                    n.dropdown.position.call(n);
                            }),
                            t.length && e && this.input.set.call(this),
                            this.dropdown.refilter.call(this),
                            o))
                    : ("select" == r.mode && this.removeAllTags(), o);
            },
            appendTag: function (t) {
                var e = this.DOM.scope.lastElementChild;
                e === this.DOM.input
                    ? this.DOM.scope.insertBefore(t, e)
                    : this.DOM.scope.appendChild(t);
            },
            createTagElem: function (t) {
                var e,
                    i = a(t.value),
                    s = this.settings.templates.tag.call(this, i, t);
                return (
                    this.settings.readonly && (t.readonly = !0),
                    ((e = n((s = h(s)))).__tagifyTagData = t),
                    e
                );
            },
            reCheckInvalidTags: function () {
                var n = this,
                    t = this.DOM.scope.querySelectorAll(
                        ".tagify__tag.tagify--notAllowed"
                    );
                [].forEach.call(t, function (t) {
                    var e = t.__tagifyTagData,
                        i = t.getAttribute("title") == n.TEXTS.duplicate,
                        s = !0 === n.validateTag(e);
                    i && s && ((e.__isValid = !0), n.replaceTag(t, e));
                });
            },
            removeTag: function (t, e, i) {
                if (
                    ((t = t || this.getLastTag()),
                    (i =
                        "number" == typeof i
                            ? i
                            : this.CSSVars.tagHideTransition),
                    "string" == typeof t && (t = this.getTagElmByValue(t)),
                    t instanceof HTMLElement)
                ) {
                    var s = this,
                        n = t.__tagifyTagData,
                        a = this.getTagIdx(n);
                    "select" == this.settings.mode &&
                        ((i = 0), this.input.set.call(this)),
                        t.classList.contains("tagify--notAllowed") && (e = !0),
                        i && 10 < i
                            ? ((t.style.width =
                                  parseFloat(window.getComputedStyle(t).width) +
                                  "px"),
                              document.body.clientTop,
                              t.classList.add("tagify--hide"),
                              setTimeout(o, i))
                            : o(),
                        e || (-1 < a && s.value.splice(a, 1), s.update());
                }
                function o() {
                    t.parentNode &&
                        (t.parentNode.removeChild(t),
                        e
                            ? s.settings.keepInvalidTags &&
                              s.trigger("remove", { tag: t, index: a })
                            : (s.update(),
                              s.trigger("remove", {
                                  tag: t,
                                  index: a,
                                  data: n,
                              }),
                              s.dropdown.refilter.call(s),
                              s.dropdown.position.call(s),
                              s.DOM.input.normalize(),
                              s.settings.keepInvalidTags &&
                                  s.reCheckInvalidTags()));
                }
            },
            removeAllTags: function () {
                (this.value = []),
                    "mix" == this.settings.mode
                        ? (this.DOM.input.innerHTML = "")
                        : Array.prototype.slice
                              .call(this.getTagElms())
                              .forEach(function (t) {
                                  return t.parentNode.removeChild(t);
                              }),
                    this.dropdown.position.call(this),
                    "select" == this.settings.mode && this.input.set.call(this),
                    this.update();
            },
            removeValueById: function () {},
            preUpdate: function () {
                this.DOM.scope.classList.toggle(
                    "tagify--hasMaxTags",
                    this.value.length >= this.settings.maxTags
                ),
                    this.DOM.scope.classList.toggle(
                        "tagify--noTags",
                        !this.value.length
                    );
            },
            update: function () {
                this.preUpdate();
                var t = this.DOM.originalInput,
                    e = t.value,
                    i = (function (t, s) {
                        return t.map(function (t) {
                            var e = {};
                            for (var i in t) i != s && (e[i] = t[i]);
                            return e;
                        });
                    })(this.value, "__isValid"),
                    s = new CustomEvent("change", { bubbles: !0 });
                (t.value =
                    "mix" == this.settings.mode
                        ? this.getMixedTagsAsString(i)
                        : i.length
                        ? this.settings.originalInputValueFormat
                            ? this.settings.originalInputValueFormat(i)
                            : JSON.stringify(i)
                        : ""),
                    (s.simulated = !0),
                    t._valueTracker && t._valueTracker.setValue(e),
                    t.dispatchEvent(s);
            },
            getMixedTagsAsString: function () {
                var i = "",
                    s = this,
                    n = this.settings.mixTagsInterpolator;
                return (
                    (function e(t) {
                        t.childNodes.forEach(function (t) {
                            if (1 == t.nodeType) {
                                if (
                                    t.classList.contains("tagify__tag") &&
                                    t.__tagifyTagData
                                )
                                    return void (i +=
                                        n[0] +
                                        JSON.stringify(t.__tagifyTagData) +
                                        n[1]);
                                "BR" != t.tagName ||
                                (t.parentNode != s.DOM.input &&
                                    1 != t.parentNode.childNodes.length)
                                    ? ("DIV" != t.tagName &&
                                          "P" != t.tagName) ||
                                      ((i += "\r\n"), e(t))
                                    : (i += "\r\n");
                            } else i += t.textContent;
                        });
                    })(this.DOM.input),
                    i
                );
            },
            getNodeHeight: function (t) {
                var e,
                    i = t.cloneNode(!0);
                return (
                    (i.style.cssText =
                        "position:fixed; top:-9999px; opacity:0"),
                    document.body.appendChild(i),
                    (e = i.clientHeight),
                    i.parentNode.removeChild(i),
                    e
                );
            },
            dropdown: {
                init: function () {
                    (this.DOM.dropdown = n(
                        this.settings.templates.dropdown(this.settings)
                    )),
                        (this.DOM.dropdown.content =
                            this.DOM.dropdown.querySelector(
                                ".tagify__dropdown__wrapper"
                            ));
                },
                show: function (t) {
                    var e,
                        i,
                        s,
                        n,
                        a = this,
                        o = this.settings,
                        r = window.getSelection(),
                        l = "mix" == o.mode && !o.enforceWhitelist,
                        d = !o.whitelist || !o.whitelist.length,
                        c = "manual" == o.dropdown.position;
                    if (
                        !(
                            (d && !l) ||
                            !1 === o.dropdown.enable ||
                            this.state.isLoading
                        )
                    ) {
                        if (
                            (clearTimeout(this.dropdownHide__bindEventsTimeout),
                            (this.suggestedListItems =
                                this.dropdown.filterListItems.call(this, t)),
                            this.suggestedListItems.length)
                        )
                            t &&
                                l &&
                                !this.state.editing.scope &&
                                !(function (t, e) {
                                    return t.toLowerCase() == e.toLowerCase();
                                })(this.suggestedListItems[0].value, t) &&
                                this.suggestedListItems.unshift({ value: t });
                        else {
                            if (!t || !l || this.state.editing.scope)
                                return (
                                    this.input.autocomplete.suggest.call(this),
                                    this.dropdown.hide.call(this),
                                    void this.events.binding.call(this)
                                );
                            this.suggestedListItems = [{ value: t }];
                        }
                        (s = f((i = this.suggestedListItems[0])) ? i.value : i),
                            o.autoComplete &&
                                s &&
                                0 == s.indexOf(t) &&
                                this.input.autocomplete.suggest.call(this, i),
                            (e = this.dropdown.createListHTML.call(
                                this,
                                this.suggestedListItems
                            )),
                            (this.DOM.dropdown.content.innerHTML = h(e)),
                            ((o.enforceWhitelist && !c) ||
                                o.dropdown.highlightFirst) &&
                                this.dropdown.highlightOption.call(
                                    this,
                                    this.DOM.dropdown.content.children[0]
                                ),
                            this.DOM.scope.setAttribute("aria-expanded", !0),
                            this.trigger("dropdown:show", this.DOM.dropdown),
                            (this.state.dropdown.visible = t || !0),
                            (this.state.selection = {
                                anchorOffset: r.anchorOffset,
                                anchorNode: r.anchorNode,
                            }),
                            this.dropdown.position.call(this),
                            document.body.contains(this.DOM.dropdown) ||
                                (c ||
                                    (this.events.binding.call(this, !1),
                                    (n = this.getNodeHeight(this.DOM.dropdown)),
                                    this.DOM.dropdown.classList.add(
                                        "tagify__dropdown--initial"
                                    ),
                                    this.dropdown.position.call(this, n),
                                    document.body.appendChild(
                                        this.DOM.dropdown
                                    ),
                                    setTimeout(function () {
                                        return a.DOM.dropdown.classList.remove(
                                            "tagify__dropdown--initial"
                                        );
                                    })),
                                setTimeout(
                                    this.dropdown.events.binding.bind(this)
                                ));
                    }
                },
                hide: function (t) {
                    var e = this.DOM,
                        i = e.scope,
                        s = e.dropdown,
                        n = "manual" == this.settings.dropdown.position && !t;
                    s &&
                        document.body.contains(s) &&
                        !n &&
                        (window.removeEventListener(
                            "resize",
                            this.dropdown.position
                        ),
                        this.dropdown.events.binding.call(this, !1),
                        clearTimeout(this.dropdownHide__bindEventsTimeout),
                        (this.dropdownHide__bindEventsTimeout = setTimeout(
                            this.events.binding.bind(this),
                            250
                        )),
                        i.setAttribute("aria-expanded", !1),
                        s.parentNode.removeChild(s),
                        (this.state.dropdown.visible = !1),
                        (this.state.ddItemData =
                            this.state.ddItemElm =
                            this.state.selection =
                                null),
                        this.state.tag &&
                            this.state.tag.value.length &&
                            (this.state.flaggedTags[this.state.tag.baseOffset] =
                                this.state.tag),
                        this.trigger("dropdown:hide", s));
                },
                refilter: function () {
                    this.suggestedListItems =
                        this.dropdown.filterListItems.call(this, "");
                    var t = this.dropdown.createListHTML.call(
                        this,
                        this.suggestedListItems
                    );
                    (this.DOM.dropdown.content.innerHTML = h(t)),
                        this.trigger("dropdown:updated", this.DOM.dropdown);
                },
                position: function (t) {
                    var e,
                        i,
                        s,
                        n,
                        a,
                        o,
                        r = this.DOM.dropdown,
                        l =
                            this.DOM[
                                "input" == this.settings.dropdown.position
                                    ? "input"
                                    : "scope"
                            ];
                    this.state.dropdown.visible &&
                        ((o =
                            "text" == this.settings.dropdown.position
                                ? ((n = (i = this.getCaretGlobalPosition())
                                      .bottom),
                                  (s = i.top),
                                  (a = i.left),
                                  "auto")
                                : ((s = (i = l.getBoundingClientRect()).top),
                                  (n = i.bottom - 1),
                                  (a = i.left),
                                  i.width + "px")),
                        (s = Math.floor(s)),
                        (n = Math.ceil(n)),
                        (e =
                            document.documentElement.clientHeight - n <
                            (t || r.clientHeight)),
                        (r.style.cssText =
                            "left:" +
                            (a + window.pageXOffset) +
                            "px; width:" +
                            o +
                            ";" +
                            (e
                                ? "bottom:" +
                                  (document.documentElement.clientHeight -
                                      s -
                                      window.pageYOffset -
                                      2) +
                                  "px;"
                                : "top: " + (n + window.pageYOffset) + "px")),
                        r.setAttribute("placement", e ? "top" : "bottom"));
                },
                events: {
                    binding: function (t) {
                        var e = !(0 < arguments.length && void 0 !== t) || t,
                            i = this.dropdown.events.callbacks,
                            s = (this.listeners.dropdown = this.listeners
                                .dropdown || {
                                position: this.dropdown.position.bind(this),
                                onKeyDown: i.onKeyDown.bind(this),
                                onMouseOver: i.onMouseOver.bind(this),
                                onMouseLeave: i.onMouseLeave.bind(this),
                                onClick: i.onClick.bind(this),
                                onScroll: i.onScroll.bind(this),
                            }),
                            n = e ? "addEventListener" : "removeEventListener";
                        "manual" != this.settings.dropdown.position &&
                            (window[n]("resize", s.position),
                            window[n]("keydown", s.onKeyDown)),
                            this.DOM.dropdown[n]("mouseover", s.onMouseOver),
                            this.DOM.dropdown[n]("mouseleave", s.onMouseLeave),
                            this.DOM.dropdown[n]("mousedown", s.onClick),
                            this.DOM.dropdown.content[n]("scroll", s.onScroll),
                            this.DOM[this.listeners.main.click[0]][n](
                                "click",
                                this.listeners.main.click[1]
                            );
                    },
                    callbacks: {
                        onKeyDown: function (t) {
                            var e = this.DOM.dropdown.querySelector(
                                    "[class$='--active']"
                                ),
                                i = e;
                            switch (t.key) {
                                case "ArrowDown":
                                case "ArrowUp":
                                case "Down":
                                case "Up":
                                    var s;
                                    t.preventDefault(),
                                        (i =
                                            (i =
                                                i &&
                                                i[
                                                    ("ArrowUp" == t.key ||
                                                    "Up" == t.key
                                                        ? "previous"
                                                        : "next") +
                                                        "ElementSibling"
                                                ]) ||
                                            (s =
                                                this.DOM.dropdown.content
                                                    .children)[
                                                "ArrowUp" == t.key ||
                                                "Up" == t.key
                                                    ? s.length - 1
                                                    : 0
                                            ]),
                                        this.dropdown.highlightOption.call(
                                            this,
                                            i,
                                            !0
                                        );
                                    break;
                                case "Escape":
                                case "Esc":
                                    this.dropdown.hide.call(this);
                                    break;
                                case "ArrowRight":
                                    if (this.state.actions.ArrowLeft) return;
                                case "Tab":
                                    if (
                                        "mix" != this.settings.mode &&
                                        !this.settings.autoComplete.rightKey
                                    ) {
                                        try {
                                            var n = i
                                                ? i.textContent
                                                : this.suggestedListItems[0]
                                                      .value;
                                            this.input.autocomplete.set.call(
                                                this,
                                                n
                                            );
                                        } catch (t) {}
                                        return !1;
                                    }
                                case "Enter":
                                    t.preventDefault(),
                                        this.dropdown.selectOption.call(
                                            this,
                                            e
                                        );
                                    break;
                                case "Backspace":
                                    if (
                                        "mix" == this.settings.mode ||
                                        this.state.editing.scope
                                    )
                                        return;
                                    var a = this.input.value.trim();
                                    ("" != a && 8203 != a.charCodeAt(0)) ||
                                        (!0 === this.settings.backspace
                                            ? this.removeTag()
                                            : "edit" ==
                                                  this.settings.backspace &&
                                              setTimeout(
                                                  this.editTag.bind(this),
                                                  0
                                              ));
                            }
                        },
                        onMouseOver: function (t) {
                            var e = t.target.closest(".tagify__dropdown__item");
                            e && this.dropdown.highlightOption.call(this, e);
                        },
                        onMouseLeave: function () {
                            this.dropdown.highlightOption.call(this);
                        },
                        onClick: function (t) {
                            if (
                                0 == t.button &&
                                t.target != this.DOM.dropdown
                            ) {
                                var e = t.target.closest(
                                    ".tagify__dropdown__item"
                                );
                                t.target.closest(
                                    ".tagify__dropdown__addNewBtn"
                                );
                                e && this.dropdown.selectOption.call(this, e);
                            }
                        },
                        onScroll: function (t) {
                            var e = t.target,
                                i =
                                    (e.scrollTop /
                                        (e.scrollHeight -
                                            e.parentNode.clientHeight)) *
                                    100;
                            this.trigger("dropdown:scroll", {
                                percentage: Math.round(i),
                            });
                        },
                    },
                },
                highlightOption: function (t, e) {
                    var i,
                        s = "tagify__dropdown__item--active";
                    if (
                        (this.state.ddItemElm &&
                            (this.state.ddItemElm.classList.remove(s),
                            this.state.ddItemElm.removeAttribute(
                                "aria-selected"
                            )),
                        !t)
                    )
                        return (
                            (this.state.ddItemData = null),
                            (this.state.ddItemElm = null),
                            void this.input.autocomplete.suggest.call(this)
                        );
                    (i = this.suggestedListItems[this.getNodeIndex(t)]),
                        (this.state.ddItemData = i),
                        (this.state.ddItemElm = t).classList.add(s),
                        t.setAttribute("aria-selected", !0),
                        e &&
                            (t.parentNode.scrollTop =
                                t.clientHeight +
                                t.offsetTop -
                                t.parentNode.clientHeight),
                        this.settings.autoComplete &&
                            (this.input.autocomplete.suggest.call(this, i),
                            "manual" != this.settings.dropdown.position &&
                                this.dropdown.position.call(this));
                },
                selectOption: function (t) {
                    var e = this;
                    if (t) {
                        (this.state.actions.selectOption = !0),
                            setTimeout(function () {
                                return (e.state.actions.selectOption = !1);
                            }, 50);
                        var i = this.settings.dropdown.closeOnSelect,
                            s =
                                this.suggestedListItems[this.getNodeIndex(t)] ||
                                this.input.value;
                        this.trigger("dropdown:select", s),
                            this.addTags([s], !0),
                            this.state.editing ||
                                setTimeout(function () {
                                    e.DOM.input.focus(), e.toggleFocusClass(!0);
                                }),
                            i && this.dropdown.hide.call(this);
                    }
                },
                filterListItems: function (t) {
                    var i,
                        e,
                        s,
                        n,
                        a,
                        o = this,
                        r = this.settings,
                        l = [],
                        d = r.whitelist,
                        c = r.dropdown.maxItems || 1 / 0,
                        h = r.dropdown.searchKeys.concat(["searchBy", "value"]),
                        g = 0;
                    if (!t)
                        return (
                            r.duplicates
                                ? d
                                : d.filter(function (t) {
                                      return !o.isTagDuplicate(
                                          f(t) ? t.value : t
                                      );
                                  })
                        ).slice(0, c);
                    for (
                        ;
                        g < d.length &&
                        ((i = d[g] instanceof Object ? d[g] : { value: d[g] }),
                        (n = h
                            .reduce(function (t, e) {
                                return t + " " + (i[e] || "");
                            }, "")
                            .toLowerCase()),
                        (s = r.dropdown.accentedSearch
                            ? m(n).indexOf(m(t.toLowerCase()))
                            : n.indexOf(t.toLowerCase())),
                        (e = r.dropdown.fuzzySearch ? 0 <= s : 0 == s),
                        (a =
                            !r.duplicates &&
                            this.isTagDuplicate(f(i) ? i.value : i)),
                        e && !a && c-- && l.push(i),
                        0 != c);
                        g++
                    );
                    return l;
                },
                createListHTML: function (t) {
                    var s = this;
                    return t
                        .map(function (t) {
                            "string" == typeof t && (t = { value: t });
                            var e = s.settings.dropdown.mapValueTo,
                                i = c({}, t, {
                                    value: a(
                                        (e
                                            ? "function" == typeof e
                                                ? e(t)
                                                : t[e]
                                            : t.value) || ""
                                    ),
                                });
                            return s.settings.templates.dropdownItem.call(s, i);
                        })
                        .join("");
                },
            },
        }),
        t
    );
});
