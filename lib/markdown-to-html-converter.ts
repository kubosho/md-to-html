import showdown from 'showdown';

type HtmlString = string;

function createConverter(): showdown.Converter {
  return new showdown.Converter();
}

export function convertToHtml(markdown: string): HtmlString {
  const converter = createConverter();
  return converter.makeHtml(markdown);
}
