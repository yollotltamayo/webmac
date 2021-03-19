#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
use rocket::response::NamedFile;
use rocket_contrib::serve::StaticFiles;
use std::path::{Path, PathBuf};
#[get("/")]
fn index() -> Option<NamedFile> {
    NamedFile::open("static/index.html").ok()
}
#[get("/<file..>")]
fn files(file:PathBuf)->Option<NamedFile> {
    NamedFile::open(Path::new("static").join(file)).ok()
}
fn main() {
    rocket::ignite()
        .mount("/" , routes![index,files])
        .launch();
}
