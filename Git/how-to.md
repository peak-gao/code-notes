# Initial Notes
- Git only records the state of the files when you stage them (with git add) or when you create a commit
- Once you've created a commit which has your project files in a particular state, they're very safe, but until then Git's not really "tracking changes" to your files. (for example, even if you do git add to stage a new version of the file, that overwrites the previously staged version of that file in the staging area.)

# State
##### Switch to a previous state of the repository
`git reset --hard` -
- resets the _current branch_ head
- throws away all your uncommitted changes so do a git status first to make sure you want to lose what's in your current repo
- `--hard` resets the index and working tree. Any changes to tracked files in the working tree since <commit> are discarded.

`git reset --hard HEAD` -
- HEAD points to your current branch (or current commit), so all that git reset --hard HEAD will do is to throw away any uncommitted changes you have

`git reset --hard f414f31` - sets it back to a specific commit where f414f31 is the sha
- this is rewriting the history of your branch, so you should avoid it
- also, the commits you did after f414f31 will no longer be in the history of your master branch
- It's better to create a new commit that represents exactly the same state of the project as f414f31, but just adds that on to the history, so you don't lose any history:
`git reset --hard f414f31`
`git reset --soft HEAD@{1}`
`git commit -m "Reverting to the state of the project at f414f31"`

##### Switch to a previous state of the repository

`git checkout <sha>`
`git checkout master` - to get back to latest and out of this state

# References
[How do I use 'git reset --hard HEAD' to revert to a previous commit?](https://stackoverflow.com/questions/9529078/how-do-i-use-git-reset-hard-head-to-revert-to-a-previous-commit)
