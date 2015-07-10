/**
 * Postprocess a service call.
 * @param {Object} options
 * @param {Object} result
 */
function staticmap_services_postprocess(options, result) {
  try {
    if (options.service == 'system' && options.resource == 'connect') {
      drupalgap.staticmap = result.staticmap;
    }
  }
  catch (error) { console.log('hook_services_postprocess - ' + error); }
}

/**
 * Implements hook_field_formatter_view().
 */
function staticmap_field_formatter_view(entity_type, entity, field, instance, langcode, items, display) {
  try {
    
    //console.log(entity_type);
    //console.log(entity);
    //console.log(field);
    //console.log(instance);
    //console.log(langcode);
    //console.log(items);
    //console.log(display);

    var preset = drupalgap.staticmap.presets[display.settings.preset];
    //console.log(preset);
    
    // Iterate over each item, and place a widget onto the render array.
    var content = {};
    var path_prefix = drupalgap.settings.mode == 'phonegap' ? 'https:' : '';
    $.each(items, function(delta, item) {
        var path = path_prefix +
          '//maps.googleapis.com/maps/api/staticmap?center=' + items[delta].lat + ',' + items[delta].lon + '&' +
          'zoom=' + preset.zoom + '&size=' + preset.mapsize + '&maptype=' + preset.maptype +
          '&markers=size:mid%7Ccolor:red%7C' + items[delta].lat + ',' + items[delta].lon;
        content[delta] = {
          theme: 'image',
          path: path
        };
    });
    return content;
  }
  catch (error) { console.log('telephone_field_formatter_view - ' + error); }
}

