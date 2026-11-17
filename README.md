# X.com Full-Size Video

A tiny Firefox add-on that removes the inline `max-width` style X.com puts on
the wrapper around videos, e.g.

```html
<div class="css-g5y9jx" style="max-width: 292.823px;">
```

becomes

```html
<div class="css-g5y9jx">
```

so videos are displayed at full size.

## Try it (temporary install)

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on…** and select `manifest.json` in this folder.
3. Reload any open x.com tabs.

Temporary add-ons are removed when Firefox restarts.

## Permanent install

Firefox only installs signed add-ons permanently. Zip the files and submit them
to [addons.mozilla.org](https://addons.mozilla.org/developers/) as an
**unlisted** add-on to get a signed `.xpi` for personal use:

```bash
zip -r x-com-fullsize-video.zip manifest.json content.js
```

## How it works

On pages whose URL contains `status` (individual posts), `content.js` finds
every `div.css-g5y9jx` with an inline `max-width` that contains a video, and
removes its `style` attribute. On those same pages, it also removes the
`style` attribute from every `div` with the classes `css-g5y9jx r-k200y`,
and sets `style="width: 562px;"` on every `div` with the classes
`css-g5y9jx r-1adg3ll r-1udh08x`. A `MutationObserver`
re-runs this as the page loads new posts or React re-applies the style.
