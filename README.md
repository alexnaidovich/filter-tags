# filter-tags

## IMPORTANT UPDATES - please type 'npm i filter-tags' to update!

See changelog below.

### v.0.3 Introducing API!!!

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

//or
import filterTags from 'filter-tags';
```

## Init

You sholud have a:
  * form element (obligatory);
  * div for tags to be added into/removed from (optional, if isn't passed, some strange div will be created somewhere at the page :-) );
  * class name to ignore (events are delegated on the whole form, if you pass some classes here, events won't affect elems with those classes);
  * kinda wish to style tags by yourself - option ```useDefaultStyle``` (boolean/optional, if ```false```, default styles to ```[class^="ft"]``` won't be applied. Defaults to ```true```);
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
        <h3 class="ft--ignore">Nothing will happen on click on this heading</h3>
        <label><input type="radio" name="radio">Radio 1</label>
        <label><input type="radio" name="radio">Radio 2</label>
        <label><input type="radio" name="radio">Radio 3</label>
    </div>

    <div class="maybe-keyword">
        <label><input type="text" placeholder="Keyword..."></label> 
    </div>

</form>
```

And your JS is going to be: (__important update:__ now you'd better __store new instance of filterTags into a variable__, for you to be able to use API)
```javascript
const ft = new filterTags('.for-filter', { // Form selector - @string - OBLIGATORY
    // options
    tagZone: '.tagzone',        // Tags container - @string - optional/preferred
    ignoreClass: '.ft--ignore', // Ignorelist - @string or @array - optional 
    useDefaultStyle: false,     // def style - @boolean - def to true - optional
    render: tag => {
        // your custom callback = @function - optional
    }
})
```

## Custom Styling

Tag is created with ```.ft--tag``` class, and the cross sign (removal trigger) is available by calling ```.ft--tag [data-ft-remove]``` selector.
If you don't pass ```useDefaultStyle: false``` in options, default prepared styles are applied, and you have to override them with ```!important```.

## data-ft attribute and default values

By default the data for a tag is taken from the content of ```<label>``` tag (it mostly goes to checkboxes and radios). You can implicitly set your own text to display in tag, by setting ```data-ft``` attribute on the input.

## Public API

  * ```ft.clearAll()``` - clear all inputs and remove all tags.
  * TBD

## TODO: 

  1. Public API (_started_) :);
  2. Reduce multiple loops;
  3. Make input[type="text"] handling properly;
  4. Implement a search with results based on filters (for now it is nothing more than a visualiser).

## Changelog

  * 0.3   - Public ```clearAll``` mtehod, store new instance of filterTags into a variable..
  * 0.2.2 - Updated demo page and docs
  * 0.2   - Implemented Demo Page
  * 0.1   - Had a little mess with controls
  * 0.0.1 - Initial Release


## PRs are highly welcome!

License: MIT.
