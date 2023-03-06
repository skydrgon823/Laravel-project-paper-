<div class="col-lg-3 col-md-6 col-sm-6 col-6">
    <h5 class="widget-title  wow fadeIn animated" style="color:#18327a; margin-bottom:42px">{{ $config['name'] }}</h5>
    {!!
        Menu::generateMenu(['slug' => $config['menu_id'], 'options' => ['class' => 'footer-list wow fadeIn animated mb-sm-5 mb-md-0']])
    !!}
</div>
