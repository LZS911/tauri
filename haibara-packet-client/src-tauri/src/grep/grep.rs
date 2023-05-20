use std::{fs, path::Path};

use crate::utils::Response;

fn check_path(path: &str) -> bool {
    Path::new(path).exists()
}

#[tauri::command]
pub fn mini_grep(pattern: &str, path: &str) -> Result<Response, Response> {
    if !check_path(path) {
        return Ok(Response {
            code: 0,
            message: String::from("当前路径下的文件不存在!"),
            data: "".to_string(),
        });
    }

    let results = match fs::read_to_string(path) {
        Ok(content) => search(pattern, &content),
        Err(err) => {
            return Err(Response {
                code: 0,
                message: err.to_string(),
                data: "".to_string(),
            })
        }
    };

    return Ok(Response {
        code: 1,
        message: String::from("查询成功"),
        data: results,
    });
}

fn search<'a>(pattern: &str, contents: &'a str) -> String {
    let mut results: String = "".to_string();

    for line in contents.lines() {
        if line.contains(pattern) {
            let c = format!("{}\n", line);
            results += &c;
        }
    }

    results
}
