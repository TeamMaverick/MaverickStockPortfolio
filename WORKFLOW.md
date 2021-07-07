# Detailed Workflow (GreyFinancial core)

1. 'git branch' [Verify correct branches]
1. 'git checkout dev' [go to the dev branch]
1. 'git pull origin dev' [pull the most recent dev branch update]
1. 'git checkout -b newFeature' [create a new branch for the feature you are working on]
1. [write the code, stage(add) the data, and commit code]

   - [DON'T FORGET to use prefixes to flag your commits]
   - Make commits to your feature branch. Prefix each commit like so:
   - The first line of your commit message should be a brief summary of what the
     commit changes. Aim for about 70 characters max. Remember: This is a summary,
     not a detailed description of everything that changed.
   - (feat) Add a new feature
   - (fix) Fix inconsistent tests
   - (refactor) Refactoring data
   - (cleanup) Cleaning up code
   - (test) Test related
   - (doc) Document related

1. 'git checkout dev' [go back to dev branch]
1. 'git pull origin dev' [update the dev branch to the most up to date again]
1. 'git checkout newFeature' [go back to your current feature branch]
1. 'git merge dev' [merge the dev and the newFeature]
1. [fix any conflicts]
1. 'git push origin newFeature' [DO NOT PUSH TO DEV]
1. [GO TO GITHUB REPO]
1. [Change branch to newFeature and create a pull request to dev branch]

   - make base: dev and compare: newFeature]

1. [submit pull request (using flags from above)]
1. [have someone other than yourself review the code and accept the pull request to dev]
1. [periodically, as a group, we will merge dev to the master branch]
