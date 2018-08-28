# md-to-html

CLI tool to convert Markdown to HTML.

## Installation

```
npm install -g @kubosho/md-to-html
```

## Usage

Output HTML to stdout:

```
md-to-html foo.md
```

Output HTML to file:

```
md-to-html foo.md --to path/to/foo.html
```

## Options

### `--out <filepath>`, `-o <filepath>`

Output HTML file to specified path.

### `--outDir <filepath>`

Output HTML file to specified directory.
