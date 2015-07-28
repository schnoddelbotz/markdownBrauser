#!/usr/bin/python

# ideally to be called from githook on the md repo in question

import os, sys, getopt, re, json, time, collections, subprocess

ExecutionResult = collections.namedtuple('ExecutionResult', 'status, stdout, stderr')

def _execute(cmd):
  process = subprocess.Popen(
      cmd,
      stdout=subprocess.PIPE,
      stderr=subprocess.PIPE
  )
  stdout, stderr = process.communicate()
  status = process.poll()
  return ExecutionResult(status, stdout, stderr)

def get_git_log_for_file(filename):
  # http://blog.lost-theory.org/post/how-to-parse-git-log-output/
  GIT_COMMIT_FIELDS = ['id', 'author_name', 'author_email', 'date', 'message']
  GIT_LOG_FORMAT = ['%H', '%an', '%ae', '%ct', '%s']
  GIT_LOG_FORMAT = '%x1f'.join(GIT_LOG_FORMAT) + '%x1e'
  p = _execute( ['git','log','-1','--format="%s"' % GIT_LOG_FORMAT, filename ] )
  log = p.stdout
  log = log.strip('\n\x1e').split("\x1e")
  log = [row.strip().split("\x1f") for row in log]
  log = [dict(zip(GIT_COMMIT_FIELDS, row)) for row in log]
  return log[0]

def get_doctitle_for_markdownfile(filename):
  style1header = re.compile('^(#)+\s+(.*)')
  for line in open(filename):
    match = style1header.match(line)
    if match != None:
       return match.group(2)
  return filename

def get_pages(path):
  files = os.listdir(path)
  metas = []
  i = 0
  for f in files:
    if f[0] == '.':
      continue
      # skip any .dotfiles/dirs

    fpath = path+'/'+f
    parent_id = os.path.dirname(fpath[2:])

    if os.path.isdir(fpath):
      childrenFiles = os.listdir(fpath)
      childrenIds = []
      for k in childrenFiles:
        childrenIds.append( (fpath+'/'+k)[2:] )
      d = {
        'id': fpath[2:],
        'page_title':"DIR "+fpath,
        'file_name': f,
        'parent_id': None if parent_id =='' else parent_id,
        'path': path[2:],
        'children': childrenIds,
        'is_directory': True,
        'page': None
        # state: uncomitted if no gitlog
      }
      metas.append(d)
      childrenPages = get_pages(fpath)
      for kid in childrenPages:
        metas.append(kid)
      continue

    title = get_doctitle_for_markdownfile(fpath)
    # f[:-3]
    f = f[:-3]
    # should only use .md or .txt? documents
    filerelpath = path+'/'+f+'.md'
    gitlog = get_git_log_for_file(filerelpath)



    #print mod
    x = {
      'id': fpath[2:],
      'page': fpath[2:], # for ember-data, "id" of page content = our id
      'page_title':title,
      'file_name': f,
      'parent_id': None if parent_id =='' else parent_id,
      'path': path[2:],
      'children': [],
      'is_directory': False,
      'git_modified': gitlog.get('date'),#[4:],
      'git_username': gitlog.get('author_email'),
      'git_message': gitlog.get('message')
      # state: uncomitted if no gitlog
    }

    metas.append(x)
  return metas

####
# we want the _unresolved_ (in case of symlinks) path here,
# as the browser directory itself may be symlinked to
# a "central" install.

WebRootDir     = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSONindexFile  = WebRootDir + '/pageindex.json'
mdDocDirectory = WebRootDir + '/pages'
PagesUseGit    = True if os.path.isdir(mdDocDirectory+'/.git') else False
gitLogCountMax = 100 # unused
verbose        = True if len(sys.argv) > 1 else False

## Ember-data related record: pages hasOne(pageContent)
## jsonapi! # support multiple dirs?
os.chdir(mdDocDirectory)

reply = {
  #"jsonapi": {
  #  "version": "1.0"
  #},
  #"meta": {
  #  "generator": "markdownBrauser.py",
  #  "generatorVersion": "#MDB_GITREV#",
  #},
  #"links": { ### FIXME:
  #  "self": "http://example.com/pageindex.json"
  #},
  "pages": get_pages('.')
}

if verbose:
  print "markdownBrauser.py called .. : "+ __file__
  print "markdownBrauser.py abs ..... : "+ os.path.abspath(__file__)
  print "markdownBrauser.py real .... : "+ os.path.realpath(__file__)
  print "Using webroot .............. : "+os.path.realpath(WebRootDir)
  print "Using JSON FILE ............ : "+os.path.realpath(JSONindexFile)
  print "Using md pages src dir...... : "+os.path.realpath(mdDocDirectory)
  print "pages src dir is a git repo? : "+ "yes" if PagesUseGit else "no"
  print json.dumps(reply, indent=4, sort_keys=True)

# save result to .new file, mv to final destination
tmpFileName = JSONindexFile + ".new"
# if md5(tmp)==md5(existingFile): skip
with open(tmpFileName, 'w') as outfile:
  json.dump(reply, outfile)
  outfile.close()
os.rename(tmpFileName,JSONindexFile)
