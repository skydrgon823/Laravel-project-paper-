(() => {
    function e(e, a) {
        var n =
            ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
            e["@@iterator"];
        if (!n) {
            if (
                Array.isArray(e) ||
                (n = (function(e, a) {
                    if (!e) return;
                    if ("string" == typeof e) return t(e, a);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    "Object" === n && e.constructor && (n = e.constructor.name);
                    if ("Map" === n || "Set" === n) return Array.from(e);
                    if (
                        "Arguments" === n ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    )
                        return t(e, a);
                })(e)) ||
                (a && e && "number" == typeof e.length)
            ) {
                n && (e = n);
                var o = 0,
                    r = function() {};
                return {
                    s: r,
                    n: function() {
                        return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
                    },
                    e: function(e) {
                        throw e;
                    },
                    f: r,
                };
            }
            throw new TypeError(
                "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
        }
        var s,
            i = !0,
            l = !1;
        return {
            s: function() {
                n = n.call(e);
            },
            n: function() {
                var e = n.next();
                return (i = e.done), e;
            },
            e: function(e) {
                (l = !0), (s = e);
            },
            f: function() {
                try {
                    i || null == n.return || n.return();
                } finally {
                    if (l) throw s;
                }
            },
        };
    }

    function t(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var a = 0, n = new Array(t); a < t; a++) n[a] = e[a];
        return n;
    }!(function(t) {
        "use strict";
        t.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": t('meta[name="csrf-token"]').attr("content"),
            },
        });
        var a = function(e) {
                window.showAlert("alert-danger", e);
            },
            n = function(e) {
                window.showAlert("alert-success", e);
            },
            o = function(e) {
                void 0 !== e.errors && e.errors.length ?
                    r(e.errors) :
                    void 0 !== e.responseJSON ?
                    void 0 !== e.responseJSON.errors ?
                    422 === e.status && r(e.responseJSON.errors) :
                    void 0 !== e.responseJSON.message ?
                    a(e.responseJSON.message) :
                    t.each(e.responseJSON, function(e, n) {
                        t.each(n, function(e, t) {
                            a(t);
                        });
                    }) :
                    a(e.statusText);
            },
            r = function(e) {
                var n = "";
                t.each(e, function(e, t) {
                        "" !== n && (n += "<br />"), (n += t);
                    }),
                    a(n);
            };
        window.showAlert = function(e, a) {
            if (e && "" !== a) {
                var n = Math.floor(1e3 * Math.random()),
                    o =
                    '<div class="alert '
                    .concat(e, ' alert-dismissible" id="')
                    .concat(
                        n,
                        '">\n                <span class="btn-close" data-bs-dismiss="alert" aria-label="close"></span>\n                <i class="fas fa-'
                    ) +
                    ("alert-success" === e ?
                        "check-circle" :
                        "exclamation-circle") +
                    ' message-icon"></i>\n                '.concat(
                        a,
                        "\n            </div>"
                    );
                t("#alert-container")
                    .append(o)
                    .ready(function() {
                        window.setTimeout(function() {
                            t("#alert-container #".concat(n)).remove();
                        }, 6e3);
                    });
            }
        };
        var s = "rtl" === t("body").prop("dir");
        t(document).ready(function() {
            jQuery().mCustomScrollbar &&
                t(".ps-custom-scrollbar").mCustomScrollbar({
                    theme: "dark",
                    scrollInertia: 0,
                }),
                (window.onBeforeChangeSwatches = function(e) {
                    t(".add-to-cart-form .error-message").hide(),
                        t(".add-to-cart-form .success-message").hide(),
                        t(".number-items-available").html("").hide(),
                        e &&
                        e.attributes &&
                        t(".add-to-cart-form button[type=submit]")
                        .prop("disabled", !0)
                        .addClass("btn-disabled");
                }),
                (window.onChangeSwatchesSuccess = function(e) {
                    if (
                        (t(".add-to-cart-form .error-message").hide(),
                            t(".add-to-cart-form .success-message").hide(),
                            e)
                    ) {
                        var a = t(".add-to-cart-form button[type=submit]");
                        if (e.error)
                            a.prop("disabled", !0).addClass("btn-disabled"),
                            t(".number-items-available")
                            .html(
                                '<span class="text-danger">(' +
                                e.message +
                                ")</span>"
                            )
                            .show(),
                            t(".hidden-product-id").val("");
                        else {
                            t(".add-to-cart-form")
                                .find(".error-message")
                                .hide(),
                                t(".product-price ins span.text-brand").text(
                                    e.data.display_sale_price
                                ),
                                e.data.sale_price !== e.data.price ?
                                (t(".product-price ins span.old-price")
                                    .text(e.data.display_price)
                                    .show(),
                                    t(
                                        ".product-price span.save-price .percentage-off"
                                    ).text(e.data.sale_percentage),
                                    t(
                                        ".product-price span.save-price"
                                    ).show()) :
                                (t(
                                        ".product-price ins span.old-price"
                                    ).hide(),
                                    t(
                                        ".product-price span.save-price"
                                    ).hide()),
                                t(".sku_wrapper .value").text(e.data.sku),
                                t(".hidden-product-id").val(e.data.id),
                                a
                                .prop("disabled", !1)
                                .removeClass("btn-disabled"),
                                e.data.error_message ?
                                (a
                                    .prop("disabled", !0)
                                    .addClass("btn-disabled"),
                                    t(".number-items-available")
                                    .html(
                                        '<span class="text-danger">(' +
                                        e.data.error_message +
                                        ")</span>"
                                    )
                                    .show()) :
                                e.data.success_message ?
                                t(".number-items-available")
                                .html(
                                    '<span class="text-success">(' +
                                    e.data.success_message +
                                    ")</span>"
                                )
                                .show() :
                                t(".number-items-available")
                                .html("")
                                .hide();
                            var n = e.data.unavailable_attribute_ids || [];
                            t(".attribute-swatch-item").removeClass("pe-none"),
                                t(".product-filter-item option").prop(
                                    "disabled", !1
                                ),
                                n &&
                                n.length &&
                                n.map(function(e) {
                                    var a = t(
                                        '.attribute-swatch-item[data-id="' +
                                        e +
                                        '"]'
                                    );
                                    a.length ?
                                        (a.addClass("pe-none"),
                                            a
                                            .find("input")
                                            .prop("checked", !1)) :
                                        (a = t(
                                            '.product-filter-item option[data-id="' +
                                            e +
                                            '"]'
                                        )).length &&
                                        a
                                        .prop("disabled", "disabled")
                                        .prop("selected", !1);
                                });
                            var o = t(".product-image-slider");
                            o.slick("unslick");
                            var r = "";
                            e.data.image_with_sizes.origin.forEach(function(
                                    e
                                ) {
                                    r +=
                                        '<figure class="border-radius-10"><a href="' +
                                        e +
                                        '"><img src="' +
                                        e +
                                        '" alt="image"/></a></figure>';
                                }),
                                o.html(r),
                                o.slick({
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    rtl: s,
                                    arrows: !1,
                                    fade: !1,
                                    asNavFor: ".slider-nav-thumbnails",
                                });
                            var i = t(".slider-nav-thumbnails");
                            i.slick("unslick");
                            var l = "";
                            e.data.image_with_sizes.thumb.forEach(function(e) {
                                    l +=
                                        '<div class="item"><img src="' +
                                        e +
                                        '" alt="image"/></div>';
                                }),
                                i.html(l),
                                i.slick({
                                    slidesToShow: 5,
                                    slidesToScroll: 1,
                                    rtl: s,
                                    asNavFor: ".product-image-slider",
                                    dots: !1,
                                    focusOnSelect: !0,
                                    prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                                    nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
                                }),
                                i
                                .find(".slick-slide")
                                .removeClass("slick-active"),
                                i
                                .find(".slick-slide")
                                .eq(0)
                                .addClass("slick-active"),
                                o.on("beforeChange", function(e, t, a, n) {
                                    var o = n;
                                    i
                                        .find(".slick-slide")
                                        .removeClass("slick-active"),
                                        i
                                        .find(".slick-slide")
                                        .eq(o)
                                        .addClass("slick-active");
                                }),
                                o.lightGallery({
                                    selector: ".slick-slide:not(.slick-cloned) a",
                                    thumbnail: !0,
                                    share: !1,
                                    fullScreen: !1,
                                    autoplay: !1,
                                    autoplayControls: !1,
                                    actualSize: !1,
                                });
                        }
                    }
                }),
                t(document).on(
                    "click",
                    ".newsletter-form button[type=submit]",
                    function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var r = t(this);
                        r.addClass("button-loading"),
                            t.ajax({
                                type: "POST",
                                cache: !1,
                                url: r.closest("form").prop("action"),
                                data: new FormData(r.closest("form")[0]),
                                contentType: !1,
                                processData: !1,
                                success: function(e) {
                                    r.removeClass("button-loading"),
                                        "undefined" !=
                                        typeof refreshRecaptcha &&
                                        refreshRecaptcha(),
                                        e.error ?
                                        a(e.message) :
                                        (r
                                            .closest("form")
                                            .find("input[type=email]")
                                            .val(""),
                                            n(e.message));
                                },
                                error: function(e) {
                                    "undefined" != typeof refreshRecaptcha &&
                                        refreshRecaptcha(),
                                        r.removeClass("button-loading"),
                                        o(e);
                                },
                            });
                    }
                ),
                t(document).on("change", ".switch-currency", function() {
                    t(this).closest("form").submit();
                }),
                t(document).on(
                    "click",
                    ".js-add-to-wishlist-button",
                    function(e) {
                        e.preventDefault();
                        var a = t(this);
                        a.addClass("button-loading"),
                            t.ajax({
                                url: a.data("url"),
                                method: "POST",
                                success: function(e) {
                                    if (e.error)
                                        return (
                                            a.removeClass("button-loading"),
                                            window.showAlert(
                                                "alert-danger",
                                                e.message
                                            ), !1
                                        );
                                    window.showAlert(
                                            "alert-success",
                                            e.message
                                        ),
                                        t(".wishlist-count span").text(
                                            e.data.count
                                        ),
                                        a.removeClass("button-loading"),
                                        a.toggleClass("wis_added"),
                                        a
                                        .removeClass("button-loading")
                                        .removeClass(
                                            "js-add-to-wishlist-button"
                                        )
                                        .addClass(
                                            "js-remove-from-wishlist-button"
                                        );
                                },
                                error: function(e) {
                                    a.removeClass("button-loading"),
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        );
                                },
                            });
                    }
                ),
                t(document).on(
                    "click",
                    ".js-remove-from-wishlist-button",
                    function(e) {
                        e.preventDefault();
                        var a = t(this);
                        a.addClass("button-loading"),
                            t.ajax({
                                url: a.data("url"),
                                method: "DELETE",
                                success: function(e) {
                                    if (e.error)
                                        return (
                                            a.removeClass("button-loading"),
                                            window.showAlert(
                                                "alert-danger",
                                                e.message
                                            ), !1
                                        );
                                    window.showAlert(
                                            "alert-success",
                                            e.message
                                        ),
                                        t(".wishlist-count span").text(
                                            e.data.count
                                        ),
                                        a.removeClass("button-loading"),
                                        a.closest("tr").remove(),
                                        a
                                        .removeClass(
                                            "js-remove-from-wishlist-button"
                                        )
                                        .addClass(
                                            "js-add-to-wishlist-button"
                                        );
                                },
                                error: function(e) {
                                    a.removeClass("button-loading"),
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        );
                                },
                            });
                    }
                ),
                t(document).on(
                    "click",
                    ".js-add-to-compare-button",
                    function(e) {
                        e.preventDefault();
                        var a = t(this);
                        a.addClass("button-loading"),
                            t.ajax({
                                url: a.data("url"),
                                method: "POST",
                                success: function(e) {
                                    if (e.error)
                                        return (
                                            a.removeClass("button-loading"),
                                            window.showAlert(
                                                "alert-danger",
                                                e.message
                                            ), !1
                                        );
                                    t(".compare-count span").text(e.data.count),
                                        window.showAlert(
                                            "alert-success",
                                            e.message
                                        ),
                                        a.removeClass("button-loading");
                                },
                                error: function(e) {
                                    a.removeClass("button-loading"),
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        );
                                },
                            });
                    }
                ),
                t(document).on(
                    "click",
                    ".js-remove-from-compare-button",
                    function(e) {
                        e.preventDefault();
                        var a = t(this),
                            n = a.html();
                        a.html(n + "..."),
                            t.ajax({
                                url: a.data("url"),
                                method: "DELETE",
                                success: function(e) {
                                    if (e.error)
                                        return (
                                            a.text(n),
                                            window.showAlert(
                                                "alert-danger",
                                                e.message
                                            ), !1
                                        );
                                    t(".compare-count span").text(e.data.count),
                                        t(".table__compare").load(
                                            window.location.href +
                                            " .table__compare > *",
                                            function() {
                                                window.showAlert(
                                                        "alert-success",
                                                        e.message
                                                    ),
                                                    a.html(n);
                                            }
                                        );
                                },
                                error: function(e) {
                                    a.removeClass("button-loading"),
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        );
                                },
                            });
                    }
                ),
                t(document).on("click", ".add-to-cart-button", function(e) {
                    e.preventDefault();
                    var a = t(this);
                    a.prop("disabled", !0).addClass("button-loading"),
                        t.ajax({
                            url: a.data("url"),
                            method: "POST",
                            data: { id: a.data("id") },
                            dataType: "json",
                            success: function(e) {
                                if (
                                    (a
                                        .prop("disabled", !1)
                                        .removeClass("button-loading")
                                        .addClass("active"),
                                        e.error)
                                )
                                    return (
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        ), !1
                                    );
                                window.showAlert("alert-success", e.message),
                                    "checkout" === a.prop("name") &&
                                    void 0 !== e.data.next_url ?
                                    (window.location.href =
                                        e.data.next_url) :
                                    t.ajax({
                                        url: window.siteUrl + "/ajax/cart",
                                        method: "GET",
                                        success: function(e) {
                                            e.error ||
                                                (t(
                                                        ".cart-dropdown-wrap"
                                                    ).html(e.data.html),
                                                    t(
                                                        ".mini-cart-icon span"
                                                    ).text(e.data.count));
                                        },
                                    });
                            },
                            error: function(e) {
                                a
                                    .prop("disabled", !1)
                                    .removeClass("button-loading"),
                                    window.showAlert("alert-danger", e.message);
                            },
                        });
                }),
                t(document).on(
                    "click",
                    ".add-to-cart-form button[type=submit]",
                    function(e) {
                        e.preventDefault(), e.stopPropagation();
                        var a = t(this);
                        t(".hidden-product-id").val() ?
                            (a
                                .prop("disabled", !0)
                                .addClass("btn-disabled")
                                .addClass("button-loading"),
                                t.ajax({
                                    type: "POST",
                                    cache: !1,
                                    url: a.closest("form").prop("action"),
                                    data: new FormData(a.closest("form")[0]),
                                    contentType: !1,
                                    processData: !1,
                                    success: function(e) {
                                        if (
                                            (a
                                                .prop("disabled", !1)
                                                .removeClass("btn-disabled")
                                                .removeClass("button-loading"),
                                                e.error)
                                        )
                                            return (
                                                a.removeClass("button-loading"),
                                                window.showAlert(
                                                    "alert-danger",
                                                    e.message
                                                ), !1
                                            );
                                        window.showAlert(
                                                "alert-success",
                                                e.message
                                            ),
                                            "checkout" === a.prop("name") &&
                                            void 0 !== e.data.next_url ?
                                            (window.location.href =
                                                e.data.next_url) :
                                            t.ajax({
                                                url: window.siteUrl +
                                                    "/ajax/cart",
                                                method: "GET",
                                                success: function(e) {
                                                    e.error ||
                                                        (t(
                                                                ".cart-dropdown-wrap"
                                                            ).html(e.data.html),
                                                            t(
                                                                ".mini-cart-icon span"
                                                            ).text(
                                                                e.data.count
                                                            ));
                                                },
                                            });
                                    },
                                    error: function(e) {
                                        a
                                            .prop("disabled", !1)
                                            .removeClass("btn-disabled")
                                            .removeClass("button-loading"),
                                            o(e, a.closest("form"));
                                    },
                                })) :
                            a.prop("disabled", !0).addClass("btn-disabled");
                    }
                ),
                t(document).on("click", ".remove-cart-item", function(e) {
                    e.preventDefault();
                    var a = t(this);
                    a.closest("li").addClass("content-loading"),
                        t.ajax({
                            url: a.data("url"),
                            method: "GET",
                            success: function(e) {
                                if (
                                    (a
                                        .closest("li")
                                        .removeClass("content-loading"),
                                        e.error)
                                )
                                    return (
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        ), !1
                                    );
                                t.ajax({
                                    url: window.siteUrl + "/ajax/cart",
                                    method: "GET",
                                    success: function(a) {
                                        a.error ||
                                            (t(".cart-dropdown-wrap").html(
                                                    a.data.html
                                                ),
                                                t(".mini-cart-icon span").text(
                                                    a.data.count
                                                ),
                                                window.showAlert(
                                                    "alert-success",
                                                    e.message
                                                ));
                                    },
                                });
                            },
                            error: function(e) {
                                a.closest("li").removeClass("content-loading"),
                                    window.showAlert("alert-danger", e.message);
                            },
                        });
                }),
                t(document).on("click", ".remove-cart-button", function(e) {
                    e.preventDefault();
                    var a = t(this);
                    a.closest(".table--cart").addClass("content-loading"),
                        t.ajax({
                            url: a.data("url"),
                            method: "GET",
                            success: function(e) {
                                if (e.error)
                                    return (
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        ),
                                        a
                                        .closest(".table--cart")
                                        .removeClass("content-loading"), !1
                                    );
                                t(".section--shopping-cart").load(
                                        window.location.href +
                                        " .section--shopping-cart > *",
                                        function() {
                                            a
                                                .closest(".table--cart")
                                                .removeClass("content-loading"),
                                                window.showAlert(
                                                    "alert-success",
                                                    e.message
                                                );
                                        }
                                    ),
                                    t.ajax({
                                        url: window.siteUrl + "/ajax/cart",
                                        method: "GET",
                                        success: function(e) {
                                            e.error ||
                                                (t(".cart-dropdown-wrap").html(
                                                        e.data.html
                                                    ),
                                                    t(".mini-cart-icon span").text(
                                                        e.data.count
                                                    ));
                                        },
                                    });
                            },
                            error: function(e) {
                                a
                                    .closest(".table--cart")
                                    .removeClass("content-loading"),
                                    window.showAlert("alert-danger", e.message);
                            },
                        });
                }),
                t(document).on("change", ".submit-form-on-change", function() {
                    t(this).closest("form").submit();
                });
            var r = [],
                i = function(t) {
                    var a,
                        n =
                        new ClipboardEvent("").clipboardData ||
                        new DataTransfer(),
                        o = e(r);
                    try {
                        for (o.s(); !(a = o.n()).done;) {
                            var s = a.value;
                            n.items.add(s);
                        }
                    } catch (e) {
                        o.e(e);
                    } finally {
                        o.f();
                    }
                    (t.files = n.files), l(t);
                },
                l = function(e) {
                    var a = t(".image-upload__text"),
                        n = t(e).data("max-files"),
                        o = e.files.length;
                    n
                        ?
                        (o >= n ?
                            a
                            .closest(
                                ".image-upload__uploader-container"
                            )
                            .addClass("d-none") :
                            a
                            .closest(
                                ".image-upload__uploader-container"
                            )
                            .removeClass("d-none"),
                            a.text(o + "/" + n)) :
                        a.text(o);
                    var r = t(".image-viewer__list"),
                        s = t("#review-image-template").html();
                    if (
                        (r.addClass("is-loading"),
                            r.find(".image-viewer__item").remove(),
                            o)
                    ) {
                        for (var i = o - 1; i >= 0; i--)
                            r.prepend(s.replace("__id__", i));
                        for (
                            var l = function(t) {
                                    var a = new FileReader();
                                    (a.onload = function(e) {
                                        r.find(
                                                ".image-viewer__item[data-id=" +
                                                t +
                                                "]"
                                            )
                                            .find("img")
                                            .attr("src", e.target.result);
                                    }),
                                    a.readAsDataURL(e.files[t]);
                                },
                                c = o - 1; c >= 0; c--
                        )
                            l(c);
                    }
                    r.removeClass("is-loading");
                };

            function c(e) {
                e.closest(".table--cart").addClass("content-loading"),
                    t.ajax({
                        type: "POST",
                        cache: !1,
                        url: e.closest("form").prop("action"),
                        data: new FormData(e.closest("form")[0]),
                        contentType: !1,
                        processData: !1,
                        success: function(a) {
                            if (a.error)
                                return (
                                    window.showAlert("alert-danger", a.message),
                                    e
                                    .closest(".table--cart")
                                    .removeClass("content-loading"),
                                    e
                                    .closest(".detail-qty")
                                    .find(".qty-val")
                                    .text(a.data.count), !1
                                );
                            t(".section--shopping-cart").load(
                                    window.location.href +
                                    " .section--shopping-cart > *",
                                    function() {
                                        e
                                            .closest(".table--cart")
                                            .removeClass("content-loading"),
                                            window.showAlert(
                                                "alert-success",
                                                a.message
                                            );
                                    }
                                ),
                                t.ajax({
                                    url: window.siteUrl + "/ajax/cart",
                                    method: "GET",
                                    success: function(e) {
                                        e.error ||
                                            (t(".cart-dropdown-wrap").html(
                                                    e.data.html
                                                ),
                                                t(".mini-cart-icon span").text(
                                                    e.data.count
                                                ));
                                    },
                                });
                        },
                        error: function(t) {
                            e
                                .closest(".table--cart")
                                .removeClass("content-loading"),
                                window.showAlert("alert-danger", t.message);
                        },
                    });
            }
            t(document).on(
                    "change",
                    ".form-review-product input[type=file]",
                    function(e) {
                        e.preventDefault();
                        var a = this,
                            n = t(a),
                            o = n.data("max-size");
                        Object.keys(a.files).map(function(e) {
                            if (o && a.files[e].size / 1024 > o) {
                                var t = n
                                    .data("max-size-message")
                                    .replace("__attribute__", a.files[e].name)
                                    .replace("__max__", o);
                                window.showAlert("alert-danger", t);
                            } else r.push(a.files[e]);
                        });
                        var s = r.length,
                            l = n.data("max-files");
                        l && s > l && r.splice(s - l - 1, s - l), i(a);
                    }
                ),
                t(document).on(
                    "click",
                    ".form-review-product .image-viewer__icon-remove",
                    function(e) {
                        e.preventDefault();
                        var a = t(e.currentTarget)
                            .closest(".image-viewer__item")
                            .data("id");
                        r.splice(a, 1);
                        var n = t(".form-review-product input[type=file]")[0];
                        i(n);
                    }
                ),
                sessionStorage.reloadReviewsTab &&
                (t('.nav-tabs li a[href="#Reviews"]').tab("show"),
                    (sessionStorage.reloadReviewsTab = !1)),
                t(document).on(
                    "click",
                    ".form-review-product button[type=submit]",
                    function(e) {
                        var r = this;
                        e.preventDefault(),
                            e.stopPropagation(),
                            t(this)
                            .prop("disabled", !0)
                            .addClass("btn-disabled")
                            .addClass("button-loading");
                        var s = t(this).closest("form");
                        t.ajax({
                            type: "POST",
                            cache: !1,
                            url: s.prop("action"),
                            data: new FormData(s[0]),
                            contentType: !1,
                            processData: !1,
                            success: function(e) {
                                e.error ?
                                    a(e.message) :
                                    (s.find("select").val(0),
                                        s.find("textarea").val(""),
                                        n(e.message),
                                        setTimeout(function() {
                                            (sessionStorage.reloadReviewsTab = !0),
                                            window.location.reload();
                                        }, 1500)),
                                    t(r)
                                    .prop("disabled", !1)
                                    .removeClass("btn-disabled")
                                    .removeClass("button-loading");
                            },
                            error: function(e) {
                                t(r)
                                    .prop("disabled", !1)
                                    .removeClass("btn-disabled")
                                    .removeClass("button-loading"),
                                    o(e);
                            },
                        });
                    }
                ),
                t(".form-coupon-wrapper .coupon-code").keypress(function(e) {
                    if (13 === e.keyCode)
                        return (
                            t(".apply-coupon-code").trigger("click"),
                            e.preventDefault(),
                            e.stopPropagation(), !1
                        );
                }),
                t(document).on("click", ".detail-qty .qty-up", function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var a = parseInt(
                        t(this).closest(".detail-qty").find(".qty-val").val(),
                        10
                    );
                    (a += 1),
                    t(this).closest(".detail-qty").find("input").val(a),
                        t(this).closest(".section--shopping-cart").length &&
                        c(t(this));
                }),
                t(document).on("click", ".detail-qty .qty-down", function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var a = parseInt(
                        t(this).closest(".detail-qty").find(".qty-val").val(),
                        10
                    );
                    (a -= 1) > 1 || (a = 1),
                        t(this)
                        .closest(".detail-qty")
                        .find("input")
                        .val(a)
                        .trigger("change"),
                        a >= 0 &&
                        t(this).closest(".section--shopping-cart").length &&
                        c(t(this));
                }),
                t(document).on(
                    "change",
                    ".section--shopping-cart .detail-qty .qty-val",
                    function() {
                        c(t(this));
                    }
                ),
                t(document).on("click", ".btn-apply-coupon-code", function(e) {
                    e.preventDefault();
                    var a = t(e.currentTarget);
                    a
                        .prop("disabled", !0)
                        .addClass("btn-disabled")
                        .addClass("button-loading"),
                        t.ajax({
                            url: a.data("url"),
                            type: "POST",
                            data: {
                                coupon_code: a
                                    .closest(".form-coupon-wrapper")
                                    .find(".coupon-code")
                                    .val(),
                            },
                            headers: {
                                "X-CSRF-TOKEN": t(
                                    'meta[name="csrf-token"]'
                                ).attr("content"),
                            },
                            success: function(e) {
                                e.error ?
                                    (window.showAlert(
                                            "alert-danger",
                                            e.message
                                        ),
                                        a
                                        .prop("disabled", !1)
                                        .removeClass("btn-disabled")
                                        .removeClass("button-loading")) :
                                    t(".section--shopping-cart").load(
                                        window.location.href +
                                        "?applied_coupon=1 .section--shopping-cart > *",
                                        function() {
                                            a
                                                .prop("disabled", !1)
                                                .removeClass("btn-disabled")
                                                .removeClass(
                                                    "button-loading"
                                                ),
                                                window.showAlert(
                                                    "alert-success",
                                                    e.message
                                                );
                                        }
                                    );
                            },
                            error: function(e) {
                                void 0 !== e.responseJSON ?
                                    "undefined" !== e.responseJSON.errors ?
                                    t.each(
                                        e.responseJSON.errors,
                                        function(e, a) {
                                            t.each(a, function(e, t) {
                                                window.showAlert(
                                                    "alert-danger",
                                                    t
                                                );
                                            });
                                        }
                                    ) :
                                    void 0 !== e.responseJSON.message &&
                                    window.showAlert(
                                        "alert-danger",
                                        e.responseJSON.message
                                    ) :
                                    window.showAlert(
                                        "alert-danger",
                                        e.status.text
                                    ),
                                    a
                                    .prop("disabled", !1)
                                    .removeClass("btn-disabled")
                                    .removeClass("button-loading");
                            },
                        });
                }),
                t(document).on(
                    "click",
                    ".btn-remove-coupon-code",
                    function(e) {
                        e.preventDefault();
                        var a = t(e.currentTarget),
                            n = a.text();
                        a.text(a.data("processing-text")),
                            t.ajax({
                                url: a.data("url"),
                                type: "POST",
                                headers: {
                                    "X-CSRF-TOKEN": t(
                                        'meta[name="csrf-token"]'
                                    ).attr("content"),
                                },
                                success: function(e) {
                                    e.error ?
                                        (window.showAlert(
                                                "alert-danger",
                                                e.message
                                            ),
                                            a.text(n)) :
                                        t(".section--shopping-cart").load(
                                            window.location.href +
                                            " .section--shopping-cart > *",
                                            function() {
                                                a.text(n);
                                            }
                                        );
                                },
                                error: function(e) {
                                    void 0 !== e.responseJSON ?
                                        "undefined" !== e.responseJSON.errors ?
                                        t.each(
                                            e.responseJSON.errors,
                                            function(e, a) {
                                                t.each(
                                                    a,
                                                    function(e, t) {
                                                        window.showAlert(
                                                            "alert-danger",
                                                            t
                                                        );
                                                    }
                                                );
                                            }
                                        ) :
                                        void 0 !==
                                        e.responseJSON.message &&
                                        window.showAlert(
                                            "alert-danger",
                                            e.responseJSON.message
                                        ) :
                                        window.showAlert(
                                            "alert-danger",
                                            e.status.text
                                        ),
                                        a.text(n);
                                },
                            });
                    }
                ),
                t(document).on(
                    "click",
                    ".js-remove-from-wishlist-button-wishlist",
                    function(e) {
                        e.preventDefault();
                        var a = t(this);
                        a.addClass("button-loading"),
                            t.ajax({
                                url: a.data("url"),
                                method: "DELETE",
                                success: function(e) {
                                    if (e.error)
                                        return (
                                            a.removeClass("button-loading"),
                                            window.showAlert(
                                                "alert-danger",
                                                e.message
                                            ), !1
                                        );
                                    window.showAlert(
                                            "alert-success",
                                            e.message
                                        ),
                                        t(".wishlist-count span").text(
                                            e.data.count
                                        ),
                                        a.removeClass("button-loading"),
                                        a.closest("tr").remove();
                                },
                                error: function(e) {
                                    a.removeClass("button-loading"),
                                        window.showAlert(
                                            "alert-danger",
                                            e.message
                                        );
                                },
                            });
                    }
                ),
                t(window).on("load", function() {
                    var e = t("#flash-sale-modal");
                    e.length &&
                        !(function(e) {
                            for (
                                var t = e + "=",
                                    a = document.cookie.split(";"),
                                    n = 0; n < a.length; n++
                            ) {
                                for (var o = a[n];
                                    " " == o.charAt(0);)
                                    o = o.substring(1);
                                if (0 == o.indexOf(t))
                                    return o.substring(t.length, o.length);
                            }
                            return "";
                        })(e.data("id")) &&
                        setTimeout(function() {
                            e.modal("show"),
                                (function(e, t, a) {
                                    var n = new Date(),
                                        o = new URL(window.siteUrl);
                                    n.setTime(
                                        n.getTime() + 24 * a * 60 * 60 * 1e3
                                    );
                                    var r = "expires=" + n.toUTCString();
                                    document.cookie =
                                        e +
                                        "=" +
                                        t +
                                        "; " +
                                        r +
                                        "; path=/; domain=" +
                                        o.hostname;
                                })(e.data("id"), 1, 1);
                        }, 5e3);
                }),
                t(document).on("click", ".js-quick-view-button", function(e) {
                    e.preventDefault();
                    var a = t("#quick-view-modal");
                    a.find(".quick-view-content").html(""),
                        a.find(".modal-body").addClass("modal-empty"),
                        a.find(".loading-spinner").show(),
                        a.modal("show"),
                        t.ajax({
                            url: t(e.currentTarget).data("url"),
                            type: "GET",
                            success: function(e) {
                                e.error ?
                                    (window.showAlert(
                                            "alert-danger",
                                            e.message
                                        ),
                                        a.modal("hide")) :
                                    (a.find(".loading-spinner").hide(),
                                        a
                                        .find(".modal-body")
                                        .removeClass("modal-empty"),
                                        a
                                        .find(".quick-view-content")
                                        .html(e.data),
                                        a
                                        .find(".product-image-slider")
                                        .slick({
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                            rtl: s,
                                            arrows: !1,
                                            fade: !1,
                                            asNavFor: ".slider-nav-thumbnails",
                                        }),
                                        a
                                        .find(".slider-nav-thumbnails")
                                        .slick({
                                            slidesToShow: 5,
                                            slidesToScroll: 1,
                                            rtl: s,
                                            asNavFor: ".product-image-slider",
                                            dots: !1,
                                            focusOnSelect: !0,
                                            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                                            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
                                        }),
                                        a
                                        .find(
                                            ".slider-nav-thumbnails .slick-slide"
                                        )
                                        .removeClass("slick-active"),
                                        a
                                        .find(
                                            ".slider-nav-thumbnails .slick-slide"
                                        )
                                        .eq(0)
                                        .addClass("slick-active"),
                                        a
                                        .find(".product-image-slider")
                                        .on(
                                            "beforeChange",
                                            function(e, t, n, o) {
                                                var r = o;
                                                a
                                                    .find(
                                                        ".slider-nav-thumbnails .slick-slide"
                                                    )
                                                    .removeClass(
                                                        "slick-active"
                                                    ),
                                                    a
                                                    .find(
                                                        ".slider-nav-thumbnails .slick-slide"
                                                    )
                                                    .eq(r)
                                                    .addClass(
                                                        "slick-active"
                                                    );
                                            }
                                        ),
                                        a
                                        .find(".product-image-slider")
                                        .lightGallery({
                                            selector: ".slick-slide:not(.slick-cloned) a",
                                            thumbnail: !0,
                                            share: !1,
                                            fullScreen: !1,
                                            autoplay: !1,
                                            autoplayControls: !1,
                                            actualSize: !1,
                                        }),
                                        t(".list-filter").each(function() {
                                            t(this)
                                                .find("a")
                                                .on("click", function(e) {
                                                    e.preventDefault(),
                                                        t(this)
                                                        .parent()
                                                        .siblings()
                                                        .removeClass(
                                                            "active"
                                                        ),
                                                        t(this)
                                                        .parent()
                                                        .toggleClass(
                                                            "active"
                                                        ),
                                                        t(this)
                                                        .parents(
                                                            ".attr-detail"
                                                        )
                                                        .find(".current-size")
                                                        .text(t(this).text()),
                                                        t(this)
                                                        .parents(
                                                            ".attr-detail"
                                                        )
                                                        .find(
                                                            ".current-color"
                                                        )
                                                        .text(
                                                            t(this).attr(
                                                                "data-color"
                                                            )
                                                        );
                                                });
                                        }));
                            },
                            error: function() {
                                a.modal("hide");
                            },
                        });
                });
            var d = t("#products-filter-ajax"),
                u = t(".products-listing");

            function p(e) {
                d.find("input, select, textarea").each(function(a, n) {
                    var o = t(n),
                        r = o.attr("name"),
                        s = e[r] || null;
                    if ("checkbox" === o.attr("type"))
                        o.prop("checked", !1),
                        Array.isArray(s) ?
                        o.prop("checked", s.includes(o.val())) :
                        o.prop("checked", !!s);
                    else
                        o.is("[name=max_price]") ?
                        o.val(s || o.data("max")) :
                        o.is("[name=min_price]") ?
                        o.val(s || o.data("min")) :
                        o.val() != s && o.val(s);
                    o.trigger("change");
                });
            }

            function m(e) {
                e || (e = d.serializeArray());
                var a = f(e),
                    n = !1;
                a &&
                    a.length &&
                    a.map(function(e) {
                        var t;
                        (t =
                            "[]" == e.name.substring(e.name.length - 2) ?
                            '[name="' +
                            e.name +
                            '"][value="' +
                            e.value +
                            '"]' :
                            '[name="' + e.name + '"]'),
                        d.find(t).length && (n = !0);
                    }),
                    t(".shop-filter-toogle").length &&
                    (n ?
                        t(".shop-filter-toogle").addClass("is-filtering") :
                        t(".shop-filter-toogle").removeClass(
                            "is-filtering"
                        ));
            }

            function f(e) {
                var t = [];
                return (
                    e.forEach(function(e) {
                        if (e.value) {
                            if (["min_price", "max_price"].includes(e.name))
                                if (
                                    d
                                    .find("input[name=" + e.name + "]")
                                    .data(e.name.substring(0, 3)) ==
                                    parseInt(e.value)
                                )
                                    return;
                            t.push(e);
                        }
                    }),
                    t
                );
            }

            function h(e) {
                for (
                    var t,
                        a =
                        arguments.length > 1 &&
                        void 0 !== arguments[1] &&
                        arguments[1],
                        n = e || window.location.search.substring(1),
                        o = /([^&=]+)=?([^&]*)/g,
                        r = /\+/g,
                        s = function(e) {
                            return decodeURIComponent(e.replace(r, " "));
                        },
                        i = {};
                    (t = o.exec(n));

                ) {
                    var l = s(t[1]),
                        c = s(t[2]);
                    "[]" == l.substring(l.length - 2) ?
                        (a && (l = l.substring(0, l.length - 2)),
                            (i[l] || (i[l] = [])).push(c)) :
                        (i[l] = c);
                }
                return i;
            }
            t(document).on(
                    "click",
                    ".clear_filter.clear_all_filter",
                    function(e) {
                        e.preventDefault(), p([]), d.trigger("submit");
                    }
                ),
                t(document).on("click", ".clear_filter.bf_icons", function(e) {
                    e.preventDefault();
                    var a,
                        n = t(e.currentTarget),
                        o = n.data("name"),
                        r = n.data("value");
                    if ("[]" == o.substring(o.length - 2))
                        if (
                            "checkbox" ===
                            (a = d.find(
                                '[name="' + o + '"][value="' + r + '"]'
                            )).attr("type")
                        )
                            a.prop("checked", !1);
                        else a.val(null);
                    else
                        switch (
                            (a = d.find('[name="' + o + '"]')).attr("name")
                        ) {
                            case "min_price":
                                a.val(a.data("min"));
                                break;
                            case "max_price":
                                a.val(a.data("max"));
                                break;
                            default:
                                a.val(null);
                        }
                    a && a.trigger("change"), d.trigger("submit");
                }),
                t(document).on(
                    "change",
                    ".product-category-select",
                    function() {
                        t(".product-cat-label").text(
                            t.trim(t(this).find("option:selected").text())
                        );
                    }
                ),
                t(".product-cat-label").text(
                    t.trim(t(".product-category-select option:selected").text())
                ),
                t(document).on("click", ".show-advanced-filters1", function(e) {
                    e.preventDefault(),
                        e.stopPropagation(),
                        t(this).toggleClass("active"),
                        t(".advanced-search-widgets1").slideToggle(500);
                }),
                t(document).on("click", ".show-advanced-filters2", function(e) {
                    e.preventDefault(),
                        e.stopPropagation(),
                        t(this).toggleClass("active"),
                        t(".advanced-search-widgets2").slideToggle(500);
                }),
                t(document).on("click", ".show-advanced-filters3", function(e) {
                    e.preventDefault(),
                        e.stopPropagation(),
                        t(this).toggleClass("active"),
                        t(".advanced-search-widgets3").slideToggle(500);
                }),
                t(document).on("click", ".show-advanced-filters", function(e) {
                    e.preventDefault(),
                        e.stopPropagation(),
                        t(this).toggleClass("active"),
                        t(".advanced-search-widgets").slideToggle(500);
                }),
                t(document).on("click", ".show-advanced-filters4", function(e) {
                    e.preventDefault(),
                        e.stopPropagation(),
                        t(this).toggleClass("active"),
                        t(".advanced-search-widgets4").slideToggle(500);
                }),
                t(document).on("click", ".show-advanced-filters5", function(e) {
                    e.preventDefault(),
                        e.stopPropagation(),
                        t(this).toggleClass("active"),
                        t(".advanced-search-widgets5").slideToggle(500);
                }),
                m(),
                d.length &&
                (t(document).on(
                        "submit",
                        "#products-filter-ajax",
                        function(e) {
                            e.preventDefault();
                            var n = t(e.currentTarget),
                                r = n.serializeArray(),
                                s = f(r),
                                i = [];
                            u.find("input").map(function(e, a) {
                                    var n = t(a);
                                    n.val() &&
                                        s.push({
                                            name: n.attr("name"),
                                            value: n.val(),
                                        });
                                }),
                                s.map(function(e) {
                                    i.push(
                                        encodeURIComponent(e.name) +
                                        "=" +
                                        e.value
                                    );
                                });
                            var l =
                                n.attr("action") +
                                (i && i.length ? "?" + i.join("&") : "");
                            s.push({ name: "s", value: 1 }),
                                t.ajax({
                                    url: n.attr("action"),
                                    type: "GET",
                                    data: s,
                                    beforeSend: function() {
                                        u.find(".list-content-loading").show(),
                                            window.closeShopFilterSection &&
                                            window.closeShopFilterSection(),
                                            t("html, body").animate({
                                                    scrollTop: d.offset().top -
                                                        t("header").height(),
                                                },
                                                500
                                            );
                                    },
                                    success: function(e) {
                                        0 == e.error ?
                                            (u.html(e.data),
                                                l != window.location.href &&
                                                window.history.pushState(
                                                    s,
                                                    e.message,
                                                    l
                                                ),
                                                m(r)) :
                                            a(e.message || "Opp!");
                                    },
                                    error: function(e) {
                                        o(e);
                                    },
                                    complete: function() {
                                        u.find(".list-content-loading").hide();
                                    },
                                });
                        }
                    ),
                    window.addEventListener(
                        "popstate",
                        function() {
                            var e =
                                window.location.origin +
                                window.location.pathname;
                            d.attr("action") == e ?
                                (p(h()), d.trigger("submit")) :
                                history.back();
                        }, !1
                    ),
                    t(document).on(
                        "click",
                        ".products-listing .pagination-page a",
                        function(e) {
                            e.preventDefault();
                            var a = t(e.currentTarget).attr("href");
                            a.includes(window.location.protocol) ||
                                (a = window.location.protocol + a);
                            var n = new URL(a).searchParams.get("page");
                            u.find("input[name=page]").val(n),
                                d.trigger("submit");
                        }
                    ),
                    t(document).on(
                        "click",
                        ".products_sortby .products_ajaxsortby a",
                        function(e) {
                            e.preventDefault();
                            var a = t(e.currentTarget),
                                n = a.attr("href"),
                                o = a.closest(".products_ajaxsortby");
                            if (
                                (o.find("a.selected").removeClass("selected"),
                                    a.addClass("selected"),
                                    n.indexOf("?") >= 0)
                            ) {
                                var r = n.substring(n.indexOf("?") + 1);
                                if (r) {
                                    var s = h(r);
                                    u.find(
                                        'input[name="' + o.data("name") + '"]'
                                    ).val(s[o.data("name")]);
                                }
                            }
                            d.trigger("submit");
                        }
                    ),
                    t(document).on(
                        "change",
                        ".category-filter-input",
                        function(e) {
                            var a = t(e.currentTarget),
                                n = a.prop("checked");
                            if (
                                (t(
                                        ".category-filter-input[data-parent-id=" +
                                        a.attr("data-id") +
                                        "]"
                                    ).each(function(e, a) {
                                        n
                                            ?
                                            t(a).prop("checked", !0) :
                                            t(a).prop("checked", !1);
                                    }),
                                    0 !== parseInt(a.attr("data-parent-id")))
                            ) {
                                var o = [],
                                    r = t(
                                        ".category-filter-input[data-parent-id=" +
                                        a.attr("data-parent-id") +
                                        "]"
                                    );
                                r.each(function(e, a) {
                                        t(a).is(":checked") && o.push(t(a).val());
                                    }),
                                    t(
                                        ".category-filter-input[data-id=" +
                                        a.attr("data-parent-id") +
                                        "]"
                                    ).prop("checked", o.length === r.length);
                            }
                        }
                    ));
        });
    })(jQuery);
})();


function handleTestClick() {
    console.log("test click");
    alert("dsfsfsfs");
}