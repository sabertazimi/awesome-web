use chrono::{DateTime, FixedOffset, NaiveDateTime, Utc};

pub trait ToTime {
    fn to_time(&self) -> DateTime<FixedOffset>;
}

impl ToTime for i64 {
    fn to_time(&self) -> DateTime<FixedOffset> {
        let china_timezone = FixedOffset::east_opt(8 * 3600).unwrap();
        let utc_time =
            DateTime::<Utc>::from_utc(NaiveDateTime::from_timestamp_opt(*self, 0).unwrap(), Utc);
        utc_time.with_timezone(&china_timezone)
    }
}
