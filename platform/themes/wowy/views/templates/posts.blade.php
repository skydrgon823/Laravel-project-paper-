@if ($posts->count() > 0)
    <div class="single-header mb-80">
        <h2 class="font-xxl" style="color:#18327a">Aktuelles über Papierservice</h2>
    </div>
        <!--<div class="entry-meta meta-1 font-xs mt-15 mb-15">-->
        <!--    <span class="post-by has-dot d-inline-block">{{ __(':count Categories', ['count' => app(\Botble\Blog\Repositories\Interfaces\CategoryInterface::class)->count(['status' => \Botble\Base\Enums\BaseStatusEnum::PUBLISHED])]) }}</span>-->
        <!--    <span class="post-on d-inline-block has-dot">{{ __(':count Articles', ['count' => app(\Botble\Blog\Repositories\Interfaces\PostInterface::class)->count(['status' => \Botble\Base\Enums\BaseStatusEnum::PUBLISHED])]) }}</span>-->
        <!--    <span class="hit-count d-inline-block has-dot">{{ __(':count Views', ['count' => number_format(app(\Botble\Blog\Repositories\Interfaces\PostInterface::class)->getModel()->sum('views'))]) }}</span>-->
        <!--</div>-->
    

    <div class="loop-grid pr-30">
        <div class="row">
            @foreach ($posts as $post)
                
                    <div class="col-lg-4">
                        <article class="wow fadeIn animated hover-up mb-2">
                            <div class="post-thumb img-hover-scale">
                                <a href="{{ $post->url }}">
                                    <img src="{{ RvMedia::getImageUrl($post->image, 'medium', false, RvMedia::getDefaultImage()) }}" alt="{{ $post->name }}">
                                </a>
                                @if ($post->first_category->name)
                                    <div class="entry-meta">
                                        <a class="entry-meta meta-2" href="{{ $post->first_category->url }}">{{ $post->first_category->name }}</a>
                                    </div>
                                @endif
                            </div>
                            <div class="entry-content-2">
                                <div class="entry-meta meta-1 font-xs color-grey mt-1 pb-1 mb-0">
                                    <div>
                                        <span class="post-on has-dot" style="padding:0; color:#18327a">{{ $post->created_at->translatedFormat('d M, Y') }}</span>
                                        <!--<span class="hit-count has-dot">{{ __(':count Views', ['count' => number_format($post->views)]) }}</span>-->
                                    </div>
                                    <!--<a href="{{ $post->url }}" class="text-brand">{{ __('Read more') }} <i class="fa fa-arrow-right fw-300 text-brand ml-5"></i></a>-->
                                </div>
                                <h3 class="post-title mb-2" style="color:#18327a; font-weight:600;">
                                    <a href="{{ $post->url }}">{{ $post->name }}</a></h3>
                                <p class="post-exerpt mb-30" style="color:#18327a;font-size:14px">{{ $post->description }}</p>
                                <!--<div class="entry-meta meta-1 font-xs color-grey mt-10 pb-10">-->
                                <!--    <div>-->
                                <!--        <span class="post-on has-dot"> <i class="far fa-clock"></i> {{ $post->created_at->translatedFormat('M d, Y') }}</span>-->
                                <!--        <span class="hit-count has-dot">{{ __(':count Views', ['count' => number_format($post->views)]) }}</span>-->
                                <!--    </div>-->
                                <!--    <a href="{{ $post->url }}" class="text-brand">{{ __('Read more') }} <i class="fa fa-arrow-right fw-300 text-brand ml-5"></i></a>-->
                                <!--</div>-->
                            </div>
                        </article>
                    </div>
                
            @endforeach
        </div>
    </div>

    {!! $posts->withQueryString()->links(Theme::getThemeNamespace() . '::partials.custom-pagination') !!}
@endif

