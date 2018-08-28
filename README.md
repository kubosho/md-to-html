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
md-to-html foo.md --out path/to/foo.html
```

Output HTML to directory:

```
md-to-html foo.md --outDir path/to
```

## Options

### `--out <filepath>`, `-o <filepath>`

Output HTML file to specified path.

### `--outDir <filepath>`

Output HTML file to specified directory.
