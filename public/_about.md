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
 - search bar on index page using [ember-cli-filter-by-query](https://www.npmjs.com/package/ember-cli-filter-by-query) (search by filename, doctitle or commit message only). Relevant bits stolen from [emberaddons.com](https://github.com/gcollazo/ember-cli-addon-search)
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
called `pages/` by default. The `pages/` folder is expected to
contain markdown files with `.md` file extension.

An example installation, assuming:

 - your webserver is reachable at `http://example.com/`
 - you have write access to its `DocumentRoot`
 - `DocumentRoot` lives in `/var/www/html`
 - your markdown documents live in `/var/www/html/pages`
   (and can already be retreived via http://example.com/pages/)
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
rm markdownBrauser-#MDB_VERSION#.zip

# generate /var/www/html/pageindex.json (from contents of ./pages/ directory)
browse-md/markdownBrauser.py
```

That's it -- now try visiting `http://example.com/browse-md/`.

### How-To build yourself

markdownBrauser uses twitter bootstrap by default. To brew your own Brauser:

 * ``git clone https://github.com/schnoddelbotz/markdownBrauser.git``
 * see (ember-cli-generated) `README.md` inside the checkout
 * run `make`, given at least nodejs is present
 * the `dist/` directory will contain your own Brauser

## Access restrictions

As markdownBrauser more or less just acts as if it was a browser
plugin to render markdown documents off the web, all access control
has to be done on your `pages/` directory effectively serving
your markdown documents. markdownBrauser will report 40x errors
with adequate user messages and present regular browser pop-ups for basic
authentication protected `.md` files.

## To-Do / Bugs

**Development status:**

Pure fun stuff. On github, because it-works-for-me ... Issues:

#### General

 - [ ] put document meta data and link to md src into page view (only link done yet)
 - [ ] use .md document header as doc index's title. ok for # foobar, not for = foobar = yet
 - [ ] display uncomitted files / non-comitted changes ... improve (e.g. stat file for mtime)
 - [ ] bootstrap markup is still slightly messed up? fix menu screen resize
 - [ ] add %%-style meta information in head like [here](http://jbl.web.cern.ch/jbl/doc/manpages/) (or even variables)?
 - [ ] put sense into generated tests/
 - [ ] add a Makefile target to build PDFs using

#### Search

 - [x] a single search result can be directly accessed by pressing enter
 - [ ] keyboard navigation (<kbd>↑</kbd> / <kbd>↓</kbd>) through results (highlight active row, enter go)
 - [ ] fulltext search/engine support? markdownBrauser does **not** index/search document content yet!
 - [ ] might want to switch to marked markdown converter (+ better highlighting integration, +full? GFM)
 - [ ] image broken when using ember serve ('static' name)
 - [ ] strikestrough: wrap to have extra-strikethrough color
 - [ ] add browser-local-store knob
 - [ ] sorting of pages contained in subdirectories inside menu works
 - [ ] indexer code needs cleanup + maybe include document TOCs for search?
 - [ ] pageindex.json might be zipped as well

#### To be made optional / configurable

 - [ ] make options work without need for rebuild
 - [ ] optionally include/enable [hyphenator.js](http://mnater.github.io/Hyphenator/)
 - [ ] `locationType` ([docs](http://guides.emberjs.com/v1.10.0/routing/specifying-the-location-api/)) configurable
 - [ ] `pages` folder name / location (default: `../pages`)

## alternatives

When serving markdown-derived static html documents is a requirement
and you're looking for a mature product, you may without doubt
better be off by taking [sources](https://github.com/emberjs/guides) from
[http://guides.emberjs.com/](http://guides.emberjs.com/).

If JavaScript is unavailable on the client, markdownBrauser will
display its `<noscript>` message, which lets visitors at least browse the
`pages` directory -- given `Options +Indexes` was set inside your
apache configuration.

