mod git;
mod time;

use crate::time::{ToCommitTime, ToTime};
use chrono::Utc;

// https://github.com/rust-lang/mdBook/pull/1506
fn main() -> std::io::Result<()> {
    git_snippet();
    Ok(())
}

fn git_snippet() {
    let files = [
        "crates/basis/src/main.rs",
        "crates/basis/Cargo.toml",
        ".github/workflows/ci.yml",
        "book.toml",
        "Cargo.toml",
        "Cargo.lock",
        "docs/README.md",
        "docs/SUMMARY.md",
        "README.md",
        "SUMMARY.md",
        "NOT_FOUND.md",
    ];

    for file in files {
        find_git_timestamp(file);
    }
}

fn find_git_timestamp(file_name: &str) {
    let mut timestamp = file_name.to_commit_time().unwrap_or(0);

    // Fall back to build time.
    if timestamp == 0 {
        timestamp = Utc::now().timestamp();
        print!("[NOW] ");
    } else {
        print!("[GIT] ");
    }

    let china_time = timestamp.to_time();
    println!(
        "Commit {} at: {}",
        file_name,
        china_time.format("%Y-%m-%d %H:%M:%S"),
    );
}
