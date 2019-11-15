# Monopoly.js

[![GitHub release](https://img.shields.io/github/v/release/piriys/Monopoly.js.svg)](https://GitHub.com/piriys/Monopoly.js/releases/)

Implementation of monopoly game with javascript.

## Demo

View Demo [Here](https://piriys.github.io/Monopoly.js/)

## Setup

<!--
### By Bookmark

Drag and drop the link below onto your bookmark bar. Click on the bookmark to load the game onto any page.

<a class="monopolyjs-bookmark" href="javascript:(" title="🎮 Monopoly.js">🎮 Monopoly.js</a>

### By Downloading -->

Add `monopoly.js` file into your html and run:

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
