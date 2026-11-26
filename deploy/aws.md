# Launching on AWS (S3 + CloudFront)

**Not tested against the real distribution.** Whoever manages it should review this first.
`vercel.json` has no effect on AWS.

## 1. Do not remove the app

www.amigohelp.ai also serves the product. This build contains none of it:

- `/signup/` and `/login/` return 200 from the current build.
- `/dashboard/`, `/account/`, `/my-docs/` and similar are app routes. They currently return
  status 404 with the app's HTML, which then renders the screen.

So:

- Upload **without** `--delete`, so the app's files (including its hashed `/assets/`) remain.
- Before uploading, copy the current app `index.html` to `app.html`. The new home page
  replaces `index.html`, and `404.html` or the error response may be replaced too.
- Send app routes to `app.html` (function below). `APP_PATHS` only lists paths linked from
  the public pages: **complete it from the app's router.**
- Check that `/signup/` and `/login/` still load the app after the upload.

## 2. CloudFront Function (viewer request)

Merge this into the existing function if the behaviour already has one; keep whatever adds
trailing slashes and `index.html` today.

```js
var REDIRECTS = {
  "/referral-program": "/referral/",
  "/questions/explain-the-gap-in-your-cv": "/questions/explain-the-gap-in-your-resume/"
};
var APP_PATHS = ["/account", "/copilot-profiles", "/dashboard", "/my-briefs", "/my-docs",
  "/my-purchases", "/resume-builder", "/token-usage", "/tokens"];

function handler(event) {
  var request = event.request;
  var path = request.uri.replace(/\/+$/, "");

  if (REDIRECTS[path]) {
    return { statusCode: 301, statusDescription: "Moved Permanently",
             headers: { location: { value: REDIRECTS[path] } } };
  }
  for (var i = 0; i < APP_PATHS.length; i++) {
    if (path === APP_PATHS[i] || path.indexOf(APP_PATHS[i] + "/") === 0) {
      request.uri = "/app.html";
      return request;
    }
  }
  // Existing trailing-slash and index.html handling goes here.
  return request;
}
```

## 3. Before and after

1. While the old site is still live, run `python3 -I scripts/import_live_content.py` to pick up
   newly published pages, then `npm run build`.
2. Unknown URLs should return status 404 with the new `404.html`.
3. After launch, request every URL in the old sitemap and confirm 200 or 301.
