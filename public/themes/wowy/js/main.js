!(function (e) {
    "use strict";
    var s = "rtl" === e("body").prop("dir");
    e(window).on("load", function () {
        e("#preloader-active").fadeOut(),
            e("body").css({ overflow: "visible" });
    });
    var a = e(".sticky-bar"),
        i = e(window),
        o = e("header.header-area");
    function t(e, s, a) {
        var i = e.closest(".widget-filter-item"),
            o = s,
            t = a;
        i.length &&
            "price" == i.data("type") &&
            ((o = o.format_price()), (t = t.format_price()));
        var n = e.find(".from"),
            l = e.find(".to");
        e.find("input.min-range").val(s),
            e.find("input.max-range").val(a),
            n.text(o),
            l.text(t);
    }
    i.on("scroll", function () {
        i.scrollTop() < 200
            ? (a.removeClass("stick"),
              o
                  .find(".categories-dropdown-active-large")
                  .hasClass("default-open") &&
                  (o.find(".categories-dropdown-active-large").addClass("open"),
                  o.find(".categories-button-active").addClass("open")))
            : (o.find(".categories-dropdown-active-large").removeClass("open"),
              o.find(".categories-button-active").removeClass("open"),
              a.addClass("stick"));
    }),
        e.scrollUp({
            scrollText: '<i class="fal fa-long-arrow-up"></i>',
            easingType: "linear",
            scrollSpeed: 900,
            animation: "fade",
        }),
        new WOW().init(),
        e(".sticky-sidebar").length &&
            e(".sticky-sidebar").theiaStickySidebar(),
        (Number.prototype.format_price = function (e, s) {
            var a = window.currencies || {};
            e || (e = null != a.number_after_dot ? a.number_after_dot : 2);
            var i = "\\d(?=(\\d{" + (s || 3) + "})+$)",
                o = "",
                t = this;
            return (
                a.show_symbol_or_title && (o = a.symbol || a.title),
                a.display_big_money &&
                    (t >= 1e6 && t < 1e9
                        ? ((t /= 1e6), (o = a.million + (o ? " " + o : "")))
                        : t >= 1e9 &&
                          ((t /= 1e9), (o = a.billion + (o ? " " + o : "")))),
                (t =
                    (t = (t = t.toFixed(Math.max(0, ~~e)))
                        .toString()
                        .split("."))[0]
                        .toString()
                        .replace(
                            new RegExp(i, "g"),
                            "$&" + a.thousands_separator
                        ) + (t[1] ? a.decimal_separator + t[1] : "")),
                a.show_symbol_or_title &&
                    (a.is_prefix_symbol ? (t = o + t) : (t += o)),
                t
            );
        }),
        e(".slider-range").length &&
            e(".slider-range").map(function (s, a) {
                var i = e(a),
                    o = i.closest(".range"),
                    n = o.find("input.min-range"),
                    l = o.find("input.max-range");
                i.slider({
                    range: !0,
                    min: n.data("min") || 0,
                    max: l.data("max") || 500,
                    values: [n.val() || 0, l.val() || 500],
                    slide: function (e, s) {
                        t(o, s.values[0], s.values[1]);
                    },
                }),
                    t(o, i.slider("values", 0), i.slider("values", 1));
            });
    var n = e(".hero-slider-1");
    n.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: s,
        speed: 500,
        autoplay: "yes" === n.data("autoplay"),
        infinite: "yes" === n.data("autoplay"),
        autoplaySpeed: n.data("autoplay-speed")
            ? n.data("autoplay-speed")
            : 3e3,
        fade: !0,
        loop: !0,
        dots: !0,
        arrows: !0,
        prevArrow:
            '<span class="slider-btn slider-prev"><i class="far fa-chevron-left"></i></span>',
        nextArrow:
            '<span class="slider-btn slider-next"><i class="far fa-chevron-right"></i></span>',
        appendArrows: ".hero-slider-1-arrow",
    }),
        e(".carousel-6-columns").each(function () {
            var a = e(this).attr("id"),
                i = "#" + a + "-arrows";
            e("#" + a).slick({
                dots: !1,
                infinite: !0,
                rtl: s,
                speed: 1e3,
                arrows: !0,
                autoplay: !1,
                slidesToShow: 6,
                slidesToScroll: 1,
                loop: !0,
                adaptiveHeight: !0,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: { slidesToShow: 4, slidesToScroll: 4 },
                    },
                    {
                        breakpoint: 480,
                        settings: { slidesToShow: 1, slidesToScroll: 1 },
                    },
                ],
                prevArrow:
                    '<span class="slider-btn slider-prev"><i class="far fa-chevron-left"></i></span>',
                nextArrow:
                    '<span class="slider-btn slider-next"><i class="far fa-chevron-right"></i></span>',
                appendArrows: i,
            });
        }),
        e(".carousel-4-columns").each(function () {
            var a = e(this).attr("id"),
                i = "#" + a + "-arrows";
            e("#" + a).slick({
                dots: !1,
                infinite: !0,
                rtl: s,
                speed: 1e3,
                arrows: !0,
                autoplay: !1,
                slidesToShow: 4,
                slidesToScroll: 1,
                loop: !0,
                adaptiveHeight: !0,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: { slidesToShow: 3, slidesToScroll: 3 },
                    },
                    {
                        breakpoint: 480,
                        settings: { slidesToShow: 1, slidesToScroll: 1 },
                    },
                ],
                prevArrow:
                    '<span class="slider-btn slider-prev"><i class="far fa-chevron-left"></i></span>',
                nextArrow:
                    '<span class="slider-btn slider-next"><i class="far fa-chevron-right"></i></span>',
                appendArrows: i,
            });
        }),
        e('button[data-bs-toggle="tab"]').on("shown.bs.tab", function () {
            e(".carousel-4-columns").slick("setPosition");
        });
    var l = function (e) {
        return (
            (window.trans = window.trans || {}),
            "undefined" !== window.trans[e] && window.trans[e]
                ? window.trans[e]
                : e
        );
    };
    e("[data-countdown]").each(function () {
        var s = e(this),
            a = e(this).data("countdown");
        s.countdown(a, function (s) {
            e(this).html(
                s.strftime(
                    '<span class="countdown-section"><span class="countdown-amount hover-up">%D</span><span class="countdown-period"> ' +
                        l("days") +
                        ' </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%H</span><span class="countdown-period"> ' +
                        l("hours") +
                        ' </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%M</span><span class="countdown-period"> ' +
                        l("mins") +
                        ' </span></span><span class="countdown-section"><span class="countdown-amount hover-up">%S</span><span class="countdown-period"> ' +
                        l("sec") +
                        " </span></span>"
                )
            );
        });
    }),
        e(".categories-button-active").on("click", function (s) {
            if (
                (s.preventDefault(),
                o.find(".categories-button-active").hasClass("cant-close") &&
                    !a.hasClass("stick"))
            )
                return !1;
            e(this).hasClass("open")
                ? (e(this).removeClass("open"),
                  e(this)
                      .siblings(".categories-dropdown-active-large")
                      .removeClass("open"),
                  o.find(".categories-button-active").hasClass("cant-close") ||
                      e(this)
                          .siblings(".categories-dropdown-active-large")
                          .removeClass("default-open"))
                : (e(this).addClass("open"),
                  e(this)
                      .siblings(".categories-dropdown-active-large")
                      .addClass("open"));
        });
    var r,
        c,
        d,
        p = e("#slider-range"),
        u = e("#amount");
    if (
        (p.length &&
            e(function () {
                p.slider({
                    range: !0,
                    min: 16,
                    max: 400,
                    values: [0, 300],
                    slide: function (e, s) {
                        u.val("$" + s.values[0] + " - $" + s.values[1]);
                    },
                }),
                    u.val(
                        "$" +
                            p.slider("values", 0) +
                            " - $" +
                            p.slider("values", 1)
                    );
            }),
        e(".sort-by-product-area").length)
    ) {
        var v = e("body"),
            g = e(".sort-by-product-area"),
            h = g.find(".sort-by-dropdown");
        v.on(
            "click",
            ".sort-by-product-area .sort-by-product-wrap",
            function (s) {
                s.preventDefault();
                var a = e(this);
                a.parent().hasClass("show")
                    ? a
                          .siblings(".sort-by-dropdown")
                          .removeClass("show")
                          .closest(".sort-by-product-area")
                          .removeClass("show")
                    : a
                          .siblings(".sort-by-dropdown")
                          .addClass("show")
                          .closest(".sort-by-product-area")
                          .addClass("show");
            }
        ),
            v.on("click", function (s) {
                var a = s.target;
                e(a).is(".sort-by-product-area") ||
                    e(a).parents().is(".sort-by-product-area") ||
                    !g.hasClass("show") ||
                    (g.removeClass("show"), h.removeClass("show"));
            });
    }
    e(".shop-filter-toogle").on("click", function (s) {
        s.preventDefault(),
            e(".shop-product-filter-header").slideToggle(),
            e(".shop-filter-toogle").toggleClass("active");
    }),
        (window.closeShopFilterSection = function () {
            e(".shop-filter-toogle").hasClass("active") &&
                (e(".shop-product-filter-header").slideToggle(),
                e(".shop-filter-toogle").removeClass("active"));
        }),
        e(".pro-dec-big-img-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: s,
            arrows: !1,
            draggable: !1,
            fade: !1,
            asNavFor: ".product-dec-slider-small , .product-dec-slider-small-2",
        }),
        e(".product-dec-slider-small").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            rtl: s,
            asNavFor: ".pro-dec-big-img-slider",
            dots: !1,
            focusOnSelect: !0,
            fade: !1,
            arrows: !1,
            responsive: [
                { breakpoint: 991, settings: { slidesToShow: 3 } },
                { breakpoint: 767, settings: { slidesToShow: 4 } },
                { breakpoint: 575, settings: { slidesToShow: 2 } },
            ],
        }),
        e(".img-popup").length &&
            e(".img-popup").magnificPopup({
                type: "image",
                gallery: { enabled: !0 },
            }),
        e(".grid").length &&
            e(".grid").imagesLoaded(function () {
                e(".grid").isotope({
                    itemSelector: ".grid-item",
                    percentPosition: !0,
                    layoutMode: "masonry",
                    masonry: { columnWidth: ".grid-item" },
                });
            }),
        (r = e(".search-active")),
        (c = e(".search-close")),
        (d = e(".main-search-active")),
        r.on("click", function (e) {
            e.preventDefault(), d.addClass("search-visible");
        }),
        c.on("click", function () {
            d.removeClass("search-visible");
        }),
        (function () {
            var s = e(".burger-icon"),
                a = e(".mobile-menu-close"),
                i = e(".mobile-header-active"),
                o = e("body");
            o.prepend('<div class="body-overlay-1"></div>'),
                s.on("click", function (e) {
                    e.preventDefault(),
                        i.addClass("sidebar-visible"),
                        o.addClass("mobile-menu-active");
                }),
                a.on("click", function () {
                    i.removeClass("sidebar-visible"),
                        o.removeClass("mobile-menu-active");
                }),
                e(".body-overlay-1").on("click", function () {
                    i.removeClass("sidebar-visible"),
                        o.removeClass("mobile-menu-active");
                });
        })();
    var f = e(".mobile-menu"),
        m = f.find(".dropdown");
    m
        .parent()
        .prepend(
            '<span class="menu-expand"><i class="far fa-chevron-down"></i></span>'
        ),
        m.slideUp(),
        f.on("click", "li a, li .menu-expand", function (s) {
            var a = e(this);
            a
                .parent()
                .attr("class")
                .match(
                    /\b(menu-item-has-children|has-children|has-sub-menu)\b/
                ) &&
                ("#" === a.attr("href") || a.hasClass("menu-expand")) &&
                (s.preventDefault(),
                a.siblings("ul:visible").length
                    ? (a.parent("li").removeClass("active"),
                      a.siblings("ul").slideUp())
                    : (a.parent("li").addClass("active"),
                      a
                          .closest("li")
                          .siblings("li")
                          .removeClass("active")
                          .find("li")
                          .removeClass("active"),
                      a
                          .closest("li")
                          .siblings("li")
                          .find("ul:visible")
                          .slideUp(),
                      a.siblings("ul").slideDown()));
        }),
        e(".mobile-language-active").on("click", function (s) {
            s.preventDefault(),
                e(this)
                    .closest(".single-mobile-header-info")
                    .find(".lang-dropdown-active")
                    .slideToggle(900);
        }),
        e(".categories-button-active-2").on("click", function (s) {
            s.preventDefault(),
                e(".categories-dropdown-active-small").slideToggle(900);
        }),
        e(
            ".mobile-menu-wrap .main-categories-wrap .categories-dropdown-wrap .menu-expand"
        ).on("click", function (s) {
            s.preventDefault(),
                e(this).closest("li").find(".dropdown").slideToggle(900);
        }),
        e(".more_slide_open").slideUp(),
        e(".more_categories").on("click", function () {
            e(this).toggleClass("show"), e(".more_slide_open").slideToggle();
        }),
        e("#news-flash").vTicker({
            speed: 500,
            pause: 3e3,
            animation: "fade",
            mousePause: !1,
            showItems: 1,
        }),
        new WOW().init(),
        e(document).ready(function () {
            !(function () {
                var a = e(".product-image-slider");
                if (a.length) {
                    a.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        rtl: s,
                        arrows: !1,
                        fade: !1,
                        asNavFor: ".slider-nav-thumbnails",
                    }),
                        e(".slider-nav-thumbnails").slick({
                            slidesToShow: 5,
                            slidesToScroll: 1,
                            rtl: s,
                            asNavFor: ".product-image-slider",
                            dots: !1,
                            focusOnSelect: !0,
                            prevArrow:
                                '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
                            nextArrow:
                                '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
                        });
                    var i = e(".slider-nav-thumbnails .slick-slide");
                    i.removeClass("slick-active"),
                        i.eq(0).addClass("slick-active"),
                        a.on("beforeChange", function (e, s, a, o) {
                            var t = o;
                            i.removeClass("slick-active"),
                                i.eq(t).addClass("slick-active");
                        }),
                        a.lightGallery({
                            selector: ".slick-slide:not(.slick-cloned) a",
                            thumbnail: !0,
                            share: !1,
                            fullScreen: !1,
                            autoplay: !1,
                            autoplayControls: !1,
                            actualSize: !1,
                        });
                }
                e(".list-filter").each(function () {
                    e(this)
                        .find("a")
                        .on("click", function (s) {
                            s.preventDefault(),
                                e(this)
                                    .parent()
                                    .siblings()
                                    .removeClass("active"),
                                e(this).parent().toggleClass("active"),
                                e(this)
                                    .parents(".attr-detail")
                                    .find(".current-size")
                                    .text(e(this).text()),
                                e(this)
                                    .parents(".attr-detail")
                                    .find(".current-color")
                                    .text(e(this).attr("data-color"));
                        });
                }),
                    e(document).on(
                        "click",
                        ".dropdown-menu .cart_list",
                        function (e) {
                            e.stopPropagation();
                        }
                    ),
                    e(".ps-list--categories").length > 0 &&
                        e(
                            ".ps-list--categories .menu-item-has-children > .sub-toggle"
                        ).on("click", function (s) {
                            s.preventDefault();
                            var a = e(this).parent(".menu-item-has-children");
                            e(this).toggleClass("active"),
                                a
                                    .siblings()
                                    .find(".sub-toggle")
                                    .removeClass("active"),
                                a.children(".sub-menu").slideToggle(350),
                                a.siblings().find(".sub-menu").slideUp(350),
                                a.hasClass("has-mega-menu") &&
                                    (a.children(".mega-menu").slideToggle(350),
                                    a
                                        .siblings(".has-mega-menu")
                                        .find(".mega-menu")
                                        .slideUp(350));
                        });
            })();
        });
})(jQuery);










/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {
        init : function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent : function () {
            var base = this, url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn : function () {
            var base = this;

            base.$elem.data({
                "owl-originalStyles": base.$elem.attr("style"),
                "owl-originalClasses": base.$elem.attr("class")
            });

            base.$elem.css({opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars : function () {
            var base = this;
            if (base.$elem.children().length === 0) {return false; }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup : function () {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            base.$elem.find(".owl-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate : function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars : function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload : function () {
            var base = this;
            window.setTimeout(function () {
                base.updateVars();
            }, 0);
        },

        watchVisibility : function () {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapItems : function () {
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
        },

        baseClass : function () {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updateItems : function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) {return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition : function () {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendItemsSizes : function () {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$owlItems.each(function (index) {
                var $this = $(this);
                $this
                    .css({"width": base.itemWidth})
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("owl-roundPages", roundPages);
            });
        },

        appendWrapperSizes : function () {
            var base = this,
                width = base.$owlItems.length * base.itemWidth;

            base.$owlWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        calculateAll : function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth : function () {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },

        max : function () {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min : function () {
            return 0;
        },

        loops : function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class" : "owl-prev",
                "html" : base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class" : "owl-next",
                "html" : base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination : function () {
            var base = this;

            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }
            });
        },

        updatePagination : function () {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {
                        "class" : "owl-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination : function () {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper
                        .find(".owl-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation : function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls : function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        },

        destroyControls : function () {
            var base = this;
            if (base.owlControls) {
                base.owlControls.remove();
            }
        },

        next : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo : function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo : function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        },

        afterGo : function () {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop : function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp : function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed : function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate : function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d : function (value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        },

        css2move : function (value) {
            var base = this;
            base.$owlWrapper.css({"left" : value});
        },

        css2slide : function (value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate({
                "left" : value
            }, {
                duration : speed || base.options.slideSpeed,
                complete : function () {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser : function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },

        moveEvents : function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes : function () {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl",
                    "touchmove.owl",
                    "touchend.owl touchcancel.owl"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.owl",
                    "mousemove.owl",
                    "mouseup.owl"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents :  function () {
            var base = this;
            base.$elem.on("dragstart.owl", function (event) { event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures : function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },

        getNewPosition : function () {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition  = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },
        closestItem : function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection : function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents : function () {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("owl.next", function () {
                base.next();
            });
            base.$elem.on("owl.prev", function () {
                base.prev();
            });
            base.$elem.on("owl.play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("owl.stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("owl.goTo", function (event, item) {
                base.goTo(item);
            });
            base.$elem.on("owl.jumpTo", function (event, item) {
                base.jumpTo(item);
            });
        },

        stopOnHover : function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    base.stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        },

        lazyLoad : function () {
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$owlItems[i]);

                if ($item.data("owl-loaded") === "loaded") {
                    continue;
                }

                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");

                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("owl-loaded", "loaded");
                    continue;
                }
                if ($item.data("owl-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    $lazyImg.each(function() {
                        base.lazyPreload($item, $(this));
                    });
                }
            }
        },

        lazyPreload : function ($item, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight : function () {
            var base = this,
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function () {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg : function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisibleItems : function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        },

        singleItemTransition : function () {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$owlItems.eq(base.currentItem),
                $prevItem = base.$owlItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$owlWrapper
                .addClass('owl-origin')
                .css({
                    "-webkit-transform-origin" : origin + "px",
                    "-moz-perspective-origin" : origin + "px",
                    "perspective-origin" : origin + "px"
                });
            function transStyles(prevPos) {
                return {
                    "position" : "relative",
                    "left" : prevPos + "px"
                };
            }

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () {
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
                });

            $currentItem
                .addClass(inClass)
                .on(animEnd, function () {
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
                });
        },

        clearTransStyle : function (item, classToRemove) {
            var base = this;
            item.css({
                "position" : "",
                "left" : ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        owlStatus : function () {
            var base = this;
            base.owl = {
                "userOptions"   : base.userOptions,
                "baseElement"   : base.$elem,
                "userItems"     : base.$userItems,
                "owlItems"      : base.$owlItems,
                "currentItem"   : base.currentItem,
                "prevItem"      : base.prevItem,
                "visibleItems"  : base.visibleItems,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
            };
        },

        clearEvents : function () {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
        },

        unWrap : function () {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) {
                    base.owlControls.remove();
                }
            }
            base.clearEvents();
            base.$elem.attr({
                style: base.$elem.data("owl-originalStyles") || "",
                class: base.$elem.data("owl-originalClasses")
            });
        },

        destroy : function () {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit : function (newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addItem : function (htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) {return false; }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removeItem : function (targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        }

    };

    $.fn.owlCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
        });
    };

    $.fn.owlCarousel.options = {

        items : 5,
        itemsCustom : false,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : false,
        stopOnHover : false,

        navigation : false,
        navigationText : ["prev", "next"],
        rewindNav : true,
        scrollPerPage : false,

        pagination : true,
        paginationNumbers : false,

        responsive : true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth : window,

        baseClass : "owl-carousel",
        theme : "owl-theme",

        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        autoHeight : false,

        jsonPath : false,
        jsonSuccess : false,

        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,

        addClassActive : false,
        transitionStyle : false,

        beforeUpdate : false,
        afterUpdate : false,
        beforeInit : false,
        afterInit : false,
        beforeMove : false,
        afterMove : false,
        afterAction : false,
        startDragging : false,
        afterLazyLoad: false
    };
}(jQuery, window, document));

// ------------------------------------------------------------------------------------------------------------------------------

/* --------------------------------

Horizontal Timeline 2.0
by Studocwho @ yCodeTech

Version: 2.0.5.3

Original Horizontal Timeline by CodyHouse

Licensed under the MIT license

Docs at http://horizontal-timeline.ycodetech.co.uk

-------------------------------- */


// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

	// undefined is used here as the undefined global
	// variable in ECMAScript 3 and is mutable (i.e. it can
	// be changed by someone else). undefined isn't really
	// being passed in so we can ensure that its value is
	// truly undefined. In ES5, undefined can no longer be
	// modified.

	// window and document are passed through as local
	// variables rather than as globals, because this (slightly)
	// quickens the resolution process and can be more
	// efficiently minified (especially when both are
	// regularly referenced in your plugin).

	// Create the defaults once
	var pluginName = 'horizontalTimeline',
		defaults = {
			// ! Deprecate these individual options in favour of the object options. //

			desktopDateIntervals: 200,   //************\\
			tabletDateIntervals: 150,   // Minimum: 120 \\
			mobileDateIntervals: 120,  //****************\\
			minimalFirstDateInterval: true,

			// ! End Deprecated options //

			/* New object options... */
			// If the deprecated single options exist in the user options, then use them,
			// otherwise default to the new object options.

			// Can not use in conjunction with the single options...
			// If both single and object options are set in the options, the object will take precedence.

			dateIntervals: {
				"desktop": 200,   //************\\
				"tablet": 150,   // Minimum: 120 \\
				"mobile": 120,  //****************\\
				"minimal": true
			},

			/* End new object options */

			dateDisplay: "dateTime", // dateTime, date, time, dayMonth, monthYear, year
			dateOrder: "normal", // normal, reverse

			autoplay: false,
			autoplaySpeed: 8, // Sec
			autoplayPause_onHover: false,

			useScrollWheel: false,
			useTouchSwipe: true,
			useKeyboardKeys: false,
			addRequiredFile: true,
			useFontAwesomeIcons: true,
			useNavBtns: true,
			useScrollBtns: true,

			// ! Deprecate these individual options in favour of the object options. //

			iconBaseClass: "fas fa-3x", // Space separated class names
			
			prev_iconClass: "fa-arrow-circle-left",
			next_iconClass: "fa-arrow-circle-right",
			pause_iconClass: "fa-pause-circle",
			play_iconClass: "fa-play-circle",

			animation_baseClass: "animationSpeed", // Space separated class names
			enter_animationClass: {
				"left": "enter-left",
				"right": "enter-right"
			},
			exit_animationClass: {
				"left": "exit-left",
				"right": "exit-right"
			},

			// ! End Deprecated options //

			/* New object options... */
			// If the deprecated single options exist in the user options, then use them,
			// otherwise default to the new object options.

			// Can not use in conjunction with the single options...
			// If both single and object options are set in the options, the object will take precedence.

			iconClass: {
				"base": "fas fa-3x", // Space separated class names
				
				"prev": "fa-arrow-circle-left",
				"next": "fa-arrow-circle-right",
				"pause": "fa-pause-circle",
				"play": "fa-play-circle"
			},
			animationClass: {
				"base": "animationSpeed", // Space separated class names,
				"enter": {
					"left": "enter-left",
					"right": "enter-right"
				},
				"exit": {
					"left": "exit-left",
					"right": "exit-right"
				}
			}
			/* End new object options */
		};

	// The actual plugin constructor
	function Timeline( element, options ) {
		this.element = element;

		// jQuery has an extend method that merges the
		// contents of two or more objects, storing the
		// result in the first object. The first object
		// is generally empty because we don't want to alter
		// the default options for future instances of the plugin
		// (deep recursive copy for nested objects, empty object, the defaults object, the options object)
		this.settings = $.extend(true, {}, defaults, options);

		this._defaults = defaults;
		this._options = (options != undefined)? options : "Nothing overridden";
		this._name = pluginName;
		this.$element = $(element);

		this.init();
	}
	Timeline.prototype = {
		init: function () {
			// You already have access to the DOM element and
			// the options via the instance, e.g. this.element
			// and this.settings
			var dataAttribute = this._eventContentListData(),
			    contentList = this.$element.find('li['+ dataAttribute +']');
			if(contentList.length == 0) {
				var text = "There are no events at this point in time. Please add some content.";

				this.$element.css('opacity', 1).append('<h3>'+ text +'</h3>');
				throw new Error(text);
			}
			
			if (this.settings.useFontAwesomeIcons == true) {
				var url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css";

				// Function to load the file
				// (url, type)
				this._addFile(url, 'css');
			}
			this._create();

			// Wait about 300s to make sure the all elements are created properly.
			// Otherwise the width of the timeline would report as bigger than it actually is.
			window.setTimeout($.proxy(function(){
				var timelineTotalWidth,
					timelineComponents = {};

				this._addIdsAndClasses(timelineComponents);

				this._timelineComponents(timelineComponents);

				//** Select the correct event **//

				// If any events-content has .selected class...
				if (timelineComponents['eventsContentList'].hasClass('selected')) {
						// Get date from data-attribute
						var date = this._timelineData(timelineComponents['eventsContentSelected'], "date"),
							// Find the event date matching the date
							selectedDate = timelineComponents['eventsWrapper'].find("a").filter($.proxy(function(index, element) {
								var data = this._timelineData($(element), "date");
								if (data == date) return $(element);
							}, this));

					// Add .selected class to the matched element
					selectedDate.addClass('selected');
					// Update all previous dates for styling.
					this._updateOlderEvents(selectedDate);
				}
				// If no class found at all...
				else {
					// If dateOrder is normal (Ascending)... start from the left.
					if (this.settings.dateOrder == "normal") {
						// Add .selected class to the first event.
						timelineComponents['eventsWrapper'].find('a.first').addClass('selected');

							// Find the selected event
						var selectedEvent = timelineComponents['eventsWrapper'].find('a.selected'),
							// Get the selected event's date.
							selectedDate = this._timelineData(selectedEvent, "date");

						// Find the selected event's content using the date and add selected class to the content.
						timelineComponents['eventsContentList'].filter($.proxy(function(index, element) {
							var data = this._timelineData($(element), "date");
							if (data == selectedDate) $(element).addClass('selected');
						}, this));
					}
					// Else dateOrder is reverse (Descending)... start from the right.
					else if (this.settings.dateOrder == "reverse") {
						// Add .selected class to the last event.
						timelineComponents['eventsWrapper'].find('a.last').addClass('selected');

							// Find the selected event
						var selectedEvent = timelineComponents['eventsWrapper'].find('a.selected'),
							// Get the selected event's date.
							selectedDate = this._timelineData(selectedEvent, "date");

						// Find the selected event's content using the date and add selected class to the content.
						timelineComponents['eventsContentList'].filter($.proxy(function(index, element) {
							var data = this._timelineData($(element), "date");
							if (data == selectedDate) $(element).addClass('selected');
						}, this));


						this._updateOlderEvents(selectedEvent);
					}
				}

				// Assign a left postion to the single events along the timeline
				this._setDatePosition(timelineComponents);
				// Assign a width to the timeline
				timelineTotalWidth = this._setTimelineWidth(timelineComponents);
				// Set the filling line to the selected event
				this._updateFilling(timelineComponents['eventsWrapper']
					.find('a.selected'), timelineComponents['fillingLine'], timelineTotalWidth);
				// The timeline has been initialised - show it
				this.$element.addClass('loaded');
				
				/* Custom namespaced event: initialised with the data passed to the event as the instance and timelineSelector (jQuery object). */
				this.$element.trigger({
					type: "initialised."+this._name,
					instance: this,
					timelineSelector: this.$element
				});

				this._setup(this, timelineComponents, timelineTotalWidth);
			}, this), 300);

		}, // End init function

		_addIdsAndClasses: function (timelineComponents) {
			//** Adding IDs and Classes **//
			this._timelineComponents(timelineComponents);

			if (timelineComponents['eventsContentList'].length == 1) {
				timelineComponents['eventsContentList'].first().attr('id', 'first');
				timelineComponents['timelineEvents'].first().addClass("first");
			}
			else {
				// Check if the deprecated single options are defined in the user options, if they are use them,
				// otherwise use the new object options.

				// A variable to include in an if statement that queries if the single option is defined 
				// AND the object option is also defined.
				var bothDefined = (this._options.animation_baseClass != undefined && this._options.animationClass != undefined),

					// If single option are undefined OR both single and object options are defined
					// then default to the object options, otherwise use the deprecated single option.
					animationObj = (this._options.animation_baseClass == undefined || bothDefined) ? this.settings.animationClass : this.settings,

					// If animationObj equals the object options...
					animationBase = (animationObj == this.settings.animationClass) ? animationObj.base : animationObj.animation_baseClass;

				// Adds id to the first and last li of the event-content list respectively.
				timelineComponents['eventsContentList'].addClass(animationBase)
					.first().attr('id', 'first').end()
					.last().attr('id', 'last');

				// Adds class to the first and last timeline event dates respectively.
				timelineComponents['timelineEvents']
					.first().addClass("first").end()
					.last().addClass("last");
			}
		}, // End _addIdsAndClasses

		/* Dynamically creates the timeline according to the amount of events. */
		_create: function () {
			var timelineHTML = "",

				// All buttons uses Font Awesome for the icons
				// Icons require Font Awesome CSS
				// The CSS file has been added to the document if not already present.

				// Check if the deprecated single options are defined in the user options, if they are use them,
				// otherwise use the new object options.

				// Set the single options into an array to check against.
				optionArray = [this._options.iconBaseClass, 
					this._options.scrollLeft_iconClass, 
					this._options.scrollRight_iconClass, 
					this._options.prev_iconClass, 
					this._options.next_iconClass, 
					this._options.pause_iconClass],

				// A variable to include in an if statement that queries if the single options are undefined.
				singleUndefined = (optionArray[0] == undefined 
					&& optionArray[1] == undefined 
					&& optionArray[2] == undefined 
					&& optionArray[3] == undefined 
					&& optionArray[4] == undefined 
					&& optionArray[5] == undefined),

				// A variable to include in an if statement that queries if the single option is defined 
				// AND the object option is also defined.
				bothDefined = (optionArray[0] != undefined && this._options.iconClass != undefined)
					|| (optionArray[1] != undefined && this._options.iconClass != undefined) 
					|| (optionArray[2] != undefined && this._options.iconClass != undefined)
					|| (optionArray[3] != undefined && this._options.iconClass != undefined)
					|| (optionArray[4] != undefined && this._options.iconClass != undefined)
					|| (optionArray[5] != undefined && this._options.iconClass != undefined),

				// If single option are undefined OR both single and object options are defined
				// then default to the object options, otherwise use the deprecated single option.
				iconClass = (singleUndefined || bothDefined) ? this.settings.iconClass : this.settings,

				// If iconClass equals the object options...
				
				iconBase = (iconClass == this.settings.iconClass) ? iconClass.base : iconClass.iconBaseClass,

				iconScrollLeft = (iconClass == this.settings.iconClass) ? iconClass.scrollLeft : iconClass.scrollLeft_iconClass,
				
				iconScrollRight = (iconClass == this.settings.iconClass) ? iconClass.scrollRight : iconClass.scrollRight_iconClass,
				
				iconPrev = (iconClass == this.settings.iconClass) ? iconClass.prev : iconClass.prev_iconClass,
				
				iconNext = (iconClass == this.settings.iconClass) ? iconClass.next : iconClass.next_iconClass,
				
				iconPause = (iconClass == this.settings.iconClass) ? iconClass.pause : iconClass.pause_iconClass,

				// Left Nav
				$scrollLeftButton = '<a href="" class="'+ iconBase +' '+ iconScrollLeft +' scroll-left inactive"></a>',
				$prevButton = '<a href="" class="'+ iconBase +' '+ iconPrev +' prev inactive"></a>',

				// Right Nav
				$nextButton = '<a href="" class="'+ iconBase +' '+ iconNext +' next"></a>',
				$scrollRightButton = '<a href="" class="'+ iconBase +' '+ iconScrollRight +' scroll-right"></a>',

				// Pause button
				$pauseButton = '<a href="" class="'+ iconBase +' '+ iconPause +' pause"></a>';

			//** Create the timeline HTML **//

			timelineHTML += '<div class="timeline">';

			if (this.settings.useNavBtns == true || this.settings.useScrollBtns == true) {
				// Add the left nav.
				timelineHTML += '<div class="timeline-navigation" id="leftNav">'

				if (this.settings.useNavBtns == false && this.settings.useScrollBtns == true)
					// Add the scroll left button.
					timelineHTML += $scrollLeftButton;

				else if (this.settings.useNavBtns == true && this.settings.useScrollBtns == false)
					// Add the prev button.
					timelineHTML += $prevButton;

				else if (this.settings.useNavBtns == true && this.settings.useScrollBtns == true)
					// Add the scroll left button and the prev button.
					timelineHTML += $scrollLeftButton + $prevButton;

				timelineHTML += '</div>'

					+'<div class="events-wrapper"><div class="events"><span class="filling-line" aria-hidden="true"></span></div></div>'
					
					// Add the right nav.
					+'<div class="timeline-navigation" id="rightNav">';

				if (this.settings.useNavBtns == false && this.settings.useScrollBtns == true)
					// Add the scroll right button.
					timelineHTML += $scrollRightButton;

				else if (this.settings.useNavBtns == true && this.settings.useScrollBtns == false)
					// Add the next button.
					timelineHTML += $nextButton;

				else if (this.settings.useNavBtns == true && this.settings.useScrollBtns == true)
					// Add the next button and the scroll right button.
					timelineHTML += $nextButton + $scrollRightButton;

				timelineHTML += '</div>';
			}
			else {
				timelineHTML += '<div class="events-wrapper" style="min-width: 100%"><div class="events"><span class="filling-line" aria-hidden="true"></span></div></div>';
			}
			if (this.settings.autoplay == true)
				timelineHTML += '<div class="timeline-navigation" id="pausePlay">'
					+ $pauseButton
					+'</div>';

			timelineHTML +='</div>';

			// Prepend the timeline HTML to the element (before the event content).
			this.$element.prepend(timelineHTML);

			//** Create the HTML for the event date display **//
			this._createDate(this, 'append');

		}, // End create() function

		// (instance, insertMethod (append, before, after [last 2 for addEvent method]), date to insert before/after [from addEvent method])
		_createDate: function (self, insertMethod, arrangementDate) {
			var dataAttribute = this._eventContentListData();

			// If dateOrder is normal (starting from the left).
			if (self.settings.dateOrder == "normal") {
				// Find the event content.
				var $element = self.$element.children('.events-content').find('li['+ dataAttribute +']');
			}
			// Else if dateOrder is reverse (starting from the right).
			else if (self.settings.dateOrder == "reverse") {
				var $element = $(self.$element.children('.events-content').find('li['+ dataAttribute +']').get().reverse());
			}

			/* dateTime = the date and time */
			if(self.settings.dateDisplay == "dateTime") {
				$element.each(function() {
					self._eventDateDisplay(self, $(this), "dateTime", insertMethod, arrangementDate);
				});
			}
			/* date = the date only */
			else if (self.settings.dateDisplay == "date") {
				$element.each(function() {
					self._eventDateDisplay(self, $(this), "date", insertMethod, arrangementDate);
				});
			}
			/* time = the time only */
			else if (self.settings.dateDisplay == "time") {
				$element.each(function() {
					self._eventDateDisplay(self, $(this), "time", insertMethod, arrangementDate);
				});
			}
			/* dayMonth = the day and monthName only */
			else if (self.settings.dateDisplay == "dayMonth") {
				$element.each(function() {
					self._eventDateDisplay(self, $(this), "dayMonth", insertMethod, arrangementDate);
				});
			}
			/* monthYear = the monthName and year only */
			else if (self.settings.dateDisplay == "monthYear") {
				$element.each(function() {
					self._eventDateDisplay(self, $(this), "monthYear", insertMethod, arrangementDate);
				});
			}
			/* year = the year only */
			else if (self.settings.dateDisplay == "year") {
				$element.each(function() {
					self._eventDateDisplay(self, $(this), "year", insertMethod, arrangementDate);
				});
			}
		},// End _createDate

		/* Function to create the event date display
		(instance, element, displayType, insertMethod (append, before, after [last 2 for addEvent method]), date to insert before/after [from addEvent method])*/
		_eventDateDisplay: function (self, eventElement, display, insertMethod, arrangementDate) {
				// Get date from data-attribute
			var dataDate = self._timelineData(eventElement, "date"),
				// Check if element data-date format is DD/MM/YYYYTHH:MM by checking for 'T'
				isDateTime = dataDate.includes("T"),
				// Check if element data-date format is HH:MM by checking for ':' but doesn't have 'T'
				isTime = !isDateTime && dataDate.includes(":"),
				// Display type checks
				dateTimeDisplay = display == "dateTime",
				dateDisplay = display == "date",
				timeDisplay = display == "time",
				dayMonthDisplay = display == "dayMonth",
				monthYearDisplay = display == "monthYear",
				yearDisplay = display == "year",
				// Find .events for the date display
				$eventDateDisplay = self.$element.find('.events'),
				dateLink = '<a href="" data-horizontal-timeline=\'{"date": "'+ dataDate +'"}\'>';

				// For use with the addEvent public method.
				// If arrangementDate isn't undefined or null...
				if(typeof arrangementDate != 'undefined' || arrangementDate != null) {
					// Finds the event with the specific date.
					var $arrangementEvent = $eventDateDisplay.find("a").filter(function() {
						var data = self._timelineData($(this), "date");
						if (data == arrangementDate) return $(this);
					});
				}

			// Function to add the number suffix st, nd, rd, th (eg: 1st, 2nd, 3rd, 4th)
			// Part of answer on StackOverflow: https://stackoverflow.com/a/15397495/2358222
			function numSuffix(num) {
				if (num > 3 && num < 21) return 'th';
				switch (num % 10) {
					case 1:  return "st";
					case 2:  return "nd";
					case 3:  return "rd";
					default: return "th";
				}
			}
			// Function to get the month name according to a number supplied.
			// Answer on StackOverflow: https://stackoverflow.com/a/10996297/2358222
			function getMonthName(num) {
				// Create an array of the months, with the index 0 = null,
				// so that we can get the month by its corresponding index number.
				var monthNames = [null, "January", "February", "March", "April", "May", "June",
								"July", "August", "September", "October", "November", "December" ];
				return monthNames[num];
			}

			var dateExists = $eventDateDisplay.children('a').map(function() {
					if ($(this).data('horizontal-timeline')) {
						var data = $(this).data('horizontal-timeline');

						return data.date;
					}
					// data-date deprecated as of v2.0.5.alpha.3
					// and will be removed in a later major version.
					else {
						var dataDate = $(this).data('date');

						return dataDate;
					}
				}).get();

			if(jQuery.inArray(dataDate, dateExists) == -1) {
				// Date and Time format (DD/MM/YYYYTHH:MM)
				if (isDateTime){
						// Separate the date at point of T, to get individually date and time
					var dateSplit = dataDate.split('T'),
						// Date
						date = dateSplit[0],
						// Time
						time = dateSplit[1],
						// Separate the date at point of /, to get individual date parts
						dateParts = date.split('/'),
						// Remove the leading 0 (zero) from the day
						dayPart = dateParts[0].replace(/^0+/, ''),
						// Remove the leading 0 (zero) from the month
						monthPart = dateParts[1].replace(/^0+/, ''),
						yearPart = dateParts[2];

					/* Add the event date displays according to the display types */

					// Custom Date Display

					// Get the custom text from the data-attribute object.
					var customDisplay = self._timelineData(eventElement, "customDisplay");

					// If customDisplay is defined in the data-attribute object...
					if(typeof customDisplay !== 'undefined') {


						// Add in the custom Text depending on which insertMethod used.
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + customDisplay +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + customDisplay +'</a>');
						else $arrangementEvent.before(dateLink + customDisplay +'</a>');
					}

					else if(dateTimeDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + date +'<br>'+ time +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + date +'<br>'+ time +'</a>');
						else $arrangementEvent.before(dateLink + date +'<br>'+ time +'</a>');
					}
					else if(dateDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + date +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + date +'</a>');
						else $arrangementEvent.before(dateLink + date +'</a>');
					}
					else if(timeDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + time +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + time +'</a>');
						else $arrangementEvent.before(dateLink + time +'</a>');
					}
					else if(dayMonthDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + dayPart + numSuffix(dayPart) + '<br>' + getMonthName(monthPart) +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + dayPart + numSuffix(dayPart) + '<br>' + getMonthName(monthPart) +'</a>');
						else $arrangementEvent.before(dateLink + dayPart + numSuffix(dayPart) + '<br>' + getMonthName(monthPart) +'</a>');
					}
					else if(monthYearDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + getMonthName(monthPart) + '<br>' + yearPart +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + getMonthName(monthPart) + '<br>' + yearPart +'</a>');
						else $arrangementEvent.before(dateLink + getMonthName(monthPart) + '<br>' + yearPart +'</a>');
					}
					else if(yearDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + yearPart +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + yearPart +'</a>');
						else $arrangementEvent.before(dateLink + yearPart +'</a>');
					}
				}
				// Time format (HH:MM)
				else if (isTime) {
					var time = dataDate;
					/* Add the event date displays according to the display types */

					// Custom Date Display

					// Get the custom text from the data-attribute object.
					var customDisplay = self._timelineData(eventElement, "customDisplay");

					// If customDisplay is defined in the data-attribute object...
					if(typeof customDisplay !== 'undefined') {

						// Add in the custom Text depending on which insertMethod used.
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + customDisplay +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + customDisplay +'</a>');
						else $arrangementEvent.before(dateLink + customDisplay +'</a>');
					}

					else if(dateTimeDisplay || timeDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + time +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + time +'</a>');
						else $arrangementEvent.before(dateLink + time +'</a>');
					}
				}
				// Date format (DD/MM/YYYY)
				else {
					var date = dataDate,
						// Separate the date at point of /, to get individual date parts
						dateParts = date.split('/'),
						// Remove the leading 0 (zero) from the day
						dayPart = dateParts[0].replace(/^0+/, ''),
						// Remove the leading 0 (zero) from the month
						monthPart = dateParts[1].replace(/^0+/, ''),
						yearPart = dateParts[2];

					/* Add the event date displays according to the display types */

					// Custom Date Display

					// Get the custom text from the data-attribute object.
					var customDisplay = self._timelineData(eventElement, "customDisplay");

					// If customDisplay is defined in the data-attribute object...
					if(typeof customDisplay !== 'undefined') {

						// Add in the custom Text depending on which insertMethod used.
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + customDisplay +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + customDisplay +'</a>');
						else $arrangementEvent.before(dateLink + customDisplay +'</a>');
					}

					else if(dateTimeDisplay || dateDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + date +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + date +'</a>');
						else $arrangementEvent.before(dateLink + date +'</a>');
					}
					else if(dayMonthDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + dayPart + numSuffix(dayPart) + '<br>' + getMonthName(monthPart) +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + dayPart + numSuffix(dayPart) + '<br>' + getMonthName(monthPart) +'</a>');
						else $arrangementEvent.before(dateLink + dayPart + numSuffix(dayPart) + '<br>' + getMonthName(monthPart) +'</a>');
					}
					else if(monthYearDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + getMonthName(monthPart) + '<br>' + yearPart +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + getMonthName(monthPart) + '<br>' + yearPart +'</a>');
						else $arrangementEvent.before(dateLink + getMonthName(monthPart) + '<br>' + yearPart +'</a>');
					}
					else if(yearDisplay) {
						if (insertMethod == 'append') $eventDateDisplay.append(dateLink + yearPart +'</a>');
						// For use with the addEvent method... creates new timeline events and places them where specified.
						else if (insertMethod == 'after') $arrangementEvent.after(dateLink + yearPart +'</a>');
						else $arrangementEvent.before(dateLink + yearPart +'</a>');
					}
				} // End else
			} // End inArray
		}, // End eventDateDisplay() function

		_timelineComponents: function (timelineComponents) {
			var dataAttribute = this._eventContentListData();
			// Cache timeline components
			timelineComponents['eventsContent'] = this.$element.children('.events-content');
			timelineComponents['eventsContentList'] = timelineComponents['eventsContent'].find('li['+ dataAttribute +']');
			timelineComponents['eventsContentSelected'] = timelineComponents['eventsContent'].find('li['+ dataAttribute +'].selected');

			timelineComponents['timelineWrapper'] = timelineComponents['eventsContent'].parent().find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');

			timelineComponents['timelineNavigation'] = timelineComponents['timelineWrapper'].siblings('.timeline-navigation');
		},

		_setup: function (self, timelineComponents, timelineTotalWidth) {
			/* Debounce function for resize events */

			// Returns a function, that, as long as it continues to be invoked, will not
			// be triggered. The function will be called after it stops being called for
			// N milliseconds. If `immediate` is passed, trigger the function on the
			// leading edge, instead of the trailing.
			function debounce(func, wait, immediate) {
				var timeout;
				return function() {
					var context = this, args = arguments;
					var later = function() {
						timeout = null;
						if (!immediate) func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) func.apply(context, args);
				};
			};

			var id = this.$element.attr('id');

			function _mobileResizeFix(event) {
				var windowWidth = this.$element.data('plugin_'+ this._name)['windowWidth'],
					newWidth = $(window).width();

				if(newWidth !== windowWidth){
					this.refresh();
				}
				this.$element.data('plugin_'+ this._name)['windowWidth'] = newWidth;
			}
			this._setup.mobileResizeFix = _mobileResizeFix;
			// On window resize, change the timeline accordingly.
			$(window).on('resize.'+this._name+'_'+id, debounce($.proxy(this._setup.mobileResizeFix, this), 250));



			//** Navigation button function **//

			// Stop click events on the .inactive buttons
			this.$element
				.on('click.'+this._name, '.timeline-navigation .inactive', function(event){
					event.stopImmediatePropagation();
					return(false);
				})
				// Button on click...
				.on('click.'+this._name, '.timeline-navigation:not(#pausePlay) a', $.proxy(function(event) {
					event.preventDefault();
					var $this = $(event.target);

					this._timelineComponents(timelineComponents);

					timelineTotalWidth = this._setTimelineWidth(timelineComponents);
					// If next button clicked, shows next content
					if($this.is('.next')) this._showNewContent(timelineComponents, timelineTotalWidth, 'next');
					// If prev button clicked shows prev content
					if($this.is('.prev')) this._showNewContent(timelineComponents, timelineTotalWidth, 'prev');
					// If scroll-right button clicked, scrolls timeline right
					if($this.is('.scroll-right')) this._updateSlide(timelineComponents, timelineTotalWidth, 'right');
					// If scroll-left button clicked, scrolls timeline left
					if($this.is('.scroll-left')) this._updateSlide(timelineComponents, timelineTotalWidth, 'left');
				}, this))
				//** Event date function **//
				// Detect click on a single event date = show new event content
				.on('click.'+this._name, '.events a', $.proxy(function(event) {
					event.preventDefault();
					var $this = $(event.target);

					this._timelineComponents(timelineComponents);
					// Remove selected class from all dates.
					this.$element.find('.events').find('a').removeClass('selected');
					// Add class to the event date clicked.
					$this.addClass('selected');
					// Update all other previous event dates for styling
					this._updateOlderEvents($this);
					// Set the timeline width.
					timelineTotalWidth = this._setTimelineWidth(timelineComponents);
					// Update the timeline width and filling line.
					this._updateFilling($this, timelineComponents['fillingLine'], timelineTotalWidth);
					// Change the event content to match the selected event.
					this._updateVisibleContent($this, timelineComponents['eventsContent']);
					// Translate (scroll) the timeline left or right according to the position of the targeted event date
					this._updateTimelinePosition($this, timelineComponents, timelineTotalWidth);
				}, this));

			//** Autoplay **//

			if (this.settings.autoplay == true){
				// Define the progress bar html
				var	$progressBar = '<div class="progressBarWrapper"><div class="progressBar"></div></div>',
					// Find and get the pause button html.
					$pauseButton = timelineComponents['timelineNavigation'].find('.pause')[0];
				// Create the progress bar.
				timelineComponents['eventsContent'].prepend($progressBar);

				// Call the autoplay function.
				this._autoplay(timelineComponents);

				// On click
				this.$element
					// On click of the element pause button, pass data to the event [pausebtnClicked, pausebtnHtml, state] and call the changeButtons function.
					.on('click.'+this._name, '.timeline-navigation .pause', [true, $pauseButton, 'paused'], $.proxy(this._autoplay.changeButtons, this))
					// On click of the element play button, pass data to the event [pausebtnClicked, pausebtnHtml, state] and call the changeButtons function.
					.on('click.'+this._name, '.timeline-navigation .play', [false, $pauseButton, 'playing'], $.proxy(this._autoplay.changeButtons, this));

				// Hover
				if (this.settings.autoplayPause_onHover == true) {
					var checkMQ = this._checkMQ();

					// Only execute hover code if device is tablet or desktop.
					if (checkMQ == 'tablet' || checkMQ == 'desktop') {
						// On hover
						this.$element
							// On mouseenter of the element events-content, pass data to the event [pausebtnClicked, pausebtnHtml, state] and call the changeButtons function.
							.on('mouseenter.'+this._name, '.events-content', [false, $pauseButton, 'paused'], $.proxy(this._autoplay.changeButtons, this))
							// On mouseleave of the element events-content, pass data to the event [pausebtnClicked, pausebtnHtml, state] and call the changeButtons function.
							.on('mouseleave.'+this._name, '.events-content', [false, $pauseButton, 'playing'], $.proxy(this._autoplay.changeButtons, this));
					} // End checkMQ is desktop
				} // End autoplayPause_onHover this.settings



			} // End Autoplay this.settings

			//** Go-to timeline link function **//

			// Linking to a specific date of a timeline

			// Set the go-to selector in a variable
			var goToTimelineLink = $('.goto-horizontal-timeline');

			// If go-to selector exists...
			if(goToTimelineLink.length > 0) {
				// On click
				goToTimelineLink.on('click.'+this._name, gotoTimeline);

				function gotoTimeline(event) {
					// Prevent default click
					event.preventDefault();
					// Prevent every instance of the plugin from firing the function, and concentrate on just the one.
					event.stopImmediatePropagation();
						// Reference the button
					var	$this = $(event.target),
						// Get the go-to href value of the button as the selector
						href = $this.attr('href'),
						// A check to see if href only contains a # (by itself)...
						targetSelf = href == "#";

					// We are using a lonely # to determine if a link is targetting the timeline it sits in (itself)
					if(targetSelf) {
						// We are targeting the timeline the link is in.
							// Get the ID of the outer wrapper of the timeline, from which the link sits in
						var gotoself = '#' + $this.parents('.horizontal-timeline').attr('id');
							// Set the target variable as this timeline.
							$target = $(gotoself);
					}
					// Otherwise we're targetting another timeline.
					else var $target = $(href); // Reference the jQuery object selector only once

					// Get the correct plugin instance from the target data.
					var instanceRef = $target.data('plugin_horizontalTimeline').Timeline;

						// Get the data-gototimeline options object
					var datagoto = $this.data('gototimeline'),
						// Set empty variables
						date,
						scrollSpeed,
						scrollOffset,
						scrollEasing,

						// Get the keys from the data object
						dataDate = datagoto.date,
						dataScrollSpeed = datagoto.scrollspeed,
						dataScrollOffset = datagoto.scrolloffset,
						dataScrollEasing = datagoto.scrolleasing;

					// If the data-gototimeline attribute exists...
					if (typeof datagoto !== 'undefined') {
						// Set the date from the data object
						date = dataDate;

						// The speed, offset, and easing data options are optional,
						// so we need to check for their existence

						// If speed option exists, set the speed from the data object
						if (typeof dataScrollSpeed !== 'undefined') scrollSpeed = dataScrollSpeed;

						// If offset option exists set offset from the data object
						if (typeof dataScrollOffset !== 'undefined') scrollOffset = dataScrollOffset;

						// If easing option exists set easing from the data object
						if (typeof dataScrollEasing !== 'undefined') scrollEasing = dataScrollEasing;
					}

					// If a link is targetting the timeline it sits in (itself), then execute the public method interally to goTo the date.
					if(targetSelf) instanceRef.goTo(date, instanceRef);
					// If not, then use a smooth scroll and then execute the public method interally afterwards.
					else instanceRef.goTo(date, {smoothScroll: true, speed: scrollSpeed, offset: scrollOffset, easing: scrollEasing}, instanceRef);

				} // End gotoTimeline function
			} // End if goToTimelineLink exists

			//** Mouse wheel function **//
			// Requires the jQuery plugin mouse wheel: https://github.com/jquery/jquery-mousewheel
			// Mouse wheel support for "scrolling" the events content.
			if(this.settings.useScrollWheel == true) {
					// The URL to the plugin on CDN
				var url = "https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";

				// Set a global variable to equal the function.
				this._setup.mousewheel = mousewheel;

				// Function to load the Mousewheel plugin (url, type, callback)
				this._addFile(url, 'js', $.proxy(function() {
					// Wait 300ms whilst the Mousewheel script loads
					window.setTimeout($.proxy(function() {
						this.$element.on('mousewheel.'+this._name, '.events-content', $.proxy(this._setup.mousewheel, this));
					}, this), 300); // End setTimeout function
				}, this)); // End addFile function

				/* Mousewheel function */
				function mousewheel(e, delta) {
					this._timelineComponents(timelineComponents);
					timelineTotalWidth = this._setTimelineWidth(timelineComponents);

					// Scroll Up = show previous content
					if (e.deltaY > 0) this._showNewContent(timelineComponents, timelineTotalWidth, 'prev');
					// Scroll Down = show next content
					else this._showNewContent(timelineComponents, timelineTotalWidth, 'next');
					// Prevent the normal document scroll
					e.preventDefault();
				}
			} // End scrollWheel setting


			//** TouchSwipe function **//
			// Requires the jQuery plugin TouchSwipe: http://labs.rampinteractive.co.uk/touchSwipe/demos/index.html
			// TouchSwipe has more events/options than jQuery Mobile
			if(this.settings.useTouchSwipe == true){
					// The URL to the plugin on CDN
				var url = "https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js";

				// Set a global variable to equal the function.
				this._setup.swipe = swipe;

				// Function to load the TouchSwipe plugin (url, type, callback)
				this._addFile(url, 'js', $.proxy(function() {
					// Wait 300ms whilst the TouchSwipe script loads
					window.setTimeout($.proxy(function() {

						// On swipe of .events-content, show next/prev event content
						timelineComponents['eventsContent'].swipe({
							// Swipe right to go left (previous)
							swipeRight:$.proxy(function(event, direction, distance, duration, fingerCount) {
								// Show previous content on swipeRight
								this._setup.swipe(this, 'prev');
							}, this),
							// Swipe left to go right (next)
							swipeLeft:$.proxy(function(event, direction, distance, duration, fingerCount) {
								// Show next content on swipeLeft
								this._setup.swipe(this, 'next');
							}, this),
							// Swipe distance... 0 = any distance in px
							threshold:75,
							preventDefaultEvents: false
						}); // End TouchSwipe Event

						/* Swipe function for the timeline wrapper*/
						// So that we can scroll the timeline with a swipe.

						timelineComponents['timelineWrapper'].swipe({
							// Swipe right to scroll the timeline left
							swipeRight:$.proxy(function(event, direction, distance, duration, fingerCount) {
									// Get the current translate value
								var translateValue = this._getTranslateValue(timelineComponents['eventsWrapper']),
									// Get the width of the timeline wrapper.
									wrapperWidth = Number(timelineComponents['timelineWrapper'].width());

								// Translate the timeline to the left (also know as scroll left)
								// according to the amount of distance swiped.
								this._translateTimeline(timelineComponents, distance + translateValue, wrapperWidth - timelineTotalWidth);
							}, this),
							// Swipe left to scroll the timeline right
							swipeLeft:$.proxy(function(event, direction, distance, duration, fingerCount) {
									// Get the current translate value
								var translateValue = this._getTranslateValue(timelineComponents['eventsWrapper']),
									// Get the width of the timeline wrapper.
									wrapperWidth = Number(timelineComponents['timelineWrapper'].width());

								// Translate the timeline to the right (also know as scroll right)
								// according to the amount of distance swiped.
								this._translateTimeline(timelineComponents, -distance + translateValue, wrapperWidth - timelineTotalWidth);
							}, this),
							// Swipe distance... 0 = any distance in px
							threshold:30,
							preventDefaultEvents: false
							}
						); // End TouchSwipe Event
					}, this), 1000); // End setTimeout function
				}, this)); // End addFile function

				// Add a touch-enabled class to the necessary elements.
				timelineComponents['timelineWrapper'].addClass('touch-enabled')
					.parent().siblings('.events-content').addClass('touch-enabled');

				/* Swipe function */
				function swipe(self, direction) {
					self._timelineComponents(timelineComponents);
					timelineTotalWidth = self._setTimelineWidth(timelineComponents);
					self._showNewContent(timelineComponents, timelineTotalWidth, direction);
				}

			} // End useTouchSwipe this.settings

			// Keyboard navigation
			if(this.settings.useKeyboardKeys == true) {

				// Set a global variable to equal the function.
				this._setup.keyboardKeys = keyboardKeys;

				var id = this.$element.attr('id');
				// On keyup
				$(document).on('keyup.'+this._name+'_'+id, $.proxy(this._setup.keyboardKeys, this));

				/* Keyboardkeys function */
				function keyboardKeys(event) {
					this._timelineComponents(timelineComponents);
					timelineTotalWidth = this._setTimelineWidth(timelineComponents);

					// If Left arrow (keyCode 37) AND the timeline is in the viewport, show prev content
					if(event.which=='37' && this._elementInViewport(this.element))
						this._showNewContent(timelineComponents, timelineTotalWidth, 'prev');
					// If Right arrow (keyCode 39) AND the timeline is in the viewport, show next content
					else if(event.which=='39' && this._elementInViewport(this.element))
						this._showNewContent(timelineComponents, timelineTotalWidth, 'next');
				}
			} // End useKeyboardKeys this.settings
		}, // End _setup() function.

		/* Autoplay function */
		_autoplay: function (timelineComponents) {
			// NOTE: if autoplay cycle is paused, clicking any timeline button
			// will not reset the autoplay cycle to play.

			var isPaused,
				tick,
				percentTime,
				current,
				autoplayTimelineTotalWidth,
				dataSpeed,
				speed;

			this._timelineComponents(timelineComponents);

			// Set a global variable to equal the function.
			this._autoplay.countEvents = countEvents;
			this._autoplay.start = start;
			this._autoplay.pause = pause;
			this._autoplay.resume = resume;
			this._autoplay.moved = moved;
			this._autoplay.changeButtons = changeButtons;
			this._autoplay.refresh = refresh;
			this._autoplay.destroy = destroy;

			// Call the start function
			this._autoplay.start(this, timelineComponents);

			// Count events function
			function countEvents() {
				// Get the total number of events to check against
				return timelineComponents['timelineEvents'].length;
			}

			// Start function
			function start(self, timelineComponents) {
				// Reset timer
				percentTime = 0;

				self._timelineComponents(timelineComponents);
				// Get the timeline width
				autoplayTimelineTotalWidth = self._setTimelineWidth(timelineComponents);
				// Run interval every 0.01 second
				tick = setInterval($.proxy(interval, self), 10);
			};
			// Interval function.
			function interval() {
				isPaused = this.$element.data('plugin_'+ this._name)['autoplay']['isPaused'];
				this._timelineComponents(timelineComponents);
				
				// Speed

				// Get the speed from the data attribute of the current events content.
				dataSpeed = this._timelineData(timelineComponents['eventsContent'].find('.selected'),"speed");
				// If the variable doesn't return an undefined value, then set the speed
				// from the data attribute.
				if (typeof dataSpeed !== 'undefined') speed = Number(dataSpeed);
				// Otherwise, set the speed from the settings.
				else speed = Number(this.settings.autoplaySpeed);

				// If isPaused = false AND is in the viewport, start the autoplay cycle, otherwise pause the cycle.
				if(isPaused === false && this._elementInViewport(this.element)){
					// Set percentTime using the speed from the settings.
					// Check media queries...
					var checkMQ = this._checkMQ();
					// We need to adjust the calculations for percentTime because how slow it seems to be on mobile.
					// If mobile, set the correct speed
					if(checkMQ == 'mobile') percentTime += 3 / speed;
					// Everything else set the correct speed.
					else percentTime += 1 / speed;
					// Set the progress bar width
					this.$element.find('.progressBar').css({
						width: percentTime+"%"
					});
					// Recalculate the index of the current event, each time.
					// This is to make sure that if the user navigates to another event while playing or paused,
					// the current index will always reflect the current event,
					// otherwise autoplay may get out of sync.
					current = timelineComponents['eventsWrapper'].find('.selected').index();

					//if percentTime is equal or greater than 100
					if(percentTime >= 100){
						// If dateOrder is normal AND the current index is equal to the total number of events
						// OR dateOrder is reverse AND current index is equal to 1 ...
						if((this.settings.dateOrder == "normal" && current == this._autoplay.countEvents()) || (this.settings.dateOrder == "reverse" && current == 1)) {
							// Go back to the start of the cycle.
							this._showNewContent(timelineComponents, autoplayTimelineTotalWidth, 'start');
							// Recalculate the current index to make sure it's reset back to 1 (the start).
							current = timelineComponents['eventsWrapper'].find('.selected').index();
						}
						else {
							// If dateOrder is normal.
							if (this.settings.dateOrder == "normal") {
								// Go to next event content.
								this._showNewContent(timelineComponents, autoplayTimelineTotalWidth, 'next');
							}
							// Else if dateOrder is reverse.
							else if (this.settings.dateOrder == "reverse") {
								// Go to next event content.
								this._showNewContent(timelineComponents, autoplayTimelineTotalWidth, 'prev');
							}
						}
					}
				} // End isPaused if statement
			} // End Interval function

			// Pause function
			function pause(self) {
				self.$element.data('plugin_'+ self._name)['autoplay']['isPaused'] = true;
			}
			// Resume function
			function resume(self) {
				self.$element.data('plugin_'+ self._name)['autoplay']['isPaused'] = false;
			}
			// Moved function, when an event content has changed via autoplay or by manual navigation.
			function moved(self) {
					// Clear interval
					self._autoplay.destroy();
					// Restart the cycle.
					self._autoplay.start(self, timelineComponents);
			}
			// Change Buttons function
			function changeButtons(event) {
				event.preventDefault();
				// Get the event data
				var data = event.data,
					// Set variables using the corresponding data array selectors.
					pausebtnClicked = data[0],
					$pauseButton = data[1],
					state = data[2],
					// Find the pause play button wrapper.
					$pausePlay = this.$element.find('#pausePlay'),

					// Check if the new object options are defined in the user options, if they are use them,
					// otherwise use the deprecated single options.
					iconClass = (this._options.iconClass != undefined) ? this.settings.iconClass : this.settings,
					iconBase = (this._options.iconClass != undefined) ? iconClass.base : iconClass.iconBaseClass,
					iconPlay = (this._options.iconClass != undefined) ? iconClass.play : iconClass.play_iconClass,

					// Define the play button html
					$playButton = '<a href="" class="'+ iconBase +' '+ iconPlay +' play"></a>';

				// If the event type is click and pausebtnClicked is true (so the pause button was clicked)...
				if (event.type == "click" && pausebtnClicked == true) {
					// Add class to parent to check against it later to stop on hover from reactivating the play cycle.
					$pausePlay.addClass('clicked');
					// Set a mouseEvent data to click on the element to check against later.
					this.$element.data('plugin_'+ this._name)['autoplay']['mouseEvent'] = 'click';
					// Change the button to the play button.
					$pausePlay.html($playButton);
					// Call the pause function to pause autoplay
					this._autoplay.pause(this);
					console.log('Autoplay is '+state+'.');
				}
				// Else if the event type is click and pausebtnClicked is false (so the play button was clicked)...
				else if (event.type == "click" && !pausebtnClicked) {
					// Remove class from the parent
					$pausePlay.removeClass('clicked');
					// Set the mouseEvent data to false on the element.
					this.$element.data('plugin_'+ this._name)['autoplay']['mouseEvent'] = false;
					// Change the button to the pause button.
					$pausePlay.html($pauseButton);
					// Call the resume function to resume the autoplay cycle.
					this._autoplay.resume(this);
					console.log('Autoplay is '+state+'.');
				}
				// If the event type is mouseenter (so it's paused) and the pause play button wrapper doesn't have the clicked class (paused via the pause button)...
				if(event.type == "mouseenter" && !$pausePlay.hasClass('clicked')) {
					// Set a mouseEvent data to hover on the element to check against later.
					this.$element.data('plugin_'+ this._name)['autoplay']['mouseEvent'] = 'hover';
					// Change the button to the play button.
					$pausePlay.html($playButton);
					// Call the pause function to pause autoplay
					this._autoplay.pause(this);
					console.log('Autoplay is '+state+'.');
				}
				// Else if the event type is mouseleave (so it's playing) and the pause play button wrapper doesn't have the clicked class (paused via the pause button)...
				// To stop autoplay resuming the cycle on mouseleave if it's already paused via the pause button.
				else if(event.type == "mouseleave" && !$pausePlay.hasClass('clicked')) {
					// Set the mouseEvent data to false on the element.
					this.$element.data('plugin_'+ this._name)['autoplay']['mouseEvent'] = false;
					// Change the button to the pause button.
					$pausePlay.html($pauseButton);
					// Call the resume function to resume the autoplay cycle.
					this._autoplay.resume(this);
					console.log('Autoplay is '+state+'.');
				}
			} // End changeButtons function
			// Refresh function
			function refresh(self) {
				self._timelineComponents(timelineComponents);
				autoplayTimelineTotalWidth = self._setTimelineWidth(timelineComponents);
			}
			// Destroy function, to destroy the autoplay interval.
			function destroy() {
				clearInterval(tick);
			}
		}, // End autoplay function

		/* Get data from the data-attribute object */
		_timelineData: function (element, type) {
			if (element.data('horizontal-timeline')) {
				var data = element.data('horizontal-timeline');

				if(type == "date") return data.date;
				else if(type == "customDisplay") return data.customDisplay;
				else if (type == "speed") return data.speed;
			}
			// data-date and data-custom-display deprecated as of v2.0.5.alpha.3
			// and will be removed in a later major version.
			else {
				var dataDate = element.data('date'),
					dataCustomDisplay = element.data('custom-display');

				if(type == "date") return dataDate;
				else if(type == "customDisplay") return dataCustomDisplay;
			}
		},
		_eventContentListData: function () {
			// Check if the data-horizontal-timeline attribute exists on the events-content li,
			// If not then return the deprecated data-date.
			if (this.$element.find('li').data('horizontal-timeline')) {
				return "data-horizontal-timeline";
			}
			// data-date deprecated as of v2.0.5.alpha.3
			// and will be removed in a later major version.
			else {
				return "data-date";
			}
		},

		/* Refresh public method
		*  - refreshes the timeline externally after initialisation.
		*  Use it like: $('#example').horizontalTimeline('refresh');
		*/
		refresh: function () {
			var timelineComponents = {};

			this._timelineComponents(timelineComponents);

			// Removes first and last id attributes of the event-content list.
			timelineComponents['eventsContent']
				.find('#first').removeAttr('id').end()
				.find('#last').removeAttr('id').end();

			// Removes first and last classes from the timeline event date
			timelineComponents['eventsWrapper']
				.find('.first').removeClass('first').end()
				.find('.last').removeClass('last').end();

			// Adds classes and IDs.
			this._addIdsAndClasses(timelineComponents);	 // changed

			this._setDatePosition(timelineComponents);
			timelineTotalWidth = this._setTimelineWidth(timelineComponents);
			this._updateFilling(timelineComponents['eventsWrapper']
				.find('a.selected'), timelineComponents['fillingLine'], timelineTotalWidth);

			if(this.settings.autoplay == true) this._autoplay.refresh(this);
			console.log('refreshed #'+this.element.id);
		},

		/* Destroy public method
		*  - destroys the timeline externally after initialisation.
		* Removes all timeline created html and event handlers and resets the elements to the original state.
		*  Use it like: $('#example').horizontalTimeline('destroy');
		*/
		destroy: function () {
			var $this = this.$element,
				id = $this.attr('id'),
				originalEventsContent = $this.data('plugin_'+ this._name)['originalEventsContent'];

			if($('.horizontal-timeline .timeline').length == 1) {
				$('.goto-horizontal-timeline').off('.'+this._name);
				$('body').removeData('plugin_'+ this._name +'_loadedFile');
			}
			$this.removeClass('loaded')
				.off('.'+this._name, '**')
				.find('.timeline').remove().end()
				.find('.events-content').replaceWith(originalEventsContent).swipe("destroy");

			$this.find('.events-wrapper').removeClass('touch-enabled').swipe("destroy");
			$(document).off('.'+this._name+'_'+id);
			$(window).off('.'+this._name+'_'+id);

			if(this.settings.autoplay == true) {
				this._autoplay.destroy();
			}

			$this.removeData('plugin_' + pluginName);

			console.log('destroyed #'+this.element.id);
		},

		/* AddEvent public method
		* - adds a new event to the timeline externally after initialisation.
		* Adds a new event content to the timeline at a specified location.
		* Use it like: $('#example').horizontalTimeline('addEvent', [event content html], 'after', '01/01/2001');
		* (new event content html, insertion method (before or after), an existing unique date to position the new content around.)
		*/
		addEvent: function (html, insertMethod, arrangementDate) {
			var timelineComponents = {};

			this._timelineComponents(timelineComponents);

				// Get the new date from the HTML.
			var	newDate = html.split("date")[1].split('"')[2],
				// Select the specified event content
				$eventContent = timelineComponents['eventsContentList'].filter($.proxy(function(index, element) {
					var data = this._timelineData($(element), "date");
					if (data == arrangementDate) return $(element);
				}, this)),
				// Find the selected event.
				$selectedEvent = timelineComponents['eventsWrapper'].find('a.selected'),
				// Get the existing dates array.
				existingDates = this.$element.data('plugin_'+ this._name)['existingDates'];

			if(jQuery.inArray(newDate, existingDates) == -1) {
				existingDates.push(newDate);
				// If the insertMethod = before, then insert the new content before the specified date.
				if (insertMethod == 'before') $eventContent.before(html);
				// Else the insertMethod = after, insert the new content after the specified date.
				else if (insertMethod == 'after') $eventContent.after(html);

				// Call the create.date function passing the insertMethod and arrangementDate arguments.
				// This creates the new timeline events before or after [insertMethod] specified date [arrangementDate].
				this._createDate(this, insertMethod, arrangementDate);
				// Update the olderEvents.
				this._updateOlderEvents($selectedEvent);
				// Call the refresh function to fresh the timeline accordingly.
				this.refresh();

				/* Custom namespaced event: eventAdded with the data passed to the event as the newEventDate and newEventContent. */
				this.$element.trigger({
					type: "eventAdded."+this._name,
					newEventDate: newDate,
					newEventContent: html
				});
			}
			else return console.warn('The date '+ newDate +' is already in Timeline.');
		},

		/* RemoveEvent public method
		* - removes the specified event from the timeline externally after initialisation.
		* Removes the event and the event content from the timeline using the unique date used in data-date.
		* Use it like: $('#example').horizontalTimeline('removeEvent', '01/01/2001');
		*/
		removeEvent: function (date) {
			var timelineComponents = {};

			this._timelineComponents(timelineComponents);

				// Select the specified timeline event
			var $event = timelineComponents['eventsWrapper'].find("a").filter($.proxy(function(index, element) {
					var data = this._timelineData($(element), "date");
					if (data == date) return $(element);
				}, this)),
				// Select the specified event content
				$eventContent = timelineComponents['eventsContentList'].filter($.proxy(function(index, element) {
					var data = this._timelineData($(element), "date");
					if (data == date) return $(element);
				}, this)),
				$newEvent,
				// Get the existing dates array.
				existingDates = this.$element.data('plugin_'+ this._name)['existingDates'],
				// Find the index of the date in the array.
				index = existingDates.indexOf(date);

			// If there's more than 1 timeline events (We can't remove the very last event)...
			if (timelineComponents['timelineEvents'].length > 1) {
				// If the specified event is selected...
				if($event.is('.selected')) {
					// Remove the selected class from the specified event content
					$eventContent.removeClass('.selected');
					// If a next event exists, select it...
					if ($event.next().length) {
						// Add a selected class to the next timeline event and reference it.
						$newEvent = $event.next().addClass('selected');
						// Add a selected class to the next event content
						$eventContent.next().addClass('selected');
					}
					// If not, then select the previous event...
					else {
						// Add a selected class to the previous timeline event and reference it.
						$newEvent = $event.prev().addClass('selected');
						// Add a selected class to the previous event content.
						$eventContent.prev().addClass('selected');
					}
				}
				// If the specified event isn't selected, then just reference it to pass it to the functions
				// (we don't need to do anything special since it doesn't concern it).
				else $newEvent = timelineComponents['eventsWrapper'].find('a.selected');
				// Update the olderEvents using the newEvent as reference.
				this._updateOlderEvents($newEvent);
				// Remove the timeline event.
				$event.remove();
				// Remove the event content.
				$eventContent.remove();

				// If the existing date exists...
				if (index > -1) {
					// Remove the existing date from the array.
					existingDates.splice(index, 1);
				}

				// Call the refresh function to fresh the timeline accordingly.
				this.refresh();

				/* Custom namespaced event: eventRemoved with the data passed to the event as the removedDate. */
				this.$element.trigger({
					type: "eventRemoved."+this._name,
					removedDate: date,
					removedContent: $eventContent[0].outerHTML
				});
			}
			// If the specified event is the only event, do nothing, since there should always be at least 1 event.
			else {
				console.warn('Timeline must always have at least 1 event after initialisation, therefore it can\'t be removed. Please use the Destroy method instead.');
			}
		}, // End removeEvent() function

		/* goTo public method
		* - go to an event in the timeline externally after initialisation.
		* Changes and goes to the specified event in the timeline.
		* Use it like: $('#example').horizontalTimeline('goTo', '01/01/2001', {"smoothScroll": true, "speed": 500, "offset": 0, "easing": "linear"});
		* ([an existing unique date to go to], {[enable smoothScroll], [scrollSpeed], [scrollOffset], [scrollEasing]})
		* The go-to-timeline links uses this method.
		*/

		// The object that equals itself as the function arguments, sets the defaults for the smoothScroll function. 0+ options can be overridden.
		goTo: function (date, {smoothScroll = false, speed = 500, offset = 0, easing = "linear"} = {}, instanceRef) {
			var timelineComponents = {};
			this._timelineComponents(timelineComponents);
			// If the variable instanceRef is undefined, set it to this instance.
			// Only used if the public method is used. (the go-to links passes the instanceRef as an argument.)
			if (typeof instanceRef == 'undefined') instanceRef = this;

			// Get the existing dates array.
			var existingDates = this.$element.data('plugin_'+ this._name)['existingDates']
				speed = Number(speed),
				offset = Number(offset);

			// If date exists in the timeline, we can then go to it.
			if(jQuery.inArray(date, existingDates) > -1) {

				/* Custom namespaced event: goToTimeline with the data passed to the event as the goToDate and the timelineSelector (jQuery object).
				* (Has to be triggered on the body because of the go-to-timeline links in the DOM.)
				*/
				$('body').trigger({
					type: "goToTimeline."+this._name,
					goToDate: date,
					timelineSelector: instanceRef.$element
				});

				// Find all event dates.
				var	prevDates = timelineComponents['eventsWrapper'].find('a'),
					// Find the targeted event date using the date
					selectedDate = timelineComponents['eventsWrapper'].find("a").filter($.proxy(function(index, element) {
						var data = this._timelineData($(element), "date");
						if (data == date) return $(element);
					}, this)),
					// Get the width value of the events (previously set)
					timelineTotalWidth = this._setTimelineWidth(timelineComponents);

					//** SmoothScroll functions **//
					if (smoothScroll == true) {
						// Smoothly scroll the document to the target
						$('html, body').stop().animate(
							{
								'scrollTop': instanceRef.$element.offset().top - offset
							},
							speed,
							easing,
							function() {
								// Once scrolling/animating the document is complete, update the target timeline.
								goto(instanceRef);
							}
						); // End .animate function
					}
					else goto(instanceRef);
				}
				// The date is not in the timeline, so we can not go to it.
				else return console.warn('The date '+ date +' is not in the Timeline, so we can not go to it.');

				function goto(instanceRef) {
					// Check if the targeted event hasn't already been selected, if not continue the code.
					if (!selectedDate.hasClass('selected')) {
						// Remove all selected classes from dates
						prevDates.removeClass('selected');
						// Add a selected class to the date we are targeting
						selectedDate.addClass('selected');
						// Update other dates as an older event for styling
						instanceRef._updateOlderEvents(selectedDate);
						// Update the filling line up to the selected date
						instanceRef._updateFilling(selectedDate, timelineComponents['fillingLine'], timelineTotalWidth);
						// Update the visible content of the selected event
						instanceRef._updateVisibleContent(selectedDate, timelineComponents['eventsContent']);
					}
					// Translate (scroll) the timeline left or right according to the position of the targeted event date
					instanceRef._updateTimelinePosition(selectedDate, timelineComponents, timelineTotalWidth);
				} // End goto() function
		}, // End goTo() public method function

		_updateSlide: function (timelineComponents, timelineTotalWidth, string) {
			// Retrieve translateX value of timelineComponents['eventsWrapper']
			var translateValue = this._getTranslateValue(timelineComponents['eventsWrapper']),
				wrapperWidth = Number(timelineComponents['timelineWrapper'].width());
			// Translate the timeline to the left/right (also know as scroll left/scroll right)
			if (string == 'right') this._translateTimeline(timelineComponents, translateValue - wrapperWidth, wrapperWidth - timelineTotalWidth);
			else this._translateTimeline(timelineComponents, translateValue + wrapperWidth);
		},

		_showNewContent: function (timelineComponents, timelineTotalWidth, string) {
			// Show prev/next content
				// Find the .selected content
			var visibleContent =  timelineComponents['eventsContent'].find('.selected');

			// If dateOrder is normal...
			if (this.settings.dateOrder == "normal")
				// Find the prev/next content for detection later.
				var newContent = (string == 'next') ?  visibleContent.next() : visibleContent.prev();

			// If dateOrder is reverse
			else if (this.settings.dateOrder == "reverse")
				// Find the prev/next content in reverse fore detection later.
				var newContent = (string == 'next') ?  visibleContent.prev() : visibleContent.next();

			// If a prev/next content exists
			// OR dateOrder is reverse AND string is start (for Autoplay)...
			// This determines whether we can navigate prev or next.
			if (newContent.length > 0 || (this.settings.dateOrder == "reverse" && string == 'start')) {
				// Find the .selected event
				var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
					newEvent;

				// If start... (For Autoplay), find the first event
				if(string == 'start') {

					// If the dateOrder is normal (starting from the left)...
					if (this.settings.dateOrder == "normal") {
						// Find the first event.
						newEvent = timelineComponents['eventsWrapper'].find('.first');
					}
					// Else if the dateOrder is reverse (starting from the right)...
					else if (this.settings.dateOrder == "reverse") {
						// Find the last event.
						newEvent = timelineComponents['eventsWrapper'].find('.last');
					}
				}
				// If next, find the next event from the current selected event
				else if (string == 'next') newEvent = selectedDate.next('a');

				// If prev, find the prev event from the current selected event
				else if (string == 'prev') newEvent = selectedDate.prev('a');

				this._updateVisibleContent(newEvent, timelineComponents['eventsContent']);

				newEvent.addClass('selected');
				selectedDate.removeClass('selected');

				this._updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotalWidth);
				this._updateOlderEvents(newEvent);
				this._updateTimelinePosition(newEvent, timelineComponents, timelineTotalWidth);
			}
		},

		_updateTimelinePosition: function (event, timelineComponents, timelineTotalWidth) {
				// Get the css left value of the targeted event date
			var eventLeft = Number(event.css('left').replace('px', '')),
				// Get the width value of the .events-wrapper
				timelineWidth = timelineComponents['timelineWrapper'].width();

			this._translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotalWidth);
		},

		_translateTimeline: function (timelineComponents, value, totalTranslateValue) {
			// Only negative translate value
			var value = (value > 0) ? 0 : value;
			// Do not translate more than timeline width
			value = (!(typeof totalTranslateValue === 'undefined') &&  value < totalTranslateValue ) ? totalTranslateValue : value;
			this._setTransformValue(timelineComponents['eventsWrapper'], 'translateX', value+'px');

			// Disable the buttons if necessary
			this._buttonStates(timelineComponents, value, totalTranslateValue);
		},

		_updateFilling: function (selectedEvent, filling, totalTranslateValue) {
			// Change .filling-line length according to the selected event
				// Get the css left value of the selected event and remove the px unit
			var eventLeft = selectedEvent.css('left').replace('px', ''),
				// Get the css width value of the selected event and remove the px unit
				eventWidth = selectedEvent.css('width').replace('px', '');
			// Add the left and width together and divide by 2
			eventLeft = Number(eventLeft) + Number(eventWidth)/2;
			// Divide the eventLeft and the totalTranslateValue to get the filling line value
			var scaleValue = eventLeft/totalTranslateValue;
			// Set the filling line value
			this._setTransformValue(filling, 'scaleX', scaleValue);
		},

		// Fixed intervals between dates specified in the options.
		_setDatePosition: function (timelineComponents) {
			var	distnew = 0,
				distprev = 0,
				startingNum = 0;

			this._setDateIntervals(timelineComponents);

			var checkMQ = this._checkMQ(),
				// Check if the new object options are defined in the user options, if they are use them,
				// otherwise use the deprecated single options.
				minimal = (this._options.dateIntervals != undefined) ? this.settings.dateIntervals.minimal : this.settings.minimalFirstDateInterval;

			if (minimal == true || checkMQ == 'mobile') {
				// Set the 1st date to 0px on the timeline but with a padding left of 10px.
				timelineComponents['timelineEvents'].first().css({'left': '0px','padding-left': '10px'});
				startingNum = 1;
			}
			// When i starts at 1, it means starts at 2nd date.
			for (i = startingNum; i < timelineComponents['timelineEvents'].length; i++) {
				distnew = distprev + dateIntervals;
				timelineComponents['timelineEvents'].eq(i).css('left', distnew + 'px');
				distprev = distnew;
			}

		},

		_setTimelineWidth: function (timelineComponents) {
			var	totalWidth = 0,
				// Get wrapper width
				wrapperWidth = timelineComponents['timelineWrapper'].width(),
				// Get the css left value of the last event date, remove the px unit and add 100 to it.
				lastEventLeft = Number(timelineComponents['timelineEvents'].last().css('left').replace('px', '')) + 100;

			// Set a fail-safe, if lastEventLeft is less than the wrapperWidth then use the wrapperWidth as totalWidth.
			// Stops the timeline width from being too small.
			if (lastEventLeft < wrapperWidth) {
				totalWidth = wrapperWidth;
			}
			else {
				totalWidth = lastEventLeft;
			}
			timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
			this._updateTimelinePosition(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents, totalWidth);

			return totalWidth;
		},

		_updateVisibleContent: function (event, eventsContent) {
			var eventDate = this._timelineData(event, "date");
				visibleContent = eventsContent.find('.selected'),
				dataAttribute = this._eventContentListData(),
				// Function to find the new content...
				newContent = eventsContent.find('li['+ dataAttribute +']').filter($.proxy(function(index, element) {
					var data = this._timelineData($(element), "date");
					if (data == eventDate) return $(element);
				}, this)),

				newContentHeight = newContent.outerHeight(),

				// Check if the deprecated single options are defined in the user options, if they are use them,
				// otherwise use the new object options.

				// Set the single options into an array to check against.
				optionArray = [this._options.enter_animationClass, this._options.exit_animationClass],

				// A variable to include in an if statement that queries if the single options are undefined.
				singleUndefined = (optionArray[0] == undefined && optionArray[1] == undefined),

				// A variable to include in an if statement that queries if the single option is defined 
				// AND the object option is also defined.
				bothDefined = (optionArray[0] != undefined && this._options.animationClass != undefined)
					|| (optionArray[1] != undefined && this._options.animationClass != undefined),

				// If single option are undefined OR both single and object options are defined
				// then default to the object options, otherwise use the deprecated single option.
				animationObj = (singleUndefined || bothDefined) ? this.settings.animationClass : this.settings,

				// If animationObj equals the object options...

				enterObj = (animationObj == this.settings.animationClass) ? animationObj.enter : animationObj.enter_animationClass,
				exitObj = (animationObj == this.settings.animationClass) ? animationObj.exit : animationObj.exit_animationClass,

				allClasses = exitObj.right + ' ' + exitObj.left + ' ' + enterObj.left + ' ' + enterObj.right;

			// If newContent index is more than the visibleContent index,
			// then we have selected an event to the right.
			if (newContent.index() > visibleContent.index()) {
					// Set the selected and the enter right classes.
				var classEntering = 'selected ' + enterObj.right,
					// Set the exit left class.
					classExiting = exitObj.left;
			}
			// Else, we have selecting an event to the left.
			else {
					// Set the selected and the enter left classes.
				var classEntering = 'selected ' + enterObj.left,
					// Set the exit right class.
					classExiting = exitObj.right;
			}

			/* Add/remove classes to animate them in and out using CSS3. */

			function whichAnimationEvent(){
				var t,
					el = document.createElement("fakeelement"),
					animations = {
						"animation": "animationend",
						"OAnimation": "oAnimationEnd",
						"MozAnimation": "animationend",
						"WebkitAnimation": "webkitAnimationEnd"
					};

				for (t in animations){
					if (el.style[t] !== undefined) return animations[t];
				}
			}

			var animationEvent = whichAnimationEvent(),
			    dataAttribute = this._eventContentListData();

			// Add the enter class to the newContent.
			newContent.addClass(classEntering);
			// Add the exit class to the visibleContent and on animation end...
			visibleContent
				.addClass(classExiting)
				.one(animationEvent, function(e){
					// Remove all enter and exit classes from all the event content.
					eventsContent.find('li['+ dataAttribute +']').removeClass(allClasses);
				})
				// And then remove the selected class.
				.removeClass('selected');

			// Update the height.
			eventsContent.height(newContentHeight+'px');

			// For use with autoplay...
			if (this.settings.autoplay == true) this._autoplay.moved(this);

			/* Custom namespaced event: eventChanged with the data passed to the event as the current selected eventDate. */
			this.$element.trigger({
				type: "eventChanged."+this._name,
				currentEventDate: eventDate
			});

		}, // End _updateVisibleContent function

		_updateOlderEvents: function (event) {
			event.prevAll('a').addClass('older-event').end()
				.nextAll('a').removeClass('older-event');
			if (event.is('.selected')) event.removeClass('older-event');
		},

		_getTranslateValue: function (timeline) {
			var timelineStyle = window.getComputedStyle(timeline.get(0), null),
				timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
					timelineStyle.getPropertyValue("-moz-transform") ||
					timelineStyle.getPropertyValue("-ms-transform") ||
					timelineStyle.getPropertyValue("-o-transform") ||
					timelineStyle.getPropertyValue("transform");

			if(timelineTranslate.indexOf('(') >=0) {
				var timelineTranslate = timelineTranslate.split('(')[1];
				timelineTranslate = timelineTranslate.split(')')[0];
				timelineTranslate = timelineTranslate.split(',');
				var translateValue = timelineTranslate[4];
			} else {
				var translateValue = 0;
			}
			return Number(translateValue);
		},

		_setTransformValue: function (element, property, value) {
			element.css({
				"-webkit-transform": property + "("+value+")",
				"-moz-transform": property + "("+value+")",
				"-ms-transform": property + "("+value+")",
				"-o-transform": property + "("+value+")",
				"transform": property + "("+value+")"
			});
		},

		/* How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport */
		_elementInViewport: function (el) {
			var top = el.offsetTop,
				left = el.offsetLeft,
				width = el.offsetWidth,
				height = el.offsetHeight;

			while(el.offsetParent) {
				el = el.offsetParent;
				top += el.offsetTop;
				left += el.offsetLeft;
			}

			return (
				top < (window.pageYOffset + window.innerHeight) &&
				left < (window.pageXOffset + window.innerWidth) &&
				(top + height) > window.pageYOffset &&
				(left + width) > window.pageXOffset
			);
		},

		_setDateIntervals: function (timelineComponents) {
			var checkMQ = this._checkMQ(),
				// Set a minimum value for the intervals.
				minimumInterval = 120,

				// Check if the deprecated single options are defined in the user options, if they are use them,
				// otherwise use the new object options.

				// Set the single options into an array to check against.
				optionArray = [this._options.desktopDateIntervals, this._options.tabletDateIntervals, this._options.mobileDateIntervals],

				// A variable to include in an if statement that queries if the single options are undefined.
				singleUndefined = (optionArray[0] == undefined && optionArray[1] == undefined && optionArray[2] == undefined),

				// A variable to include in an if statement that queries if the single option is defined 
				// AND the object option is also defined.
				bothDefined = (optionArray[0] != undefined && this._options.dateIntervals != undefined) 
					|| (optionArray[1] != undefined && this._options.dateIntervals != undefined) 
					|| (optionArray[2] != undefined && this._options.dateIntervals != undefined),

				// If single options are undefined OR both single and object options are defined
				// then default to the object options, otherwise use the deprecated single options.
				date_intervals = (singleUndefined || bothDefined) ? this.settings.dateIntervals : this.settings,

				// If date_intervals equals the object options...
				desktop = (date_intervals == this.settings.dateIntervals) ? date_intervals.desktop : date_intervals.desktopDateIntervals,

				tablet = (date_intervals == this.settings.dateIntervals) ? date_intervals.tablet : date_intervals.tabletDateIntervals,

				mobile = (date_intervals == this.settings.dateIntervals) ? date_intervals.mobile : date_intervals.mobileDateIntervals;
				
			// If desktop is detected, set dateIntervals to desktop
			if (checkMQ == 'desktop') dateIntervals = desktop;
			// If tablet is detected, set dateIntervals to tablet
			else if (checkMQ == 'tablet') dateIntervals = tablet;
			// If mobile is detected, set dateIntervals to mobile
			else if (checkMQ == 'mobile') dateIntervals = mobile;
			
			// If dateIntervals options are set to below the minimum value, then change it.
			if (dateIntervals < minimumInterval) dateIntervals = minimumInterval;
		},

		_checkMQ: function () {
			// Check for mobile, table or desktop device
			// https://stackoverflow.com/a/14913306/2358222
			return window.getComputedStyle(this.element,':before').content.replace(/'/g, "").replace(/"/g, "");
		},

		//** Button States **//
		_buttonStates: function (timelineComponents, translateValue, totalTranslateValue){
			var nextButton = timelineComponents['timelineNavigation'].find('.next'),
				prevButton = timelineComponents['timelineNavigation'].find('.prev'),

				leftButton = timelineComponents['timelineNavigation'].find('.scroll-left'),
				rightButton = timelineComponents['timelineNavigation'].find('.scroll-right'),

				firstEvent = timelineComponents['timelineWrapper'].find('.first'),
				lastEvent = timelineComponents['timelineWrapper'].find('.last'),
				// Get the wrapper width
				wrapperWidth = timelineComponents['timelineWrapper'].width(),
				// Get the width value of the events (previously set)
				timelineTotalWidth = timelineComponents['eventsWrapper'].width();

			// If wrapper width equals the timeline total width,
			// then disable both scroll left and right buttons
			if(wrapperWidth == timelineTotalWidth){
				leftButton.addClass('inactive');
				rightButton.addClass('inactive');
			}

			/* Prev/Next buttons */
			if (timelineComponents['eventsContentList'].length == 1) {
				prevButton.addClass('inactive');
				nextButton.addClass('inactive');
			}
			else {
				// If first event is selected, then disable the prev button
				if(firstEvent.is('.selected')) prevButton.addClass('inactive');
				// If not, then enable the prev button
				else prevButton.removeClass('inactive');

				// If last event is selected, then disable the next button
				if(lastEvent.is('.selected')) nextButton.addClass('inactive');
				// If not, then enable the next button
				else nextButton.removeClass('inactive');
			}
			/* Scroll left/right buttons */

			// If translate value equals zero, it's the start of the timeline,
			// so disable the scroll left button
			if (translateValue == 0) leftButton.addClass('inactive');
			// If not, then enable the scroll left button
			else leftButton.removeClass('inactive');

			// If translate value equals to the total translate value, it's the end of the timeline,
			// so disable the scroll right button
			if (translateValue == totalTranslateValue) rightButton.addClass('inactive');
			// If not, then enable the scroll right button
			else rightButton.removeClass('inactive');
		}, // End _buttonStates() function

		// Function to add required js and css files dynamically
		// (CDN URL of the plugin, file type JS or CSS, callback function)
		_addFile: function (url, type, callback) {
			// If addRequiredFile is true...
			if (this.settings.addRequiredFile == true) {
					// Set loadedFile variable as body data of the loadedfile array, to check against later
				var loadedFile = $('body').data('plugin_'+ this._name +'_loadedFile'),
					// Declare an empty variable
					fileExists,
					// Variables for script and style
					js = type == 'js',
					css = type == 'css',
					// Get the name from the url
					strip = url.split('libs/'),
					strip = strip[1].split('/'),
					name = strip[0];

				// If js, check if the name is in a src attribute in a <script> tag
				if(js) fileExists = $('script[src*="'+name+'"]');

				// Else if css, check if the name is in a href attribute in a <link> tag
				else if (css) fileExists = $('link[href*="'+name+'"]');

				// If loadedFile is undefined/not set, create a new array for the loaded files.
				if (typeof loadedFile === 'undefined' || loadedFile === null) loadedFile = new Array();

				// If loadedFile array doesn't include the url AND
				// the file doesn't exist in the document...

				// Using !loadedFile.includes(url) would be more ideal,
				// but due to no support in IE11, we can't use it.
				if (loadedFile.indexOf(url) == -1 && !fileExists.length) {

					// File isn't loaded yet...
					// If adding js...
					if(js) {
						console.groupCollapsed(name + ' on ' + this.$element.attr('id') + " timeline");
						console.log('The plugin isn\'t loaded.');

						// Load the plugin dynamically via Ajax.
						$.getScript(url)
							.done(function(script, textStatus) {
								// Then execute it via the callback option
								// Check if callback is a function, if it is then set a variable as the callback to be called.
								if (typeof callback === "function") callback(this);
							})
							.fail(function(jqxhr, settings, exception) {
								console.error("Failed to get " + url + "\n" + jqxhr + "\n" + this.settings + "\n" + exception);
							}); // End $.getScript function

						console.log('It was loaded dynamically.');
					}
					// Else if adding CSS...
					else if (css) {
						console.groupCollapsed(name);
						console.log('The plugin isn\'t loaded.');

						// Add a the CSS file in a new <link> after the last <link> in the head.
						$('<link>').attr({'href':url, 'rel':'stylesheet', 'type':"text/css"}).insertAfter(
							$('head').find('link').last()
						);

						console.log('It was loaded dynamically.');
					}
					// Push/add the url to the loadedFile array to check against.
					loadedFile.push(url);

				}
				// Else if the file exists in the document AND
				// the URL isn't in the loadedFile array...

				// Using !loadedFile.includes(url) would be more ideal,
				// but due to no support in IE11, we can't use it.
				else if (fileExists.length && loadedFile.indexOf(url) == -1) {
					// The file is already loaded in the document via a <script> tag...
					if(js) {
						console.groupCollapsed(name + ' on ' + this.$element.attr('id') + " timeline");
						console.log('The plugin has already been loaded in the document via a <script> tag, no need to load it again.');

						// Execute the plugin via the callback option.
						// Check if callback is a function, if it is then set a variable as the callback to be called.
						if (typeof callback === "function") callback(this);
					}
					// Push/add the url to the loadedFile array to check against.
					loadedFile.push(url);
				}
				// Else the plugin has already been loaded...
				else {
					if(js) {
						console.groupCollapsed(name + ' on ' + this.$element.attr('id') + " timeline");
						console.log('The plugin has already been loaded, no need to load it again.');

						// Execute the plugin via the callback option.
						// Check if callback is a function, if it is then set a variable as the callback to be called.
						if (typeof callback === "function") callback(this);
					}
				}

				if(js) {
					console.log('Executed on:', this.$element);
				}
				console.groupEnd();

				// Save the loadedFile array as data to the body to be able to reload it next time it's accessed.
				$('body').data('plugin_'+ this._name +'_loadedFile', loadedFile);
			} // End if addRequiredFile statement.
			// If addRequiredFile is false we just need to execute the plugin via the callback option.
			else {
				// Check if callback is a function, if it is then set a variable as the callback to be called.
				if (typeof callback === "function") callback(this);
			}
		} // End addFile function
 	}; // End Timeline Prototype

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations and allowing any
	// public function (ie. a function whose name doesn't start
	// with an underscore) to be called via the jQuery plugin,
	// e.g. $(element).defaultPluginName('functionName', arg1, arg2)
	$.fn[pluginName] = function (options) {
		var args = arguments,
			windowWidth = $(window).width(),
		    	// data-date deprecated as of v2.0.5.alpha.3
			// and will be removed in a later major version.
			dataAttribute = ($(this).find('li').data('horizontal-timeline')) ? "data-horizontal-timeline": "data-date",
		    
			dateExists = $(this).find('.events-content').find('li['+ dataAttribute +']').map(function() {
				if ($(this).data('horizontal-timeline')) {
					var data = $(this).data('horizontal-timeline');

					return data.date;
				}
				// data-date deprecated as of v2.0.5.alpha.3
				// and will be removed in a later major version.
				else {
					var dataDate = $(this).data('date');

					return dataDate;
				}
			}).get();

		// Is the first parameter an object (options), or was omitted,
		// instantiate a new instance of the plugin.
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {

				// Only allow the plugin to be instantiated once,
				// so we check that the element has no plugin instantiation yet
				if (!$.data(this, 'plugin_' + pluginName)) {

					// if it has no instance, create a new one,
					// pass options to our plugin constructor,
					// and store the plugin instance
					// in the elements jQuery data object.
					$.data(this, 'plugin_' + pluginName, {
						'originalEventsContent': $(this).find('.events-content').clone()[0],
						'windowWidth': windowWidth,
						'existingDates': dateExists,
						'Timeline': new Timeline(this, options)
					});
					if (options !== undefined && options.autoplay == true) { // changed
						autoplayObj = {
							"isPaused": false,
							"mouseEvent": false
						};

						$(this).data('plugin_'+ pluginName)['autoplay'] = autoplayObj;
					}
				}
			});

		// If the first parameter is a string and it doesn't start
		// with an underscore or "contains" the `init`-function,
		// treat this as a call to a public method.
		} 
		else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			// Cache the method call
			// to make it possible
			// to return a value
			var returns;

			this.each(function () {
				var instance = $.data(this, 'plugin_' + pluginName)['Timeline'];

				// Tests that there's already a plugin-instance
				// and checks that the requested public method exists
				if (instance instanceof Timeline && typeof instance[options] === 'function') {

					// Call the method of our plugin instance,
					// and pass it the supplied arguments.
					returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ));
				}
			});

			// If the earlier cached method
			// gives a value back return the value,
			// otherwise return this to preserve chainability.
			return returns !== undefined ? returns : this;
		}
	};

})( jQuery, window, document );
