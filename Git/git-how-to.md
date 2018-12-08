# Initial Notes
- Git only records the state of the files when you stage them (with git add) or when you create a commit
- Once you've created a commit which has your project files in a particular state, they're very safe, but until then Git's not really "tracking changes" to your files. (for example, even if you do git add to stage a new version of the file, that overwrites the previously staged version of that file in the staging area.)
- An easier way to think about reset and checkout is through the mental frame of Git being a content manager of three different trees. By “tree” here, we really mean “collection of files”, not specifically the data structure
- `HEAD`
    - the pointer to the current branch reference, which is in turn a pointer to the last commit made on that branch
        - That means HEAD will be the parent of the next commit that is created
    - It’s generally simplest to think of HEAD as the snapshot of your last commit on that branch
    - points to your current branch (or current commit), so all that git reset --hard HEAD will do is to throw away any uncommitted changes you have
- **snapshot**
- **Index**
    - your proposed next commit
    - We’ve also been referring to this concept as Git’s “Staging Area” as this is what Git looks at when you run git commit
    - Git populates this index with a list of all the file contents that were last checked out into your working directory and what they looked like when they were originally checked out
        - You then replace some of those files with new versions of them, and git commit converts that into the tree for a new commit
    - The index is not technically a tree structure — it’s actually implemented as a flattened manifest — but for our purposes it’s close enough
- **Working Directory**
    - The other two trees store their content in an efficient but inconvenient manner, inside the .git folder
        - The Working Directory unpacks them into actual files, which makes it much easier for you to edit them
    - Think of the Working Directory as a sandbox, where you can try changes out before committing them to your staging area (index) and then to history

# Auth
#### Authenticating over https
- [create an access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line) -   This is an OAuth token that you will use to auth at the command-line
- be sure to also [update your OS X Keychain with it](https://help.github.com/articles/updating-credentials-from-the-osx-keychain)
# Starting New
#### Add a remote repo to your local repo
`git remote add origin [http...your repo url]`

#### Create a new _remote_ repository from command-line steps:
Note: [v4](https://developer.github.com/v4) of the Github Developer API now uses GraphQL.  Prior versions were using REST

- First you need to create the repo on github first OR run this:
  - ##### Creating it using v3 - REST
      - `curl -u 'USER' https://api.github.com/user/repos -d '{"name":"REPO"}'`
        - _replace USER with your username and REPO with your repository/application name_
      - To do it with an access token: `curl https://api.github.com/user/repos?access_token=myAccessToken -d '{"name":"REPO"}'`
        - to make it private during creation: `'{"name":"REPO", "private":"true"}'`
          - example: `curl -u 'dschinkel' https://api.github.com/dschinkel/repos -d '{"name":"nodejs-kata-scaffolding"}'`

  - ##### Creating it using v4 - GraphQL
    - [Github's graphql explorer](https://developer.github.com/v4/explorer) - try out graphql calls to the github API OR to explore the API and see what mutations are there, what entities are there, etc.
      - [using the explorer](https://developer.github.com/v4/guides/using-the-explorer/#using-graphiql) - talks about adding your bearer token in the explorer GUI http headers
    - To query GraphQL using cURL, make a POST request with a JSON payload. The payload must contain a string called query:
        ```
        curl -H "Authorization: bearer token" -X POST -d " \
         { \
           \"query\": \"query { viewer { login }}\" \
         } \
        " https://api.github.com/graphql
        ```
      - replace _token_ above with your personal access token

        ![example of a successful auth](https://github.com/WeDoTDD/code-notes/raw/master/images/github-v4-example-successful-auth.png)

- `touch README.md`
- `git init`
- `git add README.md`
- `git commit -m "first commit"`
- `git remote add origin git@github.com:alexpchin/<reponame>.git`
- `git push -u origin master`

Then push it so it creates the new repo on the remote (github):
- `git remote add origin git@github.com:dschinkel/<reponame>.git`
- `git push -u origin master`

# State
#### Switch to a previous state of the repository
`git reset --hard`
- resets the _current branch_
- `hard` - the staged snapshot and the working directory are both updated to match the specified commit.  In this case we're not specifying a specific commit so it's referring the current branch
- throws away all your uncommitted changes so do a git status first to make sure you want to lose what's in your current repo
- `--hard` resets the index and working tree. Any changes to tracked files in the working tree since <commit> are discarded.

`git reset --hard HEAD` -
- `HEAD` - points to the **current branch**
    - so I think this command is the same as above, it infers the current branch

`git reset --hard f414f31` - sets it back to a specific commit where f414f31 is the sha
- this is rewriting the history of your branch, so you should avoid it
- also, the commits you did after f414f31 will no longer be in the history of your master branch
- It's better to create a new commit that represents exactly the same state of the project as f414f31, but just adds that on to the history, so you don't lose any history:
`git reset --hard f414f31`
`git reset --soft HEAD@{1}`
`git commit -m "Reverting to the state of the project at f414f31"`

#### Switch to a previous state of the repository

`git checkout <sha>`
`git checkout master` - to get back to latest and out of this state

#### Removing uncommitted changes
uncommitted: non-tracked files that have changed but you have not staged them yet (have not done a git add)

`git clean -n` - show what will be deleted
`git clean -f` - this will delete those files

- To remove directories, run `git clean -f -d` or `git clean -fd`
- To remove ignored files, run `git clean -f -X` or `git clean -fX`
- To remove ignored and non-ignored files, run `git clean -f -x` or `git clean -fx`

#### Renaming a Repository
Scenario: You'd like to rename the remote repository then update your local
to point to that new name

First rename the repository on github via settings

Now update your local to reflect the new name:
- example of updating local repo to sync to new name:
`git remote set-url origin https://github.com/WeDoTDD/react-tdd-redux-e1-react-utils.git`
- verify that it changed: `git remote -v`


# My Rebase Workflow
#### General Commands

`git pull`
- this does a `git fetch && git merge` under the hood
    - `fetch` just pulls remote changes into your local repository. It doesn't merge them into any local branch
- use it when I have no local changes but just want to pull latest

`qa!` - exit a rebase
`git rebase --abort` - exit or do a rebase over
`i` - switch to interactive (edit) mode in vim
`esc` - exit interactive mode in vim

### Rebasing Flow
*Note:* if you only did one commit period, and that's the latest then you don't need to rebase, just do a git fetch && git rebase origin/develop

- First make sure I can compile, run lint, run tests
- Find the latest commit: `git log --graph --decorate --pretty=oneline --abbrev-commit`
- rebase interactively based on latest commit (the commit sha before your changes occurred): `git rebase -i <hash of current base commit>`
- `squash` all my commits except for the first
- `esc` - to exit interactive mode after done editing
- `:x!` - to save changes in vim and finish rebasing
- if I mess up, `rebase --edit-todo` or `git rebase --abort` to just cancel the rebase completely and start over
- `git fetch && git rebase origin/develop`  (make sure it's develop or whatever your master is.  If you only work off master make it origin/master)
- `gp -f` (zsh shortcut for git push -f)

# References
- [How do I use 'git reset --hard HEAD' to revert to a previous commit?](https://stackoverflow.com/questions/9529078/how-do-i-use-git-reset-hard-head-to-revert-to-a-previous-commit)
- [Git Tools - Reset Demystified](https://git-scm.com/book/en/v2/Git-Tools-Reset-Demystified)
- [Resetting, Checking Out & Reverting - Atlassian](https://www.atlassian.com/git/tutorials/resetting-checking-out-and-reverting)
- [How to remove local (untracked) files from the current Git working tree?](https://stackoverflow.com/questions/61212/how-to-remove-local-untracked-files-from-the-current-git-working-tree)
- [Renaming a repository](https://help.github.com/articles/renaming-a-repository)
- [Changing a remote's URL](https://help.github.com/articles/changing-a-remote-s-url)
