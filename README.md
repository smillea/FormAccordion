# Form Accordion

A jQuery plugin for easily hiding and revealing related form fields conditionally.

## Live Example

Take a look at [an example](http://oliverjash.github.com/FormAccordion/).

## Usage

The plugin follows a simple markup pattern: any children elements are treated as form rows. For example:

    <form id="example-1">
      <div>
        <label>…</label>
        <input>
      </div>
      <div>
        <label>…</label>
        <input>
      </div>
      <div>
        <label>…</label>
        <input>
      </div>
    </form>

Above is the initial required structure – a series of elements (form rows) wrapped in a container. This can be any combination of elements that has the same structure.

Once you have your markup, initialise the plugin:

    $('#example-1').formAccordion();

## Options

Form Accordion can take an optional paramater - an object of key/value options:

* **`auto`** Boolean - Specifies whether or not to automatically apply behaivours to all form rows using default conditions (such as `if input is not empty`).
* **`rows`** Object - Objects representing rows in the form. Key is the index of the row you want to target, value is the object of options for this row (see example).
* **`animate`** Boolean - Specifies whether or not the hiding and revealing of form rows should be animated.
* **`animationDuration`** Integer (ms) - The duration of the animation.

### Example

    $('#example-2').formAccordion(
      { auto: false
      , animate: true
      , animationDuration: 200
      , rows:
        {}
      }
    );

By default, `auto` is disabled. The plugin expects that you will want to write your own tests.

### Row Options

The options you may need to write your own tests are:

* **`toggleNext`** Integer - The number of form rows following this row which should be hidden/revealed.
* **`condition`** Function ($target, $el) - The condition that should be tested against for hiding/revealing the next row(s).
* **`callback`** Function (condition, $target, $el) - Runs after each test.

#### Example

    $('#example-2').formAccordion(
      { rows:
        { 0:
          { toggleNext: 4
          , condition: function ($target, $el) {
              return $target.is(':checked') && $target.val() !== 'disagree';
            }
          }
        , 2:
          { toggleNext: 2
          , condition: function ($target, $el) {
              return $target.val() !== '';
            }
          }
        }
      }
    );

## Requirements

* jQuery (tested on 1.7)

### Browser Support

Tested and working in all browsers. Element transitions are powered by CSS3, so those elements will not transition in some non-HTML5 browsers. However, the fading transition from slide to slide will work in all browsers.

## Let's Make It Better

I would love to hear more about how to improve Form Accordion. Play with it and fork away. If you have any questions, contact me on [Twitter](http://twitter.com/OliverJAsh).

## License

<a rel="license" href="http://creativecommons.org/licenses/by/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Form Accordion</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://twitter.com/OliverJAsh" property="cc:attributionName" rel="cc:attributionURL">Oliver Joseph Ash</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/OliverJAsh/FormAccordion" rel="dct:source">https://github.com/OliverJAsh/FormAccordion</a>.
