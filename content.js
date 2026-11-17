// Removes the inline `style="max-width: ...px;"` from the css-g5y9jx wrapper
// around videos on x.com, so videos render at full width.

(() => {
  "use strict";

  const SELECTOR = 'div.css-g5y9jx[style*="max-width"]';

  function containsVideo(el) {
    return el.querySelector('video, [data-testid="videoPlayer"], [data-testid="videoComponent"]') !== null;
  }

  function fix(root) {
    const candidates = [];
    if (root.matches && root.matches(SELECTOR)) candidates.push(root);
    if (root.querySelectorAll) candidates.push(...root.querySelectorAll(SELECTOR));

    for (const div of candidates) {
      if (containsVideo(div)) div.removeAttribute("style");
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
