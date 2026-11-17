// Removes the inline `style="max-width: ...px;"` from the css-g5y9jx wrapper
// around videos on x.com, so videos render at full width.

(() => {
  "use strict";

  // Video wrappers with an inline max-width (only touched if they contain a video).
  const VIDEO_WRAPPER_SELECTOR = 'div.css-g5y9jx[style*="max-width"]';
  // Divs with exactly these classes always have their style removed.
  const CLASS_SELECTOR = "div.css-g5y9jx.r-1adg3ll.r-1udh08x[style]";

  function containsVideo(el) {
    return el.querySelector('video, [data-testid="videoPlayer"], [data-testid="videoComponent"]') !== null;
  }

  function matchAll(root, selector) {
    const found = [];
    if (root.matches && root.matches(selector)) found.push(root);
    if (root.querySelectorAll) found.push(...root.querySelectorAll(selector));
    return found;
  }

  function fix(root) {
    for (const div of matchAll(root, VIDEO_WRAPPER_SELECTOR)) {
      if (containsVideo(div)) div.removeAttribute("style");
    }
    for (const div of matchAll(root, CLASS_SELECTOR)) {
      div.removeAttribute("style");
    }
  }

  // X is a single-page app that renders content dynamically, so scan the page
  // whenever it changes. Batch work into one pass per animation frame.
  let scheduled = false;
  function scheduleFix() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      fix(document.body);
    });
  }

  fix(document.body);

  new MutationObserver(scheduleFix).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style"], // React may re-apply the style on re-render
  });
})();
