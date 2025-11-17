# Hugo Debug Bar

## Screenshots

![screenshot of debug bar open](/screen-op.png)
![screenshot of debug bar closed](/screen-clo.png)

## Why?

There are a few existing resources for similar features.

I made this debug bar for fun and to explore Hugo a bit more, and save some time when I need to print site params and other common data.

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
  --hdb-bg-color-inner: rgba(15,10,10, 79%);/*#0f0a0ac9;*/
  --hdb-color: #c0c0c0;
  --hdb-color-hover: #fafafa;
  --hdb-color-value: #00fcff;
  --hdb-color-current-menu: #67ff00;
  --hdb-border-color: #282828;
  --hdb-color-bool-true: #5fff00;
  --hdb-color-bool-false: #ffd200;
  --hdb-border-color-table: #ddd;
```

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
