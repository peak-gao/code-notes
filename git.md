#### Oh My Zsh
- I use [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) which provides a [ton of nice git aliases](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet) that make you a lot quicker when typing git commands.  I highly recommend it.
#### Bash

**Files - Editing, Saving, etc.**
- `esc` (gets you out of edit mode)
- `:wq` (saves the file)

#### Basic Commands Used Often
`git commit --amend`
- Lets you update a commit message if you haven't pushed it yet

`git remote -v`
-  lists any remote repos you local repo is tied to
    e.g.
    ```
    origin  https://github.com/dschinkel/dschinkel.github.io.git (fetch)
    origin  https://github.com/dschinkel/dschinkel.github.io.git (push)
    ```
`git log`
- see commit history
- `git log --graph` - adds a nice little ASCII graph showing your branch and merge history

`git remote add origin [http...your repo url]` - ties your local repo to a remote repo

#### Errors & Resolutions

`fatal: 'master' does not appear to be a git repository`
 `fatal: Could not read from remote repository`
 Resolution: `git pull origin master`