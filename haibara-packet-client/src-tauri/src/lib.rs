pub mod utils {
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug)]
    pub struct Response {
        pub code: i32,
        pub message: String,
        pub data: String,
    }
}

pub mod grep;
