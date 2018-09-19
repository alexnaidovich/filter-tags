# filter-tags

### v.0.0.1 Initial Release

No-depeidincies VanillaJS library to visualise search via tags.

The search and filtering itself isn't implemented yet, but it fits well for creating visual layout of the page's filter search tool.

[Live Demo Page](https://alexnaidovich.github.io/filter-tags/)

![how it looks](https://raw.githubusercontent.com/alexnaidovich/filter-tags/master/screenshots/01.PNG)

## Install

### My grandpa's way:

```html
<script src="https://raw.githubusercontent.com/alexnaidovich/filter-tags/master/filter-tags.js"></script>
```

### Usual way
Terminal:
```
npm install filter-tags
```
Index.js
```javascript
const filterTags = require('filter-tags');
```

## Init

You sholud have a:
  * form element (obligatory);
  * div for tags to be added into/removed from (optional, if isn't passed, some strange div will be created somewhere at the page :-) );
  * class name to ignore (events delegated on the whole form, if you pass some classes here, events won't affect elems with those classes);
  * kinda wish to style tags by yourself (boolean/optional, if ```false```, default styles to ```[class^="ft"]``` won't be applied. Defaults to ```true```);
  * if you want, you may pass custom render callback.

In general, your HTML should look like this:

```html
<form class="for-filter">
    <div class="tagzone"></div>

    <div class="some-checkboxes">
        <label><input type="checkbox" name="ch1" data-ft="Default Value">Checkbox 1</label>
        <label><input type="checkbox" name="ch2">Checkbox 2</label>
        <label><input type="checkbox" name="ch3">Checkbox 3</label>
    </div>

    <div class="some-radios">
        <h3 class="ft--ignore">Nothing will happen on klick on this heading</h3>
        <label><input type="radio" name="radio">Radio 1</label>
        <label><input type="radio" name="radio">Radio 2</label>
        <label><input type="radio" name="radio">Radio 3</label>
    </div>

    <div class="maybe-keyword">
        <label><input type="text" placeholder="Keyword..."></label> 
    </div>

</form>
```

And your JS is going to be:
```javascript
filterTags('.for-filter', {     // Form selector - @string - OBLIGATORY
    // options
    tagZone: '.tagzone',        // Tags container - @string - optional/preferred
    ignoreClass: '.ft--ignore', // Ignorelist - @string or @array - optional 
    useDefaultStyle: false,     // def style - @boolean - def to true - optional
    render: tag => {
        // your custom callback = @function - optional
    }
})
```

## Public API

TBD - None at the moment.

## TODO: 

  1. Public API :);
  2. Demo page -> ** DONE! **;
  3. Reduce multiple loops;
  4. Make input[type="text"] handling properly
  5. Implement a search with results based on filters (for now it is nothing more than a visualiser).

## PRs are highly welcome!

License: MIT.
