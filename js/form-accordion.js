// Form Accordion
// Author: Oliver Joseph Ash
;(function ($) {

  $.fn.formAccordion = function (options) {

    var defaultOptions =
        { auto: false
        , rows: {}
        , animate: true
        , animationDuration: 200
        }
      , defaultRowOptions =
        { toggleNext: 1
        , condition: function ($target, $el) {

            // If there are no set conditions, as a default we check that the
            // field has a value.
            if ($target.is('[type="radio"]')) {
              // input(type='radio')
              // Test if the radio button is checked
              return $target.is(':checked');

            } else if ($target.is('[type="select"]')) {

              // select
              // Test if the selected option of the target is empty and
              // disabled (the latter is to avoid placeholders)
              return $target.val() !== '' && $target.children().eq($target[0].selectedIndex).attr('disabled') === undefined;

            } else {

              // input(type='text') or textarea
              // Test if the target is empty
              return $target.val() !== '';
            }

          }
        };

    options = $.extend({}, defaultOptions, options);

    return this.each(function () {

      var $this = $(this)
        , $rows
        , $actionRows;

      if (options.el) {
        $rows = $this.find(options.el);

      } else {

        $rows = $this.children();
      }

      if (options.auto === true) {
        $actionRows = $rows;

      } else {

        $actionRows = $rows.map(function (index) {
          // If this row exists as an option, map it to $actionRows
          if (options.rows[index]) {
            return this;
          }
        });
      }

      $actionRows.each(function () {
        var $row = $(this)
          , rowIndex = $row.index();

        // Apply the default row options, such as the conditions
        options.rows[rowIndex] = $.extend({}, defaultRowOptions, options.rows[rowIndex]);

        // If the automatic option is set, calculate how many rows come after
        // this one and set that as the toggleNext value
        if (options.auto === true) {
          options.rows[rowIndex].toggleNext = $rows.length - 1 - $row.index();
        }
      });

      $actionRows.on('change input', function (event) {

        // Find the items to toggle using toggleNext value
        var $row = $(this)
          , $target = $row.find(event.target)
          , $childRows
          , rowIndex = $row.index()
          , condition;

        $childRows = $rows.slice(rowIndex + 1, rowIndex + 1 + options.rows[rowIndex].toggleNext);

        condition = options.rows[rowIndex].condition($target, $row);

        // If condition is true we reverse the childRows so that top level rows
        // are priortised (to prevent rigirous sliding up and down of rows).
        if (condition === true) {
          $childRows = $($childRows.get().reverse());
        }

        $childRows.each(function () {

          var $childRow = $(this)
            , $childTarget = $childRow.find('input, textarea, select');

          if (condition === true) {
            $childTarget.removeAttr('disabled');

            if (options.animate) {
              $childRow.slideDown(options.animationDuration);
            }

            // If this child row is also an action row, trigger a check on this
            // too.
            if ($.inArray($childRow[0], $actionRows) !== -1) {
              $childTarget.trigger('change').trigger('input');
            }

          } else if (condition === false) {

            // Disable the target of this child row
            $childTarget.attr('disabled', '');

            // Animate in the child row
            if (options.animate) {
              // We use $.stop to clear the queue after the current animation.
              // This prevents conditions of child rows overriding the parent
              // condition and thus a build up of animations.
              $childRow.stop(false, true).slideUp(options.animationDuration);
            }
          }

        });

        // Finally perform a callback if one has been set for this row.
        if (options.rows[rowIndex].callback) {
          options.rows[rowIndex].callback(condition, $target, $row);
        }

      });

      // Trigger the events on page load
      $($actionRows.get().reverse()).find('input, textarea, select').trigger('change').trigger('input');

      $actionRows.stop();

    });

  };

}(jQuery));