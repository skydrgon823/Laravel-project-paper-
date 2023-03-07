    {{-- @if (is_plugin_active('newsletter'))
        {!! do_shortcode('[newsletter-form title="' . __('Sign up to Newsletter') . '" description="' . __('...and receive $25 coupon for first shopping.') . '"][/newsletter-form]') !!}
    @endif --}}
    <div class="transfer">
        <div class="bbb">
          <div class="aaa">
            <i class="fas fa-wallet" style="font-size:24px;color:#18327a"></i>&nbsp; Kauf auf Rechnung
          </div>
          <div
            class="aaa1"
          
          >
            <i class="fa fa-shopping-bag" style="font-size:24px;color:#18327a"></i>&nbsp; Persönliche
                    Beratung
          </div>
          <div class="aaa">
            <i class="fa fa-truck" style="font-size:24px;color:#18327a"></i>&nbsp; Zustellung mit eigenem
                    Fuhrpark
          </div>
        </div>
      </div>
    
    <footer class="main">
      
    
        <section class="section-padding-60">
            <div class="container">
                <div class="row">
                    {!! dynamic_sidebar('footer_sidebar') !!}
                    
                </div>
                
                <div id="site-info2">
                    <div class="col-12" style="border-bottom: 1px solid #b9c1d7; margin:30px 0"></div>
                    
                    <div class="col-6">
                        @if (theme_option('address'))
                            <p class="wow fadeIn animated " style="margin-bottom: 24px;
                               font-size:16px;color: #18327a;" >                  
                                   Hauptstraße 9 </br>
                                    2763 Pernitz </br>
                                    Austria               
                            </p>
                        @endif
                    </div>
                    <div class="col-6">
                        <div style="text-decoration: underline;font-size:14px;color: #18327a;">
                            Auf Katre anzeigen
                        </div>      
                        @if (theme_option('social_links'))
                    
                            <div class="mobile-social-icon wow fadeIn animated mb-sm-5 mb-md-0" style="display:flex !important;">
                                @foreach(json_decode(theme_option('social_links'), true) as $socialLink)
                                    @if (count($socialLink) == 4)
                                        <a href="{{ $socialLink[2]['value'] }}"
                                           title="{{ $socialLink[0]['value'] }}" style=" font-size:20px;margin-top:18px border: 1px solid {{ $socialLink[3]['value'] }};">
                                            <i class="{{ $socialLink[1]['value'] }}"></i>
                                        </a>
                                    @endif
                                @endforeach
                            </div>
                        @endif
                    </div>
                 
                </div>
                
            </div>
        </section>
        {{-- <div class="container pb-20 wow fadeIn animated">
            <div class="row">
                <div class="col-12 mb-20">
                    <div class="footer-bottom"></div>
                </div>
                <div class="col-lg-6">
                    <p class="float-md-left font-sm text-muted mb-0">{{ theme_option('copyright') }}</p>
                </div>
                <div class="col-lg-6">
                    <p class="text-lg-end text-start font-sm text-muted mb-0">
                        {{ __('All rights reserved.') }}
                    </p>
                </div>
            </div>
        </div> --}}
    </footer>

    <!-- Quick view -->
    <div class="modal fade custom-modal" id="quick-view-modal" tabindex="-1" aria-labelledby="quick-view-modal-label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-body">
                    <div class="half-circle-spinner loading-spinner">
                        <div class="circle circle-1"></div>
                        <div class="circle circle-2"></div>
                    </div>
                    <div class="quick-view-content"></div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{URL::asset('/themes/wowy/owl-carousel/owl.carousel.min.js')}}"></script> 
    <script>
        $(document).ready(function() {
            
            $(".owl-carousel-d").owlCarousel({
                loop: true,
                navigation : false, 
           
                slideSpeed : 300,
                paginationSpeed : 400,
           
                items : 1, 
                itemsDesktop : false,
                itemsDesktopSmall : false,
                itemsTablet: false,
                itemsMobile : false
           
            });
           
          });
      </script>
          <script>
        $(document).ready(function() {
            
            $(".owl-carousel-md").owlCarousel({
                loop: true,
                navigation : false, 
           
                slideSpeed : 300,
                paginationSpeed : 400,
           
                items : 2, 
                itemsDesktop : false,
                itemsDesktopSmall : false,
                itemsTablet: false,
                itemsMobile : false
           
            });
           
          });
      </script>
    {{-- <script>
        $('.horizontal-timeline').horizontalTimeline({
            // ! Deprecated these individual options in favour of the object options. //
            desktopDateIntervals: 200,
            tabletDateIntervals: 150,
            mobileDateIntervals: 120,
            minimalFirstDateInterval: true,
            // ! End Deprecated options //
            
            /* New object options... */
            // If object doesn't exist in the user options, then default to the individual options,
            // otherwise use the object.
            
            // Can not use in conjunction with the single options...
            // If both single and object options are set in the options, the object will take precedence.
            
            dateIntervals: {
            "desktop": 200,
            "tablet": 150,
            "mobile": 120,
            "minimal": true
            },
            /* End new object options */
            
            dateDisplay: "year", // dateTime, date, time, dayMonth, monthYear, year
            dateOrder: "normal", // normal, reverse
            
            autoplay: false,
            autoplaySpeed: 8,
            autoplayPause_onHover: false,
            
            useScrollWheel: false,
            useTouchSwipe: true,
            useKeyboardKeys: false,
            addRequiredFile: true,
            useFontAwesomeIcons: true,
            useNavBtns: true,
            useScrollBtns: true,
          
            iconBaseClass: "fas fa-3x",
            
            prev_iconClass: "fa-arrow-circle-left",
            next_iconClass: "fa-arrow-circle-right",
            pause_iconClass: "fa-pause-circle",
            play_iconClass: "fa-play-circle",
            
            animation_baseClass: "animationSpeed", 
            enter_animationClass: {
            "left": "enter-left",
            "right": "enter-right"
            },
            exit_animationClass: {
            "left": "exit-left",
            "right": "exit-right"
            },
   
            
            iconClass: {
            "base": "fas fa-3x", // Space separated class names
            
            "prev": "fa-arrow-circle-left",
            "next": "fa-arrow-circle-right",
            "pause": "fa-pause-circle",
            "play": "fa-play-circle"
            },
            animationClass: {
            "base": "animationSpeed", // Space separated class names
            "enter": {
            "left": "enter-left",
            "right": "enter-right"
            },
            "exit": {
            "left": "exit-left",
            "right": "exit-right"
            }
            }
            
            });
      </script> --}}
        <script>
            window.siteUrl = "{{ route('public.index') }}";
        </script>

        @if (is_plugin_active('ecommerce'))
            <script>
                window.currencies = {!! json_encode(get_currencies_json()) !!};
            </script>
        @endif

        {!! Theme::footer() !!}

    <script>
        window.trans = {
            "Views": "{{ __('Views') }}",
            "Read more": "{{ __('Read more') }}",
            "days": "{{ __('days') }}",
            "hours": "{{ __('hours') }}",
            "mins": "{{ __('mins') }}",
            "sec": "{{ __('sec') }}",
            "No reviews!": "{{ __('No reviews!') }}"
        };
    </script>

    {!! Theme::place('footer') !!}

    @if (session()->has('success_msg') || session()->has('error_msg') || (isset($errors) && $errors->count() > 0) || isset($error_msg))
            <script type="text/javascript">
                $(document).ready(function () {
                    @if (session()->has('success_msg'))
                    window.showAlert('alert-success', '{{ session('success_msg') }}');
                    @endif

                    @if (session()->has('error_msg'))
                    window.showAlert('alert-danger', '{{ session('error_msg') }}');
                    @endif

                    @if (isset($error_msg))
                    window.showAlert('alert-danger', '{{ $error_msg }}');
                    @endif

                    @if (isset($errors))
                    @foreach ($errors->all() as $error)
                    window.showAlert('alert-danger', '{!! BaseHelper::clean($error) !!}');
                    @endforeach
                    @endif
                });
            </script>
        @endif
        <script>
                setTimeout(() => {
                    
                    $(".video").click();
                    $(".video")[0].autoplay = true;
                    $(".video")[0].muted = true;
                    $(".video")[0].loop = true;
                    $(".video")[0].load()
                }, 10000)
            
            // });
        </script>
        
          <!-- <script>  
        const element = document.querySelector(".carousel1");
        element.addEventListener('wheel', (event) => {
        event.preventDefault();
        element.scrollBy({
        left: event.deltaY < 0 ? -500 : 500,    
        });
      });
    </script> -->
    <!-- <script>
        const el=document.getElementsByClassName("carousel1")[0];
        const prevbtn=document.getElementsByClassName("prev")[0],
              nextbtn=document.getElementsByClassName("next")[0];
        prevbtn.addEventListener("mouseover", function handleMouseOver(){
            prevbtn.style.visibility = 'visible';
            nextbtn.style.visibility = 'visible';
        });
        nextbtn.addEventListener("mouseover", function handleMouseOver(){
            prevbtn.style.visibility = 'visible';
            nextbtn.style.visibility = 'visible';
        });
        el.addEventListener("mouseover", function handleMouseOver(){
            prevbtn.style.visibility = 'visible';
            nextbtn.style.visibility = 'visible';
        });
        el.addEventListener("mouseout", function handleMouseOut(){
            prevbtn.style.visibility = 'hidden';
            nextbtn.style.visibility = 'hidden';
        });
       
    </script>
    <script>
      const gap = 16;

      const carousel = document.getElementsByClassName("carousel1")[0],
        content = document.getElementsByClassName("imgcontent")[0],
        next = document.getElementsByClassName("next")[0],
        prev = document.getElementsByClassName("prev")[0];

      next.addEventListener("click", (e) => {
        carousel.scrollBy(width + gap, 0);
        if (carousel.scrollWidth !== 0) {
          prev.style.display = "flex";
        }
        if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
          next.style.display = "none";
        }
      });
      prev.addEventListener("click", (e) => {
        carousel.scrollBy(-(width + gap), 0);
        if (carousel.scrollLeft - width - gap <= 0) {
          prev.style.display = "none";
        }
        if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
          next.style.display = "flex";
        }
      });

      let width = carousel.offsetWidth;
      
      window.addEventListener("resize", (e) => (width = carousel.offsetWidth));
    </script> -->
    </body>
</html>
