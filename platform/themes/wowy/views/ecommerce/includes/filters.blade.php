@php
    Theme::asset()->usePath()
                    ->add('custom-scrollbar-css', 'plugins/mcustom-scrollbar/jquery.mCustomScrollbar.css');
    Theme::asset()->container('footer')->usePath()
                ->add('custom-scrollbar-js', 'plugins/mcustom-scrollbar/jquery.mCustomScrollbar.js', ['jquery']);
@endphp

<div class="shop-product-filter-header">
 
        @php
            $categories = ProductCategoryHelper::getProductCategoriesWithIndent()
                        ->where('status', \Botble\Base\Enums\BaseStatusEnum::PUBLISHED);

            if (Route::currentRouteName() != 'public.products' && request()->input('categories', [])) {
                $categories = $categories->whereIn('id', (array)request()->input('categories', []));
            }
        @endphp
        <div style="padding-top: 10px">
        <a class="show-advanced-filters" href="#">
            <span class="product-filter-title">Kategorien</span>
            
            <i class="far fa-angle-up angle-down"></i>
            <i class="far fa-angle-down angle-up"></i>
        </a>
        <div class="advanced-search-widgets"  style="display: none">
            <div class="row">
                @if (count($categories) > 0)
                    <div class=" mb-lg-0 mb-md-5 mb-sm-5 widget-filter-item">
                        
                        <div class="custome-checkbox">
                            <ul class="ps-list--categories">
                                @foreach(ProductCategoryHelper::getAllProductCategories()
                                            ->where('status', \Botble\Base\Enums\BaseStatusEnum::PUBLISHED)
                                            ->whereIn('parent_id', [0, null])
                                            ->loadMissing(['slugable', 'activeChildren:id,name,parent_id', 'activeChildren.slugable']) as $category)
                                    <li class="@if (URL::current() == $category->url) current-menu-item @endif @if ($category->activeChildren->count()) menu-item-has-children @endif">
                                        <a href="{{ $category->url }}">{{ $category->name }}</a>
                                        @if ($category->activeChildren->count())
                                            @include(Theme::getThemeNamespace() . '::views.ecommerce.includes.sub-categories', ['children' => $category->activeChildren])
                                        @endif
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
               @endif
            </div>
        </div>
        </div>  
       
        <div style="border-top: 1px solid #e1e1e1;padding-top: 10px">
            <a class="show-advanced-filters2" href="#">
                <span class="product-filter-title">Farbe</span>
                <i class="far fa-angle-up angle-down"></i>
                <i class="far fa-angle-down angle-up"></i>
            </a>
        
            <div class="advanced-search-widgets2" style="display: none" id="widgets1">
                <div class="row" onclick='handleClick(this);' >
                    {!! render_product_swatches_filter([
                    'view' => Theme::getThemeNamespace() . '::views.ecommerce.attributes.attributes-filter-renderer'
                ]) !!}
                </div>
            </div>
        </div>
 
        @php
        $brands = get_all_brands(['status' => \Botble\Base\Enums\BaseStatusEnum::PUBLISHED], [], ['products']);
        @endphp
        <div style="border-top: 1px solid #e1e1e1; padding-top: 10px">
             <a class="show-advanced-filters3" href="#">
                <span class="product-filter-title">Hersteller</span>
                <i class="far fa-angle-up angle-down"></i>
                <i class="far fa-angle-down angle-up"></i>
            </a>
            <div class="advanced-search-widgets3" style="display: none">
                <div class="row">
                    @if (count($brands) > 0)
                        <div class=" mb-lg-0 mb-md-5 mb-sm-5 widget-filter-item">
             
                            <div class="custome-checkbox">
                                @foreach($brands as $brand)
                                    <input class="form-check-input"
                                    onclick="handleClick(this);"
                                           name="brands[]"
                                           type="checkbox"
                                           id="brand-filter-{{ $brand->id }}"
                                           value="{{ $brand->id }}"
                                           @if (in_array($brand->id, request()->input('brands', []))) checked @endif>
                                    <label class="form-check-label" for="brand-filter-{{ $brand->id }}"><span class="d-inline-block">{{ $brand->name }}</span> <span class="d-inline-block">({{ $brand->products_count }})</span> </label>
                                    
                                @endforeach
                            </div>
                        </div>
                    @endif                       
                </div>
            </div>
        </div>
       
        <div style="border-top: 1px solid #e1e1e1;padding-top: 10px">
            <a class="show-advanced-filters4" href="#">
                <span class="product-filter-title">System</span>
                <i class="far fa-angle-up angle-down"></i>
                <i class="far fa-angle-down angle-up"></i>
            </a>
        
            <div class="advanced-search-widgets4" id="widgets4"style="display: none">
                <div class="row" id="widgets4" onclick='handleClick(this);' >
                    {!! render_product_swatches_filter([
                    'view' => Theme::getThemeNamespace() . '::views.ecommerce.attributes.attributes-filter-renderer'
                ]) !!}
                </div>
            </div>
        </div>
        <div style="border-top: 1px solid #e1e1e1;padding-top: 10px">
            <a class="show-advanced-filters5" href="#">
                <span class="product-filter-title">Lagen</span>
                <i class="far fa-angle-up angle-down"></i>
                <i class="far fa-angle-down angle-up"></i>
            </a>
        
            <div class="advanced-search-widgets5" style="display: none">
                <div class="row" onclick='handleClick(this);' >
                    {!! render_product_swatches_filter([
                    'view' => Theme::getThemeNamespace() . '::views.ecommerce.attributes.attributes-filter-renderer'
                ]) !!}
                </div>
            </div>
        </div>



        <div class="widget">
            <button  class="clearbtn"> <a class="clear_filter dib clear_all_filter" style="color: white" href="{{ route('public.products') }}">{{ __('Clear All Filter') }}</a></button>
    
            <button type="submit" id="form_submit"class="btn btn-sm btn-default" style="display: none"><i class="fa fa-filter mr-5 ml-0"></i> {{ __('Filter') }}</button>
        </div>
</div>

<script>
    function handleClick(cb) {
        $("#form_submit").submit();
     }
</script>