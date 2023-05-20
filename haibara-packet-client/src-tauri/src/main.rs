#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use app::{__cmd__mini_grep, grep::grep::mini_grep};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![mini_grep])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
