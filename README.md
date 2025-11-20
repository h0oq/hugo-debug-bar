# Hugo Debug Bar

## Demo

[See example](https://h0oq.github.io/hugo-debug-bar-demo/)

## Why?

There are a few existing resources for similar features.

I made this debug bar to build some UI, and save some time when I need to print Hugo params and other common data.

## Warning

Hugo has built-in commands for dev that work great. This tool can't replace them, and it can't get updated data in real-time, for example, the statistics are only updated when you rebuild/restart the server.

Keep that in mind, if you want to try it.

One possible approach would consist of using poll intervals to make Hugo dynamic, but it's not implemented in this module.

In the meantime, you may leverage the `--templateMetrics` flag.

## Implementation

Add the following code to your module list in the `hugo.toml` file:

```toml
[module]
  [module.hugoVersion]
    extended = true
    min = '0.146.0'
  [module.imports]
    path = "github.com/h0oq/hugo-debug-bar"
```

## Position

If you don't want the debug bar at the top at the page, you should be able to push it to the bottom with that param:

```toml
[params]
  [params.HDB]
    position = "bottom" # either "bottom" or "top" (default position is "top")
```

## Colors

```CSS
  --hdb-bg-color: #0f0a0a;
  --hdb-bg-color-inner: #0f0a0a;
  --hdb-color: #c0c0c0;
  --hdb-color-hover: #fafafa;
  --hdb-color-print-value: #00fcff;
  --hdb-color-current-menu: #67ff00;
  --hdb-border-color: #282828;
  --hdb-color-print-bool-true: #5fff00;
  --hdb-color-print-bool-false: #ffd200;
  --hdb-border-color-table: #ddd;
```

## V4 settings

I made a new tab, with fun settings, like background color and color.

Basically, it allows tweaking all CSS vars for colors.

This is quite experimental, but it should work.

A better approach would limit the picker to specific ranges of colors, but it's not implemented yet.

## Hugo modules

This part can be tricky, and it depends on your current usage.

### You don't have any module on your project

```
hugo mod init myproject.com
hugo mod tidy
```

You should now see files such as `go.mod` and `go.sum`.

Now, type:

```
hugo mod vendor
hugo mod graph
```

You should see `github.com/h0oq/hugo-debug-bar`.

### You already have modules on your project

```
hugo mod tidy
hugo mod vendor
hugo mod graph
```

### Updating to the latest version of the module

```
hugo mod get -u github.com/h0oq/hugo-debug-bar
```

### Display the debug bar

Don't forget to open your `layouts/baseof.html` and add the following wherever you like (within `<body></body>`): 

```html
{{- if hugo.IsDevelopment }}
  {{- partial "debug-bar/main.html" . }}
{{- end }}
```

## Local copy/development

Go to your local site powered by Hugo and edit config `hugo.toml`:

```toml
[module]
  replacements = "github.com/h0oq/hugo-debug-bar-> /path/to/hugo-debug-bar-local"
  [module.hugoVersion]
    extended = true
    min = '0.146.0'
  [module.imports]
  	path = "github.com/h0oq/hugo-debug-bar"
```

Hugo will use the local files instead of the remote repository.
