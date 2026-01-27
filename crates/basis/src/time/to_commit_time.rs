use crate::git::{GetHeadCommit, ToGitPath};
use git2::{Error, Repository, Sort};
use std::env;
use std::path::{Path, PathBuf};

pub trait ToCommitTime {
    fn to_commit_time(&self) -> Result<i64, Error>;
}

impl ToCommitTime for str {
    fn to_commit_time(&self) -> Result<i64, Error> {
        let file_path = Path::new(self);
        let pwd_path = env::current_dir().unwrap_or_else(|_| PathBuf::from("."));
        let git_path = match pwd_path.to_git_path() {
            Some(git_path) => git_path,
            None => return Err(Error::from_str("Not a git repository")),
        };
        let repo = Repository::open(git_path)?;
        let head_commit = repo.get_head_commit()?;
        let head_entry = head_commit.tree()?.get_path(file_path)?;
        let head_entry_id = head_entry.id();

        if head_entry_id.is_zero() {
            println!("Couldn't find {self} on head commit!");
            return Err(Error::from_str("Couldn't find file on head commit!"));
        }

        let mut walker = repo.revwalk()?;
        walker.push_head()?;
        walker.set_sorting(Sort::TIME)?;
        let mut commit_time = head_commit.time().seconds();

        for oid in walker {
            let commit = repo.find_commit(match oid {
                Ok(oid) => oid,
                Err(_) => return Err(Error::from_str("Couldn't find commit!")),
            })?;
            let tree_entry = match commit.tree()?.get_path(file_path) {
                Ok(entry) => entry,
                Err(_) => break,
            };

            // Find first object with same name but different SHA code.
            if tree_entry.id() != head_entry_id {
                break;
            }

            commit_time = commit.time().seconds();
        }

        Ok(commit_time)
    }
}
