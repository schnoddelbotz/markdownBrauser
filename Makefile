
DISTVERSION=$(shell cat version)

build: node_modules bower_components
	# patch bootstrap.css to not remove colors in print/pdf
	perl -e 'my $$open=0; open(FH, $$ARGV[0]) or die; while (<FH>) { /^\@media print/ and $$open=1; print if $$open != 1; (/^}/ and $$open) and $$open=0; }' -- bower_components/bootstrap/dist/css/bootstrap.css > tmp/printfix.css
	cp tmp/printfix.css bower_components/bootstrap/dist/css/bootstrap.css
	ember build --environment production
	perl -pi -e 's@#MDB_VERSION#@$(DISTVERSION)@g' dist/_about.md

node_modules:
	npm install

bower_components:
	bower install

serve:
	[ -h public/pages ] || (cd public ; ln -s ../test-pages pages)
	(cd public ; ./markdownBrauser.py)
	ember serve

remote:
	rm -rf dist markdownBrauser
	rm -f public/pages public/pageindex.json
	ember build --environment production
	perl -pi -e 's@#MDB_VERSION#@$(DISTVERSION)@' dist/_about.md
	rsync -av --delete dist/ slab1:homepage/md/

git-reset:
	git clean -d -x -f
	git reset --hard
