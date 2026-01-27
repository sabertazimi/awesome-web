use git2::{Commit, Error, ObjectType, Repository};

pub trait GetHeadCommit {
    fn get_head_commit(&self) -> Result<Commit, Error>;
}

impl GetHeadCommit for Repository {
    fn get_head_commit(&self) -> Result<Commit, Error> {
        let obj = self.head()?.resolve()?.peel(ObjectType::Commit)?;
        obj.into_commit()
            .map_err(|_| Error::from_str("Couldn't find commit!"))
    }
}
