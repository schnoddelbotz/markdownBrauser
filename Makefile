
GITREV=$(shell git rev-parse HEAD | cut -b1-7)
DISTVERSION=$(shell cat version)

build:
	rm -rf tmp dist
	npm install
	bower install
	ember build --environment production
	perl -pi -e 's@#MDB_VERSION#@$(DISTVERSION)@g' dist/_about.md

dist: build
	mv dist markdownBrauser
	zip -rv markdownBrauser-$(DISTVERSION).zip markdownBrauser
	mv markdownBrauser dist

serve:
	[ -h public/pages ] || (cd public ; ln -s ../test-pages pages)
	(cd public ; ./markdownBrauser.py)
	ember serve

remote:
	rm -rf dist markdownBrauser
	rm -f public/pages public/pageindex.json
	ember build --environment production
	perl -pi -e 's@#MDB_GITREV#@$(GITREV)@' dist/_about.md
	perl -pi -e 's@markdownBrauser.zip@markdownBrauser-$(GITREV).zip@' dist/_about.md
	mv dist markdownBrauser
	zip -rv markdownBrauser-$(GITREV).zip markdownBrauser
	mv markdownBrauser dist
	mv markdownBrauser-$(GITREV).zip dist/
	rsync -av --delete dist/ slab1:homepage/md/

git-reset:
	git clean -d -x -f
	git reset --hard
