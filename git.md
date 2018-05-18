#### Oh My Zsh
- I use [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) which provides a [ton of nice git aliases](https://github.com/robbyrussell/oh-my-zsh/wiki/Cheatsheet) that make you a lot quicker when typing git commands.  I highly recommend it.
#### Bash
**meta** - your `Alt` key, normally. You need to enable it yourself usually in your terminal settings
- how to set your `option` key as "meta":
    - for **OS X built-in terminal** open it and then go to Edit | Use Option as Meta Key
    - for **iTerm2** go to Preferences->Profiles tab. Select your profile on the left, and then open the Keys tab. Set the option key to use Esc+
- `fn + arrow left` or `Ctrl + e`, - jump to beginning of line
- `fn + arrow right` or `Ctrl + a` or  - jump to end of line
- `alt + f`, `alt + b` - move cursor backwards or forwards by words
- `Ctrl + b` - move backwards by chars
- `Ctrl + f` - move forwards by chars
- `meta + f` - move forward one word
- `meta + b` - move backward one word
- `Ctrl + u` - clear everything before cursor position
- `Ctrl + k` - clear everything after cursor position
- `Ctrl + d` - delete current char
- `Ctrl + w` - delete a word in front of cursor
- `Ctrl + r` - quick search commands you've done

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