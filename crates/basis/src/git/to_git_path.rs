use std::path::{Path, PathBuf};

pub trait ToGitPath {
    fn to_git_path(&self) -> Option<PathBuf>;
}

impl ToGitPath for PathBuf {
    fn to_git_path(&self) -> Option<PathBuf> {
        let root = Path::new("/");
        let mut current_path = self.as_path();
        let mut git_dir = current_path.join(".git");

        while !git_dir.exists() {
            current_path = current_path.parent().unwrap_or(root);

            if current_path == root {
                return None;
            }

            git_dir = current_path.join(".git");
        }

        git_dir.parent().map(|p| p.to_owned())
    }
}
