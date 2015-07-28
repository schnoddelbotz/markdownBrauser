<a href="https://github.com/schnoddelbotz/markdownBrauser"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"></a>

# ![https://github.com/schnoddelbotz/markdownBrauser](favicon-7b730a7ee94f65aaaa1118a61635e1ad.png =32x*) About markdownBrauser <small>v. #MDB_VERSION#</small>

markdownBrauser serves to publish
[markdown](https://en.wikipedia.org/wiki/Markdown) document
repositories.

Looks like a wiki, but lacks in-browser editing, feels a bit like
github repository frontend... but markdownBrauser is really dedicated
to markdown -- and needs nothing more than a simple, static content
webserver to run. May suck for SEO purposes in its current form.

## Features

 - ambitious [ember-cli](http://ember-cli)-built [emberjs](http://emberjs.com)
   [Single-page application](https://en.wikipedia.org/wiki/Single-page_application)
 - retreives raw `.md` markdown files from your webserver, does all rendering client-side
 - [KaTeX](https://github.com/Khan/KaTeX)-based LaTeX math formula rendering
 - [twitter bootstrap](http://getbootstrap.com/)-based layout
 - uses a single JSON 'page index' file to make docs 'browsable' for clients
 - includes a git repository hook to maintain page index automatically
 - [git](http://git-scm.org) integration (displays commit messages as changelog etc.)
 - [highlightJS](http://highlightjs.org) based syntax highlighting
 - uses [ember-liquid-fire](http://ef4.github.io/liquid-fire/) for some more eyecandy

See the [syntax documentation page](#/page/_syntax) and its source for example output and usage.

## Installation

Installing or updating markdownBrauser only involves unpacking the
[latest markdownBrauser release](https://github.com/schnoddelbotz/markdownBrauser/releases)
on your webserver. It simply expects your documents to live
in a directory next to the unpacked markdownBrowser, in a folder
called `pages/` -- see tree outline below.

An example installation, assuming:

 - your webserver is reachable at `http://example.com/`
 - you have write access to its `DocumentRoot`
 - `DocumentRoot` lives in `/var/www/html`
 - your markdown documents live in `/var/www/html/pages`
   (and can be retreived via http://example.com/pages/)
 - `/var/www/html/pages` should be a git checkout (will become optional...)
 - you want your raw .md markdown `pages/` to be rendered
   when browsing to `http://example.com/browse-md/`

```bash
# change to webserver's Document root
cd /var/www/html

# download latest markdownBrauser
curl -LO https://github.com/schnoddelbotz/markdownBrauser/releases/download/v#MDB_VERSION#/markdownBrauser-#MDB_VERSION#.zip

# unpack download, rename unpacked directory to desired name
unzip markdownBrauser-#MDB_VERSION#.zip
mv markdownBrauser browse-md

# generate /var/www/html/pageindex.json (out of ./pages/ directory)
browse-md/markdownBrauser.py
```

That's it -- now try visiting `http://example.com/browse-md/`.

### How-To build yourself

markdownBrauser uses twitter bootstrap by default. To brew your own Brauser:

 * ``git clone https://github.com/schnoddelbotz/markdownBrauser.git``
 * see (ember-cli-generated) `README.md` inside the checkout
 * run `make`, given at least nodejs is present
 * the `dist/` directory will contain your own Brauser

## To-Do / Bugs

**Development status:**

Pure fun stuff. On github, because it-works-for-me ... Issues:

 * put document meta data and link to md src into page view (relations puff...)
 * ~~use .md document header as doc index's title~~ (ok for # foobar, not for = foobar =)
 * ~~display uncomitted files / non-comitted changes~~ ... improve
 * bootstrap markup is still slightly messed up? fix menu screen resize
 * add %%-style meta information in head like [here](http://jbl.web.cern.ch/jbl/doc/manpages/) (or even variables)?
 * keyboard navigation through docs/results (1 result, enter->go)?
 * fulltext search/engine support?
 * might want to switch to marked markdown converter (+ better highlighting integration, +full? GFM)
 * image broken when using ember serve ('static' name)
 * there would be hyphenator.js, but also CSS3 hyphens
 * strikestrough: wrap to have extra-strikethrough color
 * add browser-local-store knob
 * sorting is broken (reduce limit...), model should exclude directories
 * indexer code needs cleanup
