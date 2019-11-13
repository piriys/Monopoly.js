# Monopoly.js

Implementation of monopoly game with javascript.

# Setting Up

Simply added `monopoly.js` file into your html and run:
```javascript
Monopoly.load();
```

By default the script will target `body` DOM and load a game into it. However, you can set `loadTarget` parameter into the loader function to change target. For example:
```html
<script>
  Monopoly.load({ loadTarget: "#loadHere" });
</script>

<div id="loadHere"></div>
```

View Demo [Here](https://piriys.github.io/Monopoly.js/)
