# Hugo Debug Bar

## Screenshots

![screenshot of debug bar open](/screen-open-min.png)
![screenshot of debug bar closed](/screen-close-min.png)

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

### Use it as a Partial

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
