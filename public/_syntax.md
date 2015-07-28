# markdownBrauser markdown syntax

markdownBrauser uses [showdownJS](http://showdownjs.github.io/showdown/)
to convert raw .md files retreived by the client via HTTP into HTML.
HTML is further enhanced by [KaTeX](https://github.com/Khan/KaTeX)
(to render LaTeX formulas) and [highlightJS](http://highlightjs.org)
(to syntax-highlight any code snippets).

Look at [this page's source](_syntax.md), as it provides short
examples for all basic syntax elements.

As markdown allows inclusion of HTML fragments, you can mix in any of the
[bootstrap examples](http://getbootstrap.com/css/).
For example: A markdown-generated blockquote, including HTML bootstrap footer:

> <p>Lorem ipsum dolor sit amet,
> consectetur adipiscing elit. Integer posuere erat a ante.</p>
> <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>

## Simple styling

To *emphasize*, encapsulate the word(s) in single `*`stars`*` or `_`s. (uses `<em>`).

To type **bold**, encapsulate the word(s) in double `**`stars`**` or `__`s (uses `<strong>`).

You can ~~not~~ enclose words inside two `~` tilde characters to strike trough (uses `<del>`)

# Header 1 <small>just for fun</small>

without automatic ```class="page-title"```, as above. But using bootstrap-styled `<small>...</small>` secondary text. Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Vivamus varius, turpis eu tempus finibus, augue nisl
consectetur tortor, vitae accumsan lorem diam sit amet mauris.

## Header 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius, turpis eu
tempus finibus, augue nisl consectetur tortor, vitae accumsan lorem diam sit amet mauris.

### Header 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius, turpis eu
tempus finibus, augue nisl consectetur tortor, vitae accumsan lorem diam sit amet mauris.

#### Header 4

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus varius, turpis eu
tempus finibus, augue nisl consectetur tortor, vitae accumsan lorem diam sit amet mauris.

##### Header 5: Look, sizable images!

![http://emberjs.com](vendor/emberjs-c8e2ad9b66688fc38ebf90363f0ab6c7.png =100x*)

When refering to other files, always make them relative to your `/pages` subfoler.

Check the [showdown docs](https://github.com/showdownjs/showdown#valid-options)
to see more variants of specifying image sizes.


## Lists

To create an unordered list, simply indent and start consecutive lines with `*` or `-`.

 * Level 1 item 1
 * Level 1 item 2
   - Level 2 item 1
     (spans accross
     three lines inside .md)
   - Level 2 item 2

MarkdownBrauser comes with ShowdownJS's
[GFM](https://help.github.com/articles/github-flavored-markdown/)-style tasklists enabled by default:

 * Work projects
   - [x] This task is done
   - [ ] This is still pending
 * Home projects
   - [x] This task is done
   - [x] This task is done, too

Inside any list, simply start the line using `[ ]` for incomplete tasks
and with `[x]` for completed ones.

## Tables

| Left-Aligned  |    Center-Aligned    | Right-Aligned |
| :------------ |:--------------------:| -------------:|
| col 3 is      | some wordy paragraph |         $1600 |
| col 2 is      |       centered       |           $12 |
| zebra stripes |       are neat       |            $1 |

Table support available thanks to showdownJS 1.2.0; this test taken
[from here](https://raw.githubusercontent.com/showdownjs/showdown/master/test/features/tables/mixed-alignment.md).


## LaTeX formulas

markdownBrauser includes KaTeX to render LaTeX math formulas inside the browser.

Formulas should be wrapped inside two dollar signs, without whitespace
between dollar signs and formula. They can be used inline like $$E  =  mc^{2}$$,
on regular paragraphs like here:

$$\left.\frac{x^3}{3}\right|_0^1$$

... or also inside block quotes:

> $$f(n) = n^5 + 4n^2 + 2 |_{n=17}$$

Examples have been taken from [here](https://en.wikibooks.org/wiki/LaTeX/Mathematics),
but some more complex example formulas didn't work for me... **YMMV**!

markdownBrauser will report problematic formulas inline -- example:

$$f(n) = n^5 + \foobar[baz]$$

## Documenting keyboard shortcuts

Bootstrap eases documenting keyboard shortcuts like:

Please press <kbd><kbd>ctrl</kbd> + <kbd>,</kbd></kbd> and ask yourself:
 "Where's the <kbd>any</kbd> key?"


## Code syntax highlighting

markdownBrauser uses highlightJS to syntax-highlight your code snippets.

The default highlightjs style chosen for markdownBrauser is `github`.

You can tweak highlighter style by defining your desired style
in `config/environment.js` -- before building markdownBrauser.

```javascript
// markdownBrauser/config/environment.js

ENV.emberHighlightJs = {
  style: 'github'
};
```

Visit the [highlightJS](http://highlightjs.org) homepage to browse
supported languages and styles.


### Syntax highlighting example - Bash

```bash
#!/bin/sh

##
# Generic action handler
##
RunService ()
{
    case $1 in
      start  ) StartService   ;;
      stop   ) StopService    ;;
      restart) RestartService ;;
      *      ) echo "$0: unknown argument: $1";;
    esac
}
```

### Syntax highlighting example - PowerShell

```PowerShell

function name ($Param1, $Param2)
{
  Instructions
}


$numbers = 1,2,3,4,5,6,7,8,9
$name = 'Don'
$prompt = "My name is $name"
$var = 'Hello'
$var | Get-Member

$services = Get-Service
ForEach ($service in $services) {
  $service.Stop()
}

```

### Syntax highlighting example - none

In most cases, language auto detection will work fine. To exclude a codeblock from
automatic syntax highlighting, use "none" as the language specifier, (i.e. begin code
block with "```none".)

```none

  >> No syntax highlighting is applied here <<

```
